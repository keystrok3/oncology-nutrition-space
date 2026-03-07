import express from 'express'
import slugify from 'slugify'
import pool from '../db.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

// ── Helper — generate unique slug ─────────────────────────────
async function generateSlug(title, excludeId = null) {
  let slug = slugify(title, { lower: true, strict: true })
  let unique = false
  let counter = 0

  while (!unique) {
    const candidate = counter === 0 ? slug : `${slug}-${counter}`
    const query = excludeId
      ? 'SELECT id FROM posts WHERE slug = $1 AND id != $2'
      : 'SELECT id FROM posts WHERE slug = $1'
    const params = excludeId ? [candidate, excludeId] : [candidate]
    const result = await pool.query(query, params)

    if (result.rows.length === 0) {
      slug = candidate
      unique = true
    }
    counter++
  }
  return slug
}

// ── Helper — attach categories and tags to posts ──────────────
async function attachRelations(posts) {
  if (!posts.length) return posts

  const postIds = posts.map(p => p.id)

  const [cats, tags] = await Promise.all([
    pool.query(
      `SELECT pc.post_id, c.id, c.title, c.slug
       FROM posts_categories pc
       JOIN categories c ON c.id = pc.category_id
       WHERE pc.post_id = ANY($1)`,
      [postIds]
    ),
    pool.query(
      `SELECT pt.post_id, t.id, t.name, t.slug
       FROM posts_tags pt
       JOIN tags t ON t.id = pt.tag_id
       WHERE pt.post_id = ANY($1)`,
      [postIds]
    ),
  ])

  return posts.map(post => ({
    ...post,
    categories: cats.rows.filter(c => c.post_id === post.id),
    tags:       tags.rows.filter(t => t.post_id === post.id),
  }))
}

// ── GET /api/posts ────────────────────────────────────────────
// Public — returns all published posts, newest first
// Optional query param: ?category=slug
router.get('/', async (req, res) => {
  const { category } = req.query

  try {
    let query, params

    if (category) {
      query = `
        SELECT p.*, u.name AS author_name, u.role AS author_role
        FROM posts p
        JOIN users u ON u.id = p.author_id
        JOIN posts_categories pc ON pc.post_id = p.id
        JOIN categories c ON c.id = pc.category_id
        WHERE p.status = 'published' AND c.slug = $1
        ORDER BY p.published_at DESC
      `
      params = [category]
    } else {
      query = `
        SELECT p.*, u.name AS author_name, u.role AS author_role
        FROM posts p
        JOIN users u ON u.id = p.author_id
        WHERE p.status = 'published'
        ORDER BY p.published_at DESC
      `
      params = []
    }

    const result = await pool.query(query, params)
    const posts  = await attachRelations(result.rows)

    res.json({ posts })
  } catch (err) {
    console.error('Get posts error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── GET /api/posts/admin ──────────────────────────────────────
// Private — returns all posts (draft + published) for admin view
router.get('/admin', authenticate, async (req, res) => {
  try {
    // Writers see only their own posts, admins see all
    const query = req.user.role === 'admin'
      ? `SELECT p.*, u.name AS author_name
         FROM posts p JOIN users u ON u.id = p.author_id
         ORDER BY p.created_at DESC`
      : `SELECT p.*, u.name AS author_name
         FROM posts p JOIN users u ON u.id = p.author_id
         WHERE p.author_id = $1
         ORDER BY p.created_at DESC`

    const params = req.user.role === 'admin' ? [] : [req.user.id]
    const result = await pool.query(query, params)
    const posts  = await attachRelations(result.rows)

    res.json({ posts })
  } catch (err) {
    console.error('Admin get posts error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── GET /api/posts/:slug ──────────────────────────────────────
// Public — returns a single published post by slug
router.get('/:slug', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.name AS author_name, u.role AS author_role,
              u.bio AS author_bio, u.photo_url AS author_photo
       FROM posts p
       JOIN users u ON u.id = p.author_id
       WHERE p.slug = $1 AND p.status = 'published'`,
      [req.params.slug]
    )

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const [post] = await attachRelations(result.rows)
    res.json({ post })
  } catch (err) {
    console.error('Get post error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── POST /api/posts ───────────────────────────────────────────
// Private — create a new post
// Accepts multipart/form-data for image upload
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  const { title, excerpt, body, status, categories, tags, published_at } = req.body

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' })
  }

  try {
    const slug          = await generateSlug(title)
    const coverImageUrl = req.file?.path ?? null

    // Set published_at when post is first published
    const publishedAt = status === 'published'
      ? (published_at ?? new Date().toISOString())
      : null

    const result = await pool.query(
      `INSERT INTO posts
        (title, slug, excerpt, body, cover_image_url, status, author_id, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, slug, excerpt ?? null, body, coverImageUrl, status ?? 'draft', req.user.id, publishedAt]
    )

    const post = result.rows[0]

    // Attach categories if provided
    if (categories) {
      const catIds = JSON.parse(categories)
      for (const catId of catIds) {
        await pool.query(
          'INSERT INTO posts_categories (post_id, category_id) VALUES ($1, $2)',
          [post.id, catId]
        )
      }
    }

    // Attach tags if provided
    if (tags) {
      const tagIds = JSON.parse(tags)
      for (const tagId of tagIds) {
        await pool.query(
          'INSERT INTO posts_tags (post_id, tag_id) VALUES ($1, $2)',
          [post.id, tagId]
        )
      }
    }

    res.status(201).json({ post })
  } catch (err) {
    console.error('Create post error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── PUT /api/posts/:id ────────────────────────────────────────
// Private — update an existing post
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  const { title, excerpt, body, status, categories, tags } = req.body
  const { id } = req.params

  try {
    // Check post exists and user has permission
    const existing = await pool.query('SELECT * FROM posts WHERE id = $1', [id])

    if (!existing.rows.length) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const post = existing.rows[0]

    // Writers can only edit their own posts
    if (req.user.role !== 'admin' && post.author_id !== req.user.id) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    const slug          = title ? await generateSlug(title, id) : post.slug
    const coverImageUrl = req.file?.path ?? post.cover_image_url

    // Set published_at when post is first published
    const publishedAt = status === 'published' && !post.published_at
      ? new Date().toISOString()
      : post.published_at

    const result = await pool.query(
      `UPDATE posts SET
        title           = $1,
        slug            = $2,
        excerpt         = $3,
        body            = $4,
        cover_image_url = $5,
        status          = $6,
        published_at    = $7
       WHERE id = $8
       RETURNING *`,
      [
        title    ?? post.title,
        slug,
        excerpt  ?? post.excerpt,
        body     ?? post.body,
        coverImageUrl,
        status   ?? post.status,
        publishedAt,
        id,
      ]
    )

    // Replace categories
    if (categories) {
      await pool.query('DELETE FROM posts_categories WHERE post_id = $1', [id])
      const catIds = JSON.parse(categories)
      for (const catId of catIds) {
        await pool.query(
          'INSERT INTO posts_categories (post_id, category_id) VALUES ($1, $2)',
          [id, catId]
        )
      }
    }

    // Replace tags
    if (tags) {
      await pool.query('DELETE FROM posts_tags WHERE post_id = $1', [id])
      const tagIds = JSON.parse(tags)
      for (const tagId of tagIds) {
        await pool.query(
          'INSERT INTO posts_tags (post_id, tag_id) VALUES ($1, $2)',
          [id, tagId]
        )
      }
    }

    res.json({ post: result.rows[0] })
  } catch (err) {
    console.error('Update post error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── DELETE /api/posts/:id ─────────────────────────────────────
// Private — delete a post (admin only, or own post)
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params

  try {
    const existing = await pool.query('SELECT * FROM posts WHERE id = $1', [id])

    if (!existing.rows.length) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const post = existing.rows[0]

    if (req.user.role !== 'admin' && post.author_id !== req.user.id) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [id])
    res.json({ message: 'Post deleted successfully' })
  } catch (err) {
    console.error('Delete post error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
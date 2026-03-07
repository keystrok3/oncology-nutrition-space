import express from 'express'
import slugify from 'slugify'
import pool from '../db.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// ── GET /api/categories ───────────────────────────────────────
// Public — returns all categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY title ASC'
    )
    res.json({ categories: result.rows })
  } catch (err) {
    console.error('Get categories error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── POST /api/categories ──────────────────────────────────────
// Admin only — create a new category
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Title is required' })
  }

  try {
    const slug   = slugify(title, { lower: true, strict: true })
    const result = await pool.query(
      `INSERT INTO categories (title, slug, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, slug, description ?? null]
    )
    res.status(201).json({ category: result.rows[0] })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Category already exists' })
    }
    console.error('Create category error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── DELETE /api/categories/:id ────────────────────────────────
// Admin only — delete a category
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [req.params.id])
    res.json({ message: 'Category deleted successfully' })
  } catch (err) {
    console.error('Delete category error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
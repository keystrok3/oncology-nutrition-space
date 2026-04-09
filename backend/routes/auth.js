import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()
const ALLOWED_ROLES = new Set(['admin', 'writer'])

function createAuthResponse(user) {
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
}

async function getSetupStatus() {
  const result = await pool.query(
    `SELECT
       COUNT(*)::int AS total_users,
       COUNT(*) FILTER (WHERE role = 'admin')::int AS total_admins
     FROM users`
  )

  return result.rows[0]
}

// GET /api/auth/setup-status
// Public — reports whether the first admin still needs to be created
router.get('/setup-status', async (req, res) => {
  try {
    const { total_users: totalUsers, total_admins: totalAdmins } = await getSetupStatus()

    res.json({
      needsSetup: totalUsers === 0,
      totalUsers,
      totalAdmins,
    })
  } catch (err) {
    console.error('Setup status error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/setup-admin
// Public — creates the first admin only when the system has no users
router.post('/setup-admin', async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' })
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const countResult = await client.query(
      'SELECT COUNT(*)::int AS total_users FROM users'
    )

    if (countResult.rows[0].total_users > 0) {
      await client.query('ROLLBACK')
      return res.status(403).json({ error: 'Initial admin has already been created' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await client.query(
      `INSERT INTO users (email, password, name, role)
       VALUES ($1, $2, $3, 'admin')
       RETURNING id, email, name, role`,
      [email, hashedPassword, name]
    )

    await client.query('COMMIT')
    res.status(201).json(createAuthResponse(result.rows[0]))
  } catch (err) {
    await client.query('ROLLBACK')

    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already in use' })
    }

    console.error('Setup admin error:', err)
    res.status(500).json({ error: 'Server error' })
  } finally {
    client.release()
  }
})

// POST /api/auth/register
// Admin only — creates a new writer or admin account
router.post('/register', authenticate, authorize('admin'), async (req, res) => {
  const { email, password, name, role, bio } = req.body
  const nextRole = role ?? 'writer'

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' })
  }

  if (!ALLOWED_ROLES.has(nextRole)) {
    return res.status(400).json({ error: 'Invalid role' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await pool.query(
      `INSERT INTO users (email, password, name, role, bio)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, name, role, bio, created_at`,
      [email, hashedPassword, name, nextRole, bio ?? null]
    )

    res.status(201).json({ user: result.rows[0] })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already in use' })
    }
    console.error('Register error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/login
// Returns a JWT token on success
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    res.json(createAuthResponse(user))
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/auth/me
// Returns current logged-in user info
router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, role, bio, photo_url, created_at FROM users WHERE id = $1',
      [req.user.id]
    )
    res.json({ user: result.rows[0] })
  } catch (err) {
    console.error('Me error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

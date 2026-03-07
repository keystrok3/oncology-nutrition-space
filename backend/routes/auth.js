import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// ── POST /api/auth/register ───────────────────────────────────
// Admin only — creates a new writer or admin account
router.post('/register', authenticate, authorize('admin'), async (req, res) => {
  const { email, password, name, role, bio } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' })
  }

  try {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await pool.query(
      `INSERT INTO users (email, password, name, role, bio)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, name, role, bio, created_at`,
      [email, hashedPassword, name, role ?? 'writer', bio ?? null]
    )

    res.status(201).json({ user: result.rows[0] })
  } catch (err) {
    // Unique constraint violation — email already exists
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already in use' })
    }
    console.error('Register error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── POST /api/auth/login ──────────────────────────────────────
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

    // Sign JWT with user id, role, and name
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id:    user.id,
        email: user.email,
        name:  user.name,
        role:  user.role,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ── GET /api/auth/me ──────────────────────────────────────────
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
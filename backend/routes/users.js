import express from 'express'
import pool from '../db.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

// GET /api/users
// Admin only — list all users
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, role, bio, photo_url, created_at FROM users ORDER BY created_at DESC'
    )
    res.json({ users: result.rows })
  } catch (err) {
    console.error('Get users error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/users/:id
// Update own profile — or any user if admin
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  const { id } = req.params

  if (req.user.role !== 'admin' && req.user.id !== id) {
    return res.status(403).json({ error: 'Insufficient permissions' })
  }

  const { name, bio } = req.body
  const photoUrl = req.file?.path ?? null

  try {
    const existing = await pool.query('SELECT * FROM users WHERE id = $1', [id])

    if (!existing.rows.length) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = existing.rows[0]

    const result = await pool.query(
      `UPDATE users SET
         name      = $1,
         bio       = $2,
         photo_url = $3
       WHERE id = $4
       RETURNING id, email, name, role, bio, photo_url`,
      [
        name ?? user.name,
        bio ?? user.bio,
        photoUrl ?? user.photo_url,
        id,
      ]
    )

    res.json({ user: result.rows[0] })
  } catch (err) {
    console.error('Update user error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/users/:id
// Admin only — delete a user
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const existing = await pool.query(
      'SELECT id, role FROM users WHERE id = $1',
      [req.params.id]
    )

    if (!existing.rows.length) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (existing.rows[0].role === 'admin') {
      const adminCount = await pool.query(
        "SELECT COUNT(*)::int AS total_admins FROM users WHERE role = 'admin'"
      )

      if (adminCount.rows[0].total_admins === 1) {
        return res.status(400).json({ error: 'You must keep at least one admin account' })
      }
    }

    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id])
    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    console.error('Delete user error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

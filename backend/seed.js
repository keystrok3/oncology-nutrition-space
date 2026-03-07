// One-time script to create the first admin user.
// Run once, then delete or keep for future use.
// Usage: node seed.js

import bcrypt from 'bcryptjs'
import pool   from './db.js'
import dotenv from 'dotenv'

dotenv.config()

async function createAdmin() {
  const email    = 'jwalutsachi4@gmail.com' 
  const password = 'randomprocess123'                 
  const name     = 'Josiah'                       

  try {
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await pool.query(
      `INSERT INTO users (email, password, name, role)
       VALUES ($1, $2, $3, 'admin')
       RETURNING id, email, name, role`,
      [email, hashedPassword, name]
    )

    console.log('Admin user created successfully:')
    console.log(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {
      console.error('User with this email already exists.')
    } else {
      console.error('Error creating admin:', err)
    }
  } finally {
    await pool.end()
  }
}

createAdmin()
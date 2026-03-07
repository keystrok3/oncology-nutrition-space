// Database connection pool — shared across all route files
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Required for Supabase connections
    rejectUnauthorized: false,
  },
})

// Test connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.message)
  } else {
    console.log('Database connected successfully')
    release()
  }
})

export default pool
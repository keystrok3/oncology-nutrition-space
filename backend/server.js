import express    from 'express'
import cors       from 'cors'
import dotenv     from 'dotenv'

import authRouter       from './routes/auth.js'
import postsRouter      from './routes/posts.js'
import categoriesRouter from './routes/categories.js'
import usersRouter      from './routes/users.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT ?? 4000

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://oncology-nutrition-space.vercel.app/',
  ],
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/auth',       authRouter)
app.use('/api/posts',      postsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/users',      usersRouter)

// ─── Health check ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// ─── 404 handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ─── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
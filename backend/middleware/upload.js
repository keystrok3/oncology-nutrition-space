// Cloudinary + Multer image upload middleware
import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

// Configure Cloudinary with credentials from .env
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Store uploaded images directly in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'oncology-nutrition', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      // Resize large images on upload to keep things performant
      { width: 1200, crop: 'limit' },
    ],
  },
})

// Single image upload — field name must be 'image'
export const upload = multer({ storage })
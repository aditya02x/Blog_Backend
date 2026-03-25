import express, { Router } from 'express'
const router = express.Router()
import {createComment}from '../controllers/comment.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'


router.post("/:blogId",authMiddleware, createComment)

export default router

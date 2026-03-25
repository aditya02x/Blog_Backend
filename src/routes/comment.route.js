import express, { Router } from 'express'
const router = express.Router()
import {createComment , getCommentsByBlog}from '../controllers/comment.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'


router.post("/:blogId",authMiddleware, createComment)
router.get('/:blogId',getCommentsByBlog)

export default router

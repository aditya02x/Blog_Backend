import express, { Router } from 'express'
const router = Router.express()
import createComment from '../controllers/comment.controller'
import authMiddleware from '../middleware/auth.middleware'


router.post("/:blogId",authMiddleware, createComment)
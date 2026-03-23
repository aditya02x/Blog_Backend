import expresss from 'express'
import { createBlog } from '../controllers/blog.controller.js'

const router= expresss.Router();

import authMiddleware from '../middleware/auth.middleware.js';

router.post("/create",authMiddleware,createBlog)

export default router;
import expresss from 'express'
import { createBlog , gatBlogs, getBlogs} from '../controllers/blog.controller.js'


const router= expresss.Router();

import authMiddleware from '../middleware/auth.middleware.js';

router.post("/create",authMiddleware,createBlog)
router.get('/',getBlogs)

export default router;
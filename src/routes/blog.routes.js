import expresss from 'express'
import { createBlog , getBlogById, getBlogs} from '../controllers/blog.controller.js'


const router= expresss.Router();

import authMiddleware from '../middleware/auth.middleware.js';

router.post("/create",authMiddleware,createBlog)
router.get('/',getBlogs)
router.get('/:id',getBlogById)

export default router;
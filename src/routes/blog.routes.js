import expresss from 'express'
import { createBlog , getBlogById, getBlogs, updateBlog} from '../controllers/blog.controller.js'


const router= expresss.Router();

import authMiddleware from '../middleware/auth.middleware.js';

router.post("/create",authMiddleware,createBlog)
router.get('/',authMiddleware,getBlogs)
router.get('/:id',authMiddleware,getBlogById)
router.put('/:id',authMiddleware,updateBlog)

export default router;
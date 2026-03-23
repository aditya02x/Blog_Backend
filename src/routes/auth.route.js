import express from 'express'
const router = express.Router()
import { registerUser } from '../controllers/auth.controllers'
import { loginUser } from '../controllers/auth.controllers'


router.post('/register',registerUser)
router.post('login',loginUser)

export default router
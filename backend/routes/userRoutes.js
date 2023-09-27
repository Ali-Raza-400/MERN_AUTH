import express from 'express'
import { authUser, getProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middlewares/authorizationMiddleware.js'
const router = express.Router()

router.post('/auth', authUser)
router.post('/', registerUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getProfile).put(protect, updateUserProfile)
export default router
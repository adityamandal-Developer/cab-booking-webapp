import express from 'express'
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import { userLoginValidation, userRegisterValidation } from '../validations/user.validations.js'
import { authUser } from '../middlewares/auth.middleware.js'
const router = express.Router()

/**
 * @ALL_USER_ROUTES
 */

/**
 * @POST
 */
router.post('/register', userRegisterValidation, registerUser)
router.post('/login', userLoginValidation, loginUser)

/**
 * @GET
 */
router.get('/profile', authUser, getUserProfile)
router.get('/logout', authUser, logoutUser)

export default router
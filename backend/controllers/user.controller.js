import { validationResult } from 'express-validator'
import userModel from '../models/user.model.js'
import { createUser } from '../services/user.service.js'

/**
 * @REGISTER_USER
 */
export const registerUser = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { firstname, lastname, email, password } = req.body
        const hashPassword = await userModel.hashPassword(password);

        const user = await createUser({
            firstname,
            lastname,
            email,
            password: hashPassword
        })

        const token = user.generateAuthToken();

        res.status(201).json({ token, user })
    } catch (error) {
        res.status(400).json({ error: error.errorResponse.errmsg });
    }

}

/**
 * @LOGIN_USER
 */
export const loginUser = async (req, res, next) => {
    try {
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');

        //check user
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        //check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        //generate token
        const token = user.generateAuthToken();
        res.cookie('token', token)
        res.status(200).json({ token, user }) //send token and user

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

/**
 * @GET_USER_PROFILE
 */
export const getUserProfile = async (req, res, next) => {
    return res.json({ message: req.user })
}

/**
 * @LOGOUT_USER
 */
export const logoutUser = async (req, res, next) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'logged out succssfully' })
}
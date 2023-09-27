import asyncHandler from "express-async-handler"
import User from "../models/user.js"
import generateToken from "../utils/generateTokens.js"
// @desc Auth user/set token 
// route POST /api/users/auth
// access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        console.log("I am running");
        throw new Error('Invalid email or password');
    }
});
// @desc Register New User
// route POST /api/users/register
// access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.json({ message: 'user already exist with email' })
    }
    const user = await User.create({
        email, name, password
    })
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name, email: user.email, password: user.password
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
// @desc Logout User
// route POST /api/users/logout
// access private

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ "message": "Logged Out" })
})
// @desc Get Profile
// route GET /api/users/register
// access private
const getProfile = asyncHandler(async (req, res) => {
    const { user } = req
    const userProfile = {
        _id: user._id,
        name: user.name,
        email: user.email
    }
    res.status(200).json({ "user Profile": userProfile })
})
// @desc Update Profile
// route PUT /api/user/profile/
// access public
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
export {
    authUser, registerUser, logoutUser, getProfile, updateUserProfile
}
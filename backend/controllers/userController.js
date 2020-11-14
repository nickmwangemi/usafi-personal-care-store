import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc Auth user & get token
// @route POST api/v1/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	// search user from DB
	const user = await User.findOne({ email })
	// check if user exists
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

export { authUser }

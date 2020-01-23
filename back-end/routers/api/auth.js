const express = require('express')
const router = express.Router()
const auth = require('../../middelware/auth.js')
const User = require('../../models/UserSchema.js')
const jwt = require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const JWT_SECRET_TOKEN = process.env.JWT_SECRET


// @ROTER 		GET /api/auth
// @des 		Get Current login User Info
// @Access 		PRIVATE
router.get('/',auth, async (req,res) => {
	try {
		const user = await User.findById(res.authToken.id).select('-password')
		res.json(user)
	} catch(e) {
		console.error(e.message)
		res.status(500).send('SERVER ERROR!')
	}
})



// @ROTER 		POST /api/auth
// @des 		LOGIN AND RESPONSE AUTH TOKEN
// @Access 		PUBLIC
router.post('/',
	[
		check('email','Entr valid Email').isEmail(),
		check('password','Enter valid Password').isLength({min:6})
	],
	async (req,res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({errors:errors.array()})
		}

	const email = req.body.email;
	const password = req.body.password;

	try {
		// IF USER ALRADY EXISTS
		let userData = await User.findOne({email:req.body.email})
		if (!userData) {
			res.status(400).json({msg:'User not found'})
		}

		// CHECK PASSWORD
		const isMatchPassword = await bcrypt.compare(req.body.password,userData.password)
		if (!isMatchPassword) {
			res.status(400).json({errors:[{msg:"Password Does't Match"}]})
		}


		//JWT RETURN
		const payload = {
			id:userData._id
		}

		jwt.sign(payload,JWT_SECRET_TOKEN,{expiresIn:3600},(err,token) => {
			if (err) {
				res.json({msg:err})
			} else {
				res.json({token})
			}
		})


	} catch(e) {
		res.status(500).send('SERVER ERROR!')
	}

})


















module.exports = router;
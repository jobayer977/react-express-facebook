const express = require('express')
const router = express.Router();
const {check,validationResult} = require('express-validator')
const User = require('../../models/UserSchema.js')
const Profile = require('../../models/ProfileSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_TOKEN = process.env.JWT_SECRET


// @ROTER 		POST /api/user
// @des 		REGISTER NEW USER
// @Access 		Public
router.post('/',[
		check('fristname','Provide a Valid Name').not().isEmpty(),
		check('lastname','Provide a Valid Name').not().isEmpty(),
		check('email',"Provide a Valid Email").isEmail(),
		check('password','Enter a Password must be 6 Character').isLength({min:6}),
		check('birthDate','Provide Your BirthDate').not().isEmpty(),
		check('gender','Select Your Gender').not().isEmpty()
	],
	async (req,res) => {
	const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors:errors.array()})
		}
	try {
		// IF USER ALRADY EXISTS
		let user = await User.findOne({email:req.body.email})
		if (user) {
			res.status(400).json({msg:'User alrady exists'})
		}



		//STOR USER IN DB
		user = new User ({
			fristname:req.body.fristname,
			lastname:req.body.lastname,
			email:req.body.email,
			// avatar:profile.profilePicture,
			gender:req.body.gender,
			birthDate:req.body.birthDate,
			password:req.body.password
		})

		// ENCRYPT CURRENT PASSWORD
		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(req.body.password,salt)


		// SAVE TO DB AND RESPONSE
		await user.save()

		// RETURN JWT
		const payload = {
			id:user._id
		}
		
		// GENARATE HASH PASSWORD
		jwt.sign(
				payload,
				JWT_SECRET_TOKEN,
				{expiresIn:3600},
				(err,token)=> {
					if (err) {
						res.json({msg:err})
					} else {
						res.json({token})
					}
				}
			)



	} catch(e) {
		console.log(e);
		res.status(400).send('Errors')
	}
})



module.exports = router;
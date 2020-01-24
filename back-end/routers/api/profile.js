const express = require('express')
const router = express.Router()
const User = require('../../models/UserSchema.js')
const Profile = require('../../models/ProfileSchema.js')
const auth = require('../../middelware/auth.js')
const {check,validationResult} = require('express-validator')
const multer = require('multer')

// SET UP FILE UPLOADER
const storage = multer.diskStorage({
	destination:function (req,file,cb) {
		cb(null,'./uploads')
	},
	filename: function (req,file,cb) {
		cb(null, Date.now() + file.originalname);
	}
})

const fileFilter = (req,file,cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null,true)
	} else {
		cb(null,false)
	}
}
 const upload = multer({
 	storage:storage,
 	limits:{
 		fileSize:1024*1024*5,
 	},
 	fileFilter:fileFilter
 })







// @ROTER 		GET /api/profile/me
// @des 		LOGIN PROFILE
// @Access 		PRIVATE
router.get('/me',auth,async (req,res) => {
	try {
		const currentProfile = await Profile.findOne({user:res.authToken.id}).populate('user',['fristname','lastname','avatar'],User);
		res.json(currentProfile)
	} catch(e) {
		console.error(e);
		res.status(500).send('SERVER ERROR!')
	}
})

// @ROTER 		GET /api/profile/connection
// @des 		GET CONNECTION
// @Access 		PRIVATE
router.get('/connection',auth, async (req,res) => {
	try {
		const currentProfile = await Profile.findOne({user:res.authToken.id})
		res.json(currentProfile.connection)
	} catch(e) {
		console.error(e);
		res.status(500).send('SERVER ERROR!')
	}
})


// @ROTER 		PUT /api/profile/connection/follow/:followUser_id
// @des 		ADD TO FOLLOW
// @Access 		PRIVATE
router.put('/connection/follow/:followUser_id',auth, async (req,res) => {
	try {
		// GET LOGIN PROFILE
		const getMyProfile = await Profile.findOne({user:res.authToken.id})
		// const toFollow = await User.findById(req.params.followUser_id).select('-password')
		const toFollow = await Profile.findById(req.params.followUser_id)

		const userIdArray = getMyProfile.connection.following.map(x => x && x._id)
		const checkIndex = userIdArray.indexOf(req.params.followUser_id)

		if (checkIndex === -1) {
			getMyProfile.connection.following.unshift(toFollow)
			await getMyProfile.save()
		}else {
			const getIndex = userIdArray.indexOf(req.params.work_id)
			// REMOVE WORK BY ID
			getMyProfile.connection.following.splice(getIndex,1)
			//SAVE UPDATE PROFILE
			await getMyProfile.save()
		}
		
		res.json(getMyProfile)
	} catch(e) {
		console.error(e);
		res.status(500).send('SERVER ERROR!')
	}


})


// @ROTER 		GET /api/profile
// @des 		ALL PROFILE
// @Access 		Public
router.get('/',async (req,res) => {
	try {
		const allProfile = await Profile.find().populate('user',['fristname','lastname','avatar'],User);
		res.json(allProfile)
	} catch(e) {
		console.error(e);
		res.status(500).send('SERVER ERROR!')
	}
})


// @ROTER 		GET /api/profile/:user_id
// @des 		PROFILE BY USER ID
// @Access 		Public
router.get('/:user_id',async (req,res) => {
	try {
		const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['fristname','lastname'],User);

		// CHECK IF USER NOT EXISTS
		if (!profile) {
			res.json({
				msg:'No user found'
			})
		}

		res.json(profile)

	} catch(e) {
		console.error(e);
		res.status(500).send('SERVER ERROR!')
	}
})

// @ROTER 		DELETE /api/profile
// @des 		DELETE LOGIN PROFILE
// @Access 		PRIVATE
router.delete('/',auth, async (req,res) => {
	try {
		// REMOVE USER POST
		// await Post.deleteMany({user:res.authToken.id})
		// REMOVE PROFILE
		await Profile.findOneAndRemove({_id:res.authToken.id})
		res.json({
			msg:'User Deleted Successfully'
		})
	} catch(e) {
		console.error(e.message)
		res.status(500).send('SERVER ERROR!')
	}
})



 const fields = [
  { name: 'profilePicture', maxCount: 1 },
  { name: 'coverPicture', maxCount: 1 }
]
// @ROTER 		POST /api/profile
// @des 		CREATE AND UPDATE PROFILE
// @Access 		PRIVATE
router.post('/', upload.fields(fields) , auth,async (req,res) => {

	const userFind = await User.findById(res.authToken.id)
	// GET PROFILE FIELDS
	const profileFields = {}

	// ADD BASIC INFO
	profileFields.user = res.authToken.id
	profileFields.userInfo = userFind
	if (req.files && req.files.profilePicture) profileFields.profilePicture = req.files.profilePicture[0].path;
	if (req.files && req.files.coverPicture) profileFields.coverPicture = req.files.coverPicture[0].path;

	if (req.body.gender) profileFields.gender = req.body.gender
	if (req.body.currentcity) profileFields.currentcity = req.body.currentcity
	if (req.body.homeTown) profileFields.homeTown = req.body.homeTown
	if (req.body.mobile) profileFields.mobile = req.body.mobile
	if (req.body.email) profileFields.email = req.body.email
	if (req.body.website) profileFields.website = req.body.website
	if (req.body.birthDate) profileFields.birthDate = req.body.birthDate
	if (req.body.interestedIn) profileFields.interestedIn = req.body.interestedIn.split(',').map(x => x.trim())
	if (req.body.language) profileFields.language = req.body.language.split(',')
	if (req.body.religious) profileFields.religious = req.body.religious

	profileFields.social = {}
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram
	


	try {
		let profile = await Profile.findOne({user:res.authToken.id})
		if (profile) {
			// IF ALRADY PROFILE EXISTS THEN UPDATE
			profile = await Profile.findOneAndUpdate(
					{user:res.authToken.id},
					{$set:profileFields},
					{new:true})
			return res.json(profile)
		} else {
			// OTHERWISE CREATE A NEW PROFILE
			profile = new Profile(profileFields)
			await profile.save()
			return res.json(profile)
		}
		
	} catch(e) {
		console.error(e);
		res.status(500).send('SERVER ERROR!')
	}
})



// @ROTER 		PUT /api/profile/work
// @des 		ADD WORK
// @Access 		PRIVATE
router.put('/work',
	auth,
	[
		check('workPlaceName','Enter Your WorkPlace Name').not().isEmpty()
	],
	async (req,res) => {

		// VALIDATION ERROR CHECK
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors:errors.array()
			})
		}


		// CREATE WORK DATA IN OBJECT
		const workData = {
			user:res.authToken.id,
			workPlaceName:req.body.workPlaceName,
			position:req.body.position,
			location:req.body.location,
			description:req.body.description,
			from:req.body.from,
			to:req.body.to,
			current:req.body.current
		}
		try {
			// ADD TO PROFILE WORK ARRAY IN LAST POSITION
			const getProfileObj = await Profile.findOne({user:res.authToken.id})
			getProfileObj.work.unshift(workData)


			// SAVE TO DB
			await getProfileObj.save()

			// RESPONSE
			res.json(getProfileObj)

		} catch(e) {
			console.error(e);
			res.status(500).send('SERVER ERROR!')
		}
})



// @ROTER 		DELETE /api/profile/work/:work_id
// @des 		DELETE WORK
// @Access 		PRIVATE
router.delete('/work/:work_id',auth, async (req,res) => {
	try {
		const getProfile = await Profile.findOne({user:res.authToken.id});
		// GET THE INDEX
		const getWorkId = getProfile.work.map(x => x._id)
		const getIndex = getWorkId.indexOf(req.params.work_id)
		// REMOVE WORK BY ID
		getProfile.work.splice(getIndex,1)
		//SAVE UPDATE PROFILE
		await getProfile.save()
		// RESPONSE
		res.json(getProfile)
	} catch(e) {
		console.error(e);
		res.status(500).send('SERVER ERROR!')
	}
})



// @ROTER 		PUT /api/profile/education
// @des 		ADD EDUCATION 
// @Access 		PRIVATE
router.put('/education',
	auth,
	[
		check('school','Enter Your School Name').not().isEmpty()
	],
	async (req,res) => {

		// VALIDATION ERROR CHECK
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors:errors.array()
			})
		}


		// CREATE WORK DATA IN OBJECT
		const educationData = {
			user:res.authToken.id,
			school:req.body.school,
			fieldofStudy:req.body.fieldofStudy,
			location:req.body.location,
			description:req.body.description,
			from:req.body.from,
			to:req.body.to,
			current:req.body.current
		}

		try {
			// ADD TO PROFILE WORK ARRAY IN LAST POSITION
			const getProfileObj = await Profile.findOne({user:res.authToken.id})
			getProfileObj.education.unshift(educationData)

			// SAVE TO DB
			await getProfileObj.save()

			// RESPONSE
			res.json(getProfileObj)

		} catch(e) {
			console.error(e);
			res.status(500).send('SERVER ERROR!')
		}
})


// @ROTER 		DELETE /api/profile/education/:education_id
// @des 		DELETE EDUCATION
// @Access 		PRIVATE
router.delete('/education/:education_id',auth, async (req,res) => {
	try {
		const getProfile = await Profile.findOne({user:res.authToken.id});
		// GET THE INDEX
		const getEducationId = getProfile.education.map(x => x._id)
		const getIndex = getEducationId.indexOf(req.params.education_id)
		// REMOVE WORK BY ID
		getProfile.education.splice(getIndex,1)
		//SAVE UPDATE PROFILE
		await getProfile.save()
		// RESPONSE
		res.json(getProfile)
	} catch(e) {
		console.error(e);
		res.status(500).send('SERVER ERROR!')
	}
})




module.exports = router;





	// profileFields.connection = {}
	// if(req.body.followers) profileFields.connection.followers = req.body.followers
	// if(req.body.follow) profileFields.connection.follow = req.body.follow
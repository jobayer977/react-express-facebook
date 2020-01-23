const express = require('express')
const router = express.Router()
const auth = require('../../middelware/auth.js')
const Status = require('../../models/StatusSchema.js')
const Profile = require('../../models/ProfileSchema.js')
const User = require('../../models/UserSchema.js')
const {check,validationResult} = require('express-validator')



//@route 	POST api/status
//@desc 	CREATE A STATUS
//@acces 	PRIVATE
router.post('/',
	[
		auth,
		[
			check('text','Text is required').not().isEmpty()
		],
	],
	async (req,res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors:errors.array()
			})
		}
		try{
			const loginUser = await User.findById(res.authToken.id).select('-password')
			const profile = await Profile.findOne({user:res.authToken.id})

			// CREATE STATUS OBJ
			const newStatus = new Status({
				user:res.authToken.id,
				profile:profile,
				name:loginUser.fristname +' '+ loginUser.lastname,
				text:req.body.text
			})
			
			// SAVE TO DB
			const status = await newStatus.save()
			// RESPONSE
			res.json(status)
		}catch(e){
			if (!e.kind == ObjectId) {
			return res.status(404).json({msg:'SERVER ERROR'})
		}
			res.status(500).send('SERVER ERROR...')
		}
	})


//@route 	GET api/status
//@desc 	SEE ALL STATUS
//@acces 	PRIVATE
router.get('/',auth, async (req,res) => {
	try{
		const getAllStatus = await Status.find().sort({date:-1})
		if (!getAllStatus) {
			return res.status(400).json({msg:'No Status'})
		}
		res.json({getAllStatus})
	}catch(e){
		if (!e.kind == ObjectId) {
			return res.status(404).json({msg:'Post not found'})
		}
		res.status(500).send('SERVER ERROR...')
	}
})


//@route 	GET api/status/:status_id
//@desc 	SINGLE STATUS BY ID
//@acces 	PRIVATE
router.get('/:status_id',auth, async (req,res) => {
	try{
		const status = await Status.findById(req.params.status_id);
		if (!status) {
			return res.status(400).json({msg:'No status exists'})
		}
		res.json(status)
	}catch(e){
		if (!error.kind == ObjectId) {
			return res.status(404).json({msg:'Post not found'})
		}
		res.status(500).send('SERVER ERROR...')
	}
})



//@route 	DELETE api/status/:status_id
//@desc 	SINGLE STATUS BY ID
//@acces 	PRIVATE
router.delete('/:status_id',auth, async (req,res) => {
	try{
		const status = await Status.findById(req.params.status_id)
		if (!status) {
			return res.status(404).json({msg:'No Posts Exists'})
		}

		if (status.user.toString() !== res.authToken.id) {
			res.status(401).json({msg:'Invalid User'})
		}

		await status.remove()
		res.json({msg:'Status Deleted Successfully'})
	}catch(e){
		if (!error.kind == ObjectId) {
			return res.status(404).json({msg:'Post not found'})
		}
		res.status(500).send('SERVER ERROR...')
	}
})


//@route 	PUT api/status/like/:status_id
//@desc 	lIKE AND UNLIKE
//@acces 	PRIVATE
router.put('/likes/:status_id',auth, async (req,res) => {
	try{
		const status = await Status.findById(req.params.status_id)
		const user = await User.findOne({_id:res.authToken.id})

		const statusArray = status.likes.map(x => x._id);
		const userIndex = statusArray.indexOf(res.authToken.id)

		if (userIndex === -1) {
			status.likes.unshift(user)
			await status.save()
		}else{
			const getUserIndex = statusArray.indexOf(res.authToken.id)
			status.likes.splice(getUserIndex,1)
			await status.save()
		}
		res.json(status)

	}catch(e){
		res.status(500).send('SERVER ERROR...')
	}
})

//@route 	PUT api/status/comment/:status_id
//@desc 	ADD COMMENT BY STATUS ID
//@acces 	PRIVAT
router.put('/comment/:status_id',
	[
		auth,
		check('text','Please fill something..(:').not().isEmpty()
	],
	async (req,res) => {
	 const errors = validationResult(req)
	 if (!errors.isEmpty()) {
	 	return res.status(400).json({errors:errors.array()})
	 }

	 try{
	 	const user = await User.findById(res.authToken.id).select('-password')
	 	const status = await Status.findById(req.params.status_id)
	 	const profile = await Profile.findOne({user:res.authToken.id})

	 	const newCommentObj = {
	 		user:res.authToken.id,
	 		name:user.fristname +' '+ user.lastname,
	 		avatar:profile.profilePicture,
	 		text:req.body.text,
	 	}

	 	status.comments.unshift(newCommentObj)
	 	await status.save()
	 	res.json(status.comments)
	 }catch(e){
		res.status(500).send('SERVER ERROR...')
	 }
})

//@route 	DELETE api/status/comment/:status_id/:comment_id
//@desc 	REMOVE COMMENT BY STATUS ID
//@acces 	PRIVAT
router.delete('/comment/:status_id/:comment_id',auth, async (req,res) => {
	try{
		const status = await Status.findById(req.params.status_id);
		const comment = status.comments.find(x => x.id === req.params.comment_id)

		if (!comment) {
			return res.status(404).json({msg:'No comment'})
		}

		if (comment.user.toString() !== res.authToken.id) {
			return res.status(401).json({msg:'Invalid User'})
		}

		const removeIndex = status.comments.map(x => x.user.toString()).indexOf(res.authToken.id)
		
		status.comments.splice(removeIndex,1)
		
		await status.save()
		res.json(status)
	}catch(e){
		res.status(500).send('SERVER ERROR...')
	}
})


module.exports = router;
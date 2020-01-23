const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StausSchema = new mongoose.Schema({
	user:{
		type:Schema.Types.ObjectId,
		ref:'user'
	},
	text:{
		type:String,
		required:true
	},
	profile:{
		type:Object
	},
	name:{
		type:String
	},
	likes:[],
	comments:[
	 {
	 	user:{
	 		type:Schema.Types.ObjectId,
	 		ref:'user'
	 	},
	 	text:{
	 		type:String,
	 		required:true
	 	},
	 	name:{
	 		type:String
	 	},
	 	avatar:{
	 		type:String
	 	},
	 	date:{
	 		type:Date,
	 		default:Date.now
	 	}
	 }
	],
	date:{
		type:Date,
		default:Date.now
	}
})


module.exports = Staus = mongoose.model('status',StausSchema);
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	fristname:{
		type:String,
		require:true
	},
	lastname:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true,
		unique:true
	},
	birthDate:{
		type:String
	},
	gender:{
		type:String
	},
	password:{
		type:String,
		require:true
	},
	avatar:{
		type:String
	},
	date:{
		type:Date,
		default:Date.now
	}
})


module.exports = User = mongoose.model('User',UserSchema);
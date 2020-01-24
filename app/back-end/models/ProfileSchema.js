const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new mongoose.Schema({
	user:{
		type:Schema.Types.ObjectId,
		ref:'user'
	},
	userInfo:{
		type:Object
	},
	profilePicture:{
		type:String
	},
	coverPicture:{
		type:String
	},
	work:[
		{
			user:{
				type:String
			},
			workPlaceName:{
				type:String,
				required:true
			},
			position:{
				type:String,
			},
			location:{
				type:String,
			},
			description:{
				type:String,
			},
			from:{
				type:Date
			},
			to:{
				type:Date
			},
			current:{
				type: String
			}

		}
	],
	education:[
		{	
			user:{
				type:String
			},
			school:{
				type:String,
				required:true
			},
			fieldofStudy:{
				type:String
			},
			location:{
				type:String,
			},
			description:{
				type:String,
			},
			from:{
				type:Date
			},
			to:{
				type:Date
			},
			current:{
				type:String
			}

		}
	],
	currentcity:{
		type:String
	},
	homeTown:{
		type:String
	},
	mobile:{
		type:String
	},
	email:{
		type:String
	},
	website:{
		type:String
	},
    social: {
	    twitter: {
	      type: String
	    },
	    linkedin: {
	      type: String
	    },
	    instagram: {
	      type: String
	    }
    },
	birthDate:{
    	type:Date
    },
    gender:{
    	type:String
    },
    interestedIn:{
    	type:[]
    },
    language:{
    	type:[String]
    },
    religious:{
    	type:String
    },
	connection:{
		following:[]
	},
   date: {
    type: Date,
    default: Date.now
  }




})


module.exports = Profile = mongoose.model('profile',ProfileSchema);
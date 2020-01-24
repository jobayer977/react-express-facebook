const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new mongoose.Schema({
	user:{
		type:Schema.Types.ObjectId,
		ref:'user'
	},
	profilePicture:{
		type:String
	},
	coverPicture:{
		type:String
	},
	bio:{
		type:String,
		max:100
	},
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
	work:[
		{
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
				type:Boolean,
				default:false
			}

		}
	],
	education:[
		{
			school:{
				type:String,
				required:true
			},
			fieldofStudy:{
				type:String,
				required:true
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
				type:Boolean,
				default:false
			}

		}
	],
	 social: {
	    github: {
	      type: String
	    },
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
   date: {
    type: Date,
    default: Date.now
  }




})


module.exports = Profile = mongoose.model('profile',ProfileSchema);
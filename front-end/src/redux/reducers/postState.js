import {
	GET_POST,
	GET_POSTS,
	ADD_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
	UPDATE_LIKES,
	DELETE_POST,
	POST_ERROR
} from '../actions/types'


const initState = {
	posts:null,
	loading:true,
	post:null,
	error:{},
	comments:[]
}


export default function (state = initState,action) {
	switch(action.type) {
		case ADD_POST:
			return {
				...state,
				posts:{
					getAllStatus:[action.payload,...state.posts.getAllStatus],
				},
				loading:false
			}
		case GET_POST:
		     return {
		     	...state,
		     	post:action.payload,
		     	loading:false
		     }
		case GET_POSTS:
		     return {
		     	...state,
		     	posts:action.payload,
		     	loading:false
		     }
		case UPDATE_LIKES:
			return{
				...state,
				post: action.payload.like,
				posts:{
					getAllStatus:state.posts.getAllStatus.map(x => x._id == action.payload.id ? {...x,likes:action.payload.like.likes}:x)
				},
				loading:false
			}

		case ADD_COMMENT:
			return {
				...state,
				post:{
					...state.post,
					comments:action.payload
				}
			}
		case DELETE_COMMENT:
			return {
				...state,
				post:action.payload,
				loading:false
			}
			console.log(action.payload)
		case DELETE_POST:
			return {
				...state,
				posts:{
					getAllStatus:state.posts.getAllStatus.filter(post => post._id !== action.payload)
				},
				loading:false
			}
		 case POST_ERROR:
		 	return {
		 		...state,
		 		loading:false,
		 		error:action.payload
		 	}
		 default:
		 	return state
	}
}
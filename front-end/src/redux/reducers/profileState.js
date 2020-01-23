import {
	GET_PROFILE,
	GET_PROFILES,
	GET_PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	UPDATE_SOCIAL_PROFILE,
	UPDATE_CONTACT_PROFILE
} from '../actions/types'


const initialState = {
	profile:null,
	profiles:[],
	loading:true,
	error:{}
}


export default function (state = initialState , action) {
	switch(action.type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile:action.payload,
				loading:false
			}
		case GET_PROFILES:
			return {
				...state,
				profiles:action.payload,
				loading:false
			}
		case GET_PROFILE_ERROR:
			return {
				...state,
				loading:false,
				error:action.payload
			}
		case CLEAR_PROFILE:
			return {
				...state,
				profile:null,
				loading:false
			}
		default:
			return state
	}
}
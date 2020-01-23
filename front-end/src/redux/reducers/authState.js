import {
	REGISTER_SUCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_LOGIN_ERRORS
} from '../actions/types'



const initialState = {
	token:localStorage.getItem('token'),
	isAuthenticated:null,
	loginError:null,
	loading:true,
	user:null
}


export default function (state = initialState,action) {
	switch(action.type) {

		case USER_LOADED:
			return {
				...state,
				isAuthenticated:true,
				loading:false,
				user:action.payload
			}

		case REGISTER_SUCESS:
		case LOGIN_SUCESS:
			localStorage.setItem('token',action.payload.token )
			return {
				...state,
				...action.payload,
				isAuthenticated:true,
				loading:false
			}
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token')
			return {
				...state,
				token:null,
				isAuthenticated:false,
				loading:false,
				user:null
			}
		case LOGIN_FAIL:
			return {
				...state,
				token:null,
				isAuthenticated:false,
				loading:false,
				loginError:true
			}
		case CLEAR_LOGIN_ERRORS:
			return {
				...state,
				loginError:false
			}
		default:
			return state
			
	}
}
import axios from 'axios'
import {alertAction} from './alertAction'
import setAuthToken from '../../util/setAuthToken'
import {Redirect} from 'react-router-dom'
import { browserHistory } from 'react-router'

import {
	REGISTER_SUCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_LOGIN_ERRORS,
	CLEAR_PROFILE
} from './types.js'



//USER LOADED
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}
	try {
		const res = await axios.get('/api/auth')
		dispatch({
			type:USER_LOADED,
			payload:res.data
		})
	
	} catch(e) {
		dispatch({
			type:AUTH_ERROR
		})
	}
}







// REGISTER
export const register = ({fristname,lastname,email,gender,birthDate,password}) => async dispatch => {
	const config = {
		headers:{
			'Content-Type':'application/json'
		}
	}
	const body = JSON.stringify({fristname,lastname,email,gender,birthDate,password})
	try {
		const res = await axios.post('/api/user', body,config)
		dispatch({
			type:REGISTER_SUCESS,
			payload:res.data
		})
	} catch(e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.map(x => dispatch(alertAction(x.msg,'danger')))
		}
	}
}


// LOGIN
export const login = (email,password) => async dispatch => {
	const config = {
		headers:{
			'Content-Type':'application/json'
		}
	}
	const body = JSON.stringify({email,password})

	try {
		const res = await axios.post('/api/auth', body,config)
		dispatch({
			type:LOGIN_SUCESS,
			payload:res.data
		})
		dispatch(loadUser())
	} catch(e) {
		if (e.response) {
			const errors = e.response.data.errors;
			if (errors) {
				errors.map(x => dispatch(alertAction(x.msg,'danger')))
			}
			dispatch({
				type:LOGIN_FAIL
			})
			dispatch({
				type:CLEAR_LOGIN_ERRORS
			},2000)
		}
	}
}


// LOGOUT
export const logout = () => dispatch => {
	dispatch({
		type:LOGOUT
	})
	dispatch({
		type:CLEAR_PROFILE
	})
		
}
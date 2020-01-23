import axios from 'axios'
import {alertAction} from '../actions/alertAction'
import {
	GET_PROFILE,
	GET_PROFILES,
	GET_PROFILE_ERROR,
	CLEAR_PROFILE,
	CREATE_PROFILE,
	UPDATE_PROFILE,
	UPDATE_CONNECTION
} from './types'



// GET LOGIN PROFILE DATA
export const getProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me')
		dispatch({
			type:GET_PROFILE,
			payload:res.data
		})
	} catch(e) {
		if (e.response) {
				dispatch({
				type:GET_PROFILE_ERROR,
				payload:{
					msg:e.response.data.msg,
					status:e.response.status
				}
			})
		}
	}
}


//GET ALL PROFILES
export const getProfiles = () => async dispatch => {	
	dispatch({type:CLEAR_PROFILE})	
	try {	
		const res = await axios.get('/api/profile')	
		dispatch({	
			type:GET_PROFILES,
			payload:res.data	
		})	
	} catch(e) {	
		if (e.response) {
			dispatch({
				type:GET_PROFILE_ERROR,
				payload:{
					msg:e.response.data.msg,
					status:e.response.status
				}
			})
		}
	}	
}

//FIND PROFILE BY ID
export const getProfileById = (userID) => async dispatch => {	
	try {	
		const res = await axios.get(`/api/profile/${userID}`)	
		dispatch({	
			type:GET_PROFILE,	
			payload:res.data	
		})	
	} catch(e) {	
		if (e.response) {
			dispatch({
				type:GET_PROFILE_ERROR,
				payload:{
					msg:e.response.data.msg,
					status:e.response.status
				}
			})
		}	
	}	
}



// UPDATE OR CREATE PROFILE
export const updateProfile = (formData,history,edit = false) => async dispatch => {
	try {
		const config = {
			headers:{
				'Content-Type':'application/json'
			}
		}
		const res = await axios.post('/api/profile',formData,config);
		dispatch({
			type:UPDATE_PROFILE,
			payload:res.data
		})
		dispatch(alertAction(edit ? 'Profile Updated' : 'Profile Created','success'))
		setTimeout(() => history.push('/about'),2000)
	} catch(e) {
		if (e.response) {
			const errors = e.response.data.errors
			if (errors) {
				errors.map(x => dispatch(alertAction(x.msg,'danger')))
			}
			dispatch({
				type:GET_PROFILE_ERROR,
				payload:{
					msg:e.response.statusText,
					status:e.response.status
				}
			})
		}
	}
}


//ADD WORK
export const addWork = (formData,history) => async dispatch => {
	try {
		const config = {
			headers:{
				'Content-Type':'application/json'
			}
		}
		const res = await axios.put('/api/profile/work',formData,config)
		dispatch({
			type:UPDATE_PROFILE,
			payload:res.data
		})
		dispatch(alertAction('Work Added','success'))
		 setTimeout(() => history.push('/about'),2000)
	} catch(e) {
			if (e.response) {
			const errors = e.response.data.errors
			if (errors) {
				errors.map(x => dispatch(alertAction(x.msg,'danger')))
			}
			dispatch({
				type:GET_PROFILE_ERROR,
				payload:{
					msg:e.response.statusText,
					status:e.response.status
				}
			})
		}
	}
}

// DELETE WORK
export const deleteWork = (workId) => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/work/${workId}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload:res.data
		})
		dispatch(alertAction('Work Removed Successfully','success'))
	} catch(e) {
		if (e.response) {
			const errors = e.response.data.errors
			if (errors) {
				errors.map(x => dispatch(alertAction(x.msg,'danger')))
			}
		}
		dispatch({
			type:GET_PROFILE_ERROR,
			payload:{
				msg:e.response.statusText,
				status:e.response.status
			}
		})
	}
}



//ADD EDUCATION
export const addEdu = (formData,history) => async dispatch => {
	try {
		const config = {
			headers:{
				'Content-Type':'application/json'
			}
		}
		const res = await axios.put('/api/profile/education',formData,config)
		dispatch({
			type:UPDATE_PROFILE,
			payload:res.data
		})
		dispatch(alertAction('Education Added','success'))
		setTimeout(() => history.push('/about'),2000)
	} catch(e) {
			if (e.response) {
			const errors = e.response.data.errors
			if (errors) {
				errors.map(x => dispatch(alertAction(x.msg,'danger')))
			}
			dispatch({
				type:GET_PROFILE_ERROR,
				payload:{
					msg:e.response.statusText,
					status:e.response.status
				}
			})
		}
	}
}

// DELETE EDUCATION
export const deletedEdu = (eduId) => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/education/${eduId}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload:res.data
		})
		dispatch(alertAction('Education Removed Successfully','success'))
	} catch(e) {
		if (e.response) {
			const errors = e.response.data.errors
			if (errors) {
				errors.map(x => dispatch(alertAction(x.msg,'danger')))
			}
		}
		dispatch({
			type:GET_PROFILE_ERROR,
			payload:{
				msg:e.response.statusText,
				status:e.response.status
			}
		})
	}
}


// ADD CONNECTION
export const updateConnection = (followUserId) => async dispatch => {
	try {
		const config = {
			headers:{
				'Content-Type':'application/json'
			}
		}
		const res = await axios.put(`/api/profile/connection/follow/${followUserId}`)
		dispatch({
			type:UPDATE_PROFILE,
			payload:res.data
		})
		dispatch(alertAction('Added In Your Connection','success'))
		// setTimeout(() => history.push('/about'),2000)
	} catch(e) {
			if (e.response) {
			const errors = e.response.data.errors
			if (errors) {
				errors.map(x => dispatch(alertAction(x.msg,'danger')))
			}
			dispatch({
				type:GET_PROFILE_ERROR,
				payload:{
					msg:e.response.statusText,
					status:e.response.status
				}
			})
		}
	}
}
import axios from 'axios'
import {alertAction} from './alertAction'
import {
	GET_POST,
	GET_POSTS,
	ADD_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
	UPDATE_LIKES,
	DELETE_POST,
	POST_ERROR
} from './types'


// GET ALL POST
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/status')
		dispatch({
			type:GET_POSTS,
			payload:res.data
		})
	} catch(error) {
		if (error.response) {
			dispatch({
				type:POST_ERROR,
				payload:{
					msg:error.response.data,
					status:error.response.data.status
				}
			})
		}
	}
}

//GET POST BY ID
export const getPost  = (statusId) =>  async dispatch => {
	try {
		const res = await axios.get(`/api/status/${statusId}`)
		dispatch({
			type:GET_POST,
			payload:res.data
		})
	} catch(error) {
		if (error.response) {
			dispatch({
				type:POST_ERROR,
				payload:{
					msg:error.response.data,
					status:error.response.data.status
				}
			})
		}
	}
}


// ADD A POST
export const addPost = (textData) => async dispatch => {
	const config = {
		headers:{
			'Content-Type':'application/json'
		}
	}
	try {
		
		const res = await axios.post('/api/status',textData,config)
		dispatch({
			type:ADD_POST,
			payload:res.data
		})
	dispatch(alertAction('Post Created Successfully','success'))
	} catch(error) {
		if (error.response) {
			dispatch({
				type:POST_ERROR,
				payload:{
					msg:error.response.data,
					status:error.response.data.status
				}
			})
		}
	}
}


//DELETE_POST
export const deletePost  = (statusId) =>  async dispatch => {
	try {
		const res = await axios.delete(`/api/status/${statusId}`)
		dispatch({
			type:DELETE_POST,
			payload:statusId
		})

		dispatch(alertAction('Post Remvoed Successfully','success'))
	} catch(error) {
		if (error.response) {
			dispatch({
				type:POST_ERROR,
				payload:{
					msg:error.response.data,
					status:error.response.data.status
				}
			})
		}
	}
}



// LIKE UNLIKE
export const updateLike  = (statusId) =>  async dispatch => {
	try {
		const res = await axios.put(`/api/status/likes/${statusId}`)
		dispatch({
			type:UPDATE_LIKES,
			payload:{
				id:statusId,
				like:res.data
			}
		})

	} catch(error) {
		if (error.response) {
			dispatch({
				type:POST_ERROR,
				payload:{
					msg:error.response.data,
					status:error.response.data.status
				}
			})
		}
	}
}


//	ADD_COMMENT
export const addComment  = (postId,formData) =>  async dispatch => {
	const config = {
		headers:{
			'Content-Type':'application/json'
		}
	}

	try {
		const res = await axios.put(`/api/status/comment/${postId}`,formData,config)
		dispatch({
			type:ADD_COMMENT,
			payload:res.data
		})

		dispatch(alertAction('Comment Added Successfully','success'))
	} catch(error) {
		if (error.response) {
			dispatch({
				type:POST_ERROR,
				payload:{
					msg:error.response.data,
					status:error.response.data.status
				}
			})
		}
	}
}




//	DELETE COMMENT
export const deleteComment  = (postId,commentId) =>  async dispatch => {

	try {
		const res = await axios.delete(`/api/status/comment/${postId}/${commentId}`)
		dispatch({
			type:DELETE_COMMENT,
			payload:res.data
		})
		dispatch(alertAction('Comment Removed Successfully','success'))
	} catch(error) {
		if (error.response) {
			dispatch({
				type:POST_ERROR,
				payload:{
					msg:error.response.data,
					status:error.response.data.status
				}
			})
		}
	}
}
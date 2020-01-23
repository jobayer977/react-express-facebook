import {combineReducers} from 'redux'
import authState from './authState'
import alertState from './alertState'
import profileState from './profileState'
import postState from './postState'

export default combineReducers({
	authState,
	alertState,
	profileState,
	postState
})
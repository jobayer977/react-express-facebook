import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


const PrivateRoute = ({component:Component, authState:{isAuthenticated,loading},...rest }) => 
(<Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login"/>):(<Component {...props}/>)}/>)





PrivateRoute.propTypes = {
	authState: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
	authState:state.authState
})

export default connect(mapStateToProps)(PrivateRoute);
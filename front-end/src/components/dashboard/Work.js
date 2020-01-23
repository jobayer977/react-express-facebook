import React, {Fragment,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import {deleteWork} from '../../redux/actions/profileActions'



const Work = ({deleteWork,work,authState}) => {
  return (
    <Fragment>
    	  <div className="about-item">
	        <i className="fa fa-briefcase"></i>
	        <div>
	          <h5>{work.workPlaceName && work.workPlaceName}
	           	{
	           		authState.user && authState.user._id === work.user ? 
	           		<Link href="!#" className="edit-btn" onClick={() => deleteWork(work._id)}>
	           		<i className="fa fa-trash-o"></i></Link> : ''
	           	}
	           </h5>
	          <p>{work.position && work.position} 
	          	{' '} 
	          	 <Moment format="D MMM YYYY" withTitle>{work.from && work.from}</Moment> 
	          	 {' '}
	          	 to {work.current == "true" ? 'Present' : 
	          	 (<Moment format="D MMM YYYY" withTitle>{work.to && work.to}</Moment>)} 
	          	 {' ,'}
	          	 {work.location && work.location}
	          </p>
	        </div>
	       </div>
    </Fragment>
  )
}

Work.propTypes = {
	authState : PropTypes.object.isRequired,
	deleteWork: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	authState:state.authState
})



export default connect(mapStateToProps,{deleteWork})(Work);
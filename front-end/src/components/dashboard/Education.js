import React, {Fragment,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import {deletedEdu} from '../../redux/actions/profileActions'



const Education = ({deletedEdu,education,authState}) => {
  return (
    <Fragment>
    	  <div className="about-item">
	        <i className="fa fa-graduation-cap"></i>
	        <div>
	          <h5>{education.school && education.school}
	           	{
	           		authState.user && authState.user._id === education.user ? 
	           		<Link href="!#" className="edit-btn" onClick={() => deletedEdu(education._id)}>
	           			<i className="fa fa-trash-o"></i>
	           		</Link> : ''
	           	}
	           </h5>
	          <p>{education.fieldofStudy && education.fieldofStudy} 
	          	{' '} 
	          	 <Moment format="D MMM YYYY" withTitle>{education.from && education.from}</Moment> 
	          	 {' '}
	          	 to {education.current == "true" ? 'Present' : 
	          	 <Moment format="D MMM YYYY" withTitle>{education.to && education.to}</Moment> } 
	          	 {' '}
	          	 {education.location && education.location}
	          </p>
	        </div>
	       </div>
    </Fragment>
  )
}




Education.propTypes = {
	authState : PropTypes.object.isRequired,
	deletedEdu: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	authState:state.authState
})



export default connect(mapStateToProps,{deletedEdu})(Education);
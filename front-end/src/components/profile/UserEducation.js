import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'



const UserEducation = ({education}) => {
  return (
    <Fragment>
    	  <div className="about-item">
	        <i className="fa fa-graduation-cap"></i>
	        <div>
	          <h5>{education.school && education.school}</h5>
	          <p>{education.fieldofStudy && education.fieldofStudy} 
	          	{' '} 
	          	 <Moment format="D MMM YYYY" withTitle>{education.from && education.from}</Moment> 
	          	 {' '}
	          	 to {education.current === false ? 'Present' : 
	          	 <Moment format="D MMM YYYY" withTitle>{education.to && education.to}</Moment> } 
	          	 {' '}
	          	 {education.location && education.location}
	          </p>
	        </div>
	       </div>
    </Fragment>
  )
}




export default connect(null,{})(UserEducation);
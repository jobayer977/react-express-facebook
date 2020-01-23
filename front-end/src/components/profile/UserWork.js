import React, {Fragment,useState } from 'react';
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'



const UserWork = ({work}) => {
  return (
    <Fragment>
    	  <div className="about-item">
	        <i className="fa fa-briefcase"></i>
	        <div>
	          <h5>{work.workPlaceName && work.workPlaceName}</h5>
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



export default connect(null,{})(UserWork);
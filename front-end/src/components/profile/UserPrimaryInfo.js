import React, {Fragment } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import dummyCoverPicture from '../../img/dummyCoverPicture.jpg'
import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'
import { Link, Redirect } from "react-router-dom";


const UserPrimaryInfo = (props) => {
  return (
    <Fragment>
    	 <section className="primary-info">
		    <div className="cover-picture-wrapper">
		      <img className="cover-picture" src={props.profileData && props.profileData.coverPicture ? `/${props.profileData && props.profileData.coverPicture}` : dummyCoverPicture} alt=""/>
		     <div className="basic-info">
		         <div className="container">
		           <div className="row">
		             <div className="col-md-8">
		                <div className="profile-picture">
		                  <div className="profile-image">
		                  	<img src={props.profileData && props.profileData.profilePicture ? `/${props.profileData && props.profileData.profilePicture}` : dummyProfilePicture} alt=""/>
		                  </div>
		                  <div className="name-address">
		                    <h1>
			                     {props.profileData && props.profileData.user && props.profileData.user.fristname && props.profileData.user.fristname} {' '}
			                     {props.profileData && props.profileData.user && props.profileData.user.lastname && props.profileData.user.lastname}
		                    </h1>
		                    <p>
		                      <span><i className="fa fa-map"></i>{props.profileData && props.profileData.currentcity}</span>
		                      <span><i className="fa fa-link"></i>{props.profileData && props.profileData.website}</span>
		                    </p>
		                   <div className="profile-nav">
		                      <div className="social-link">
		                        <a href="/"><i className="fab fa-twitter"></i></a>
		                        <a href="/"><i className="fab fa-linkedin"></i></a>
		                        <a href="/"><i className="fab fa-instagram"></i></a>
		                      </div>
		                   </div>
		                  </div>
		                </div>
		             </div>
		             <div className="col-md-4">
		               <div className="profile-action">
			                <Link to={`/user/${props.profileData && props.profileData.user && props.profileData.user._id && props.profileData.user._id}`}>Timeline</Link>
                        	<Link to={`/about/${props.profileData && props.profileData.user && props.profileData.user._id && props.profileData.user._id}`}>About</Link>
                        	<Link to={`/connection/${props.profileData && props.profileData.user && props.profileData.user._id && props.profileData.user._id}`}>Friends</Link> 	
	                     </div>
		             </div>
		           </div>
		         </div>
		     </div>
		    </div>
		  </section>
    </Fragment>
  )
}

UserPrimaryInfo.propTypes = {
	profileData: PropTypes.object
}
 const mapStateToPops = (state) => ({
 	authState : state.authState,
 	profileState : state.profileState
 })


export default connect(mapStateToPops,{})(UserPrimaryInfo);



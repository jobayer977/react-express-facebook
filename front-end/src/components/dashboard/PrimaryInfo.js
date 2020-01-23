import React, {Fragment } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import dummyCoverPicture from '../../img/dummyCoverPicture.jpg'
import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'
import { Link, Redirect } from "react-router-dom";
import Timeline from './Timeline'
import About from './About'
import Friends from './Friends'

const PrimaryInfo = (props) => {
  return (
    <Fragment>
    	 <section className="primary-info">
		    <div className="cover-picture-wrapper">
		      <img className="cover-picture" src={props.profileData && props.profileData.coverPicture ? `/${props.profileData && props.profileData.coverPicture}` : dummyCoverPicture} alt=""/>
		      <Link className="coverPictureUploadIcon" to="/update-cover-picture">
		      <i class="fas fa-camera"></i></Link>
		     <div className="basic-info">
		         <div className="container">
		           <div className="row">
		             <div className="col-md-8">
		                <div className="profile-picture">
		                  <div className="profile-image">
		                  	<img src={props.profileData && props.profileData.profilePicture ? `/${props.profileData && props.profileData.profilePicture}` : dummyProfilePicture} alt=""/>
		                  		<Link className="uploadIcon" to="/update-profile-picture"><i class="fas fa-camera"></i></Link>
		                  </div>
		                  <div className="name-address">
		                    <h1>
			                     {props.authState.user && props.authState.user.fristname} {' '}
			                     {props.authState.user && props.authState.user.lastname}
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
		               {
			              props.profileState && props.profileState.profile == null ? 
			              (<Fragment>
			                <Link to="/add-basic-info">Create Profile</Link>  
			              </Fragment>):
			              (<Fragment>
			                <Link to="/profile">Timeline</Link>
                        	<Link to="/About">About</Link>
                        	<Link to="/connection">Friends</Link>
			              </Fragment>)
			            }
                    	 	
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

PrimaryInfo.propTypes = {
	profileData: PropTypes.object
}
 const mapStateToPops = (state) => ({
 	authState : state.authState,
 	profileState : state.profileState
 })


export default connect(mapStateToPops,{})(PrimaryInfo);



import React, {Fragment,useState,useEffect } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {getProfile} from '../../redux/actions/profileActions'
import Work from './Work'
import Education from './Education'
import {PulseLoaderSpinner} from '../Spinner'
import Moment from 'react-moment'
import PrimaryInfo from './PrimaryInfo'
import Alert from '../layout/Alert'
	
const About = ({getProfile,profileState,profileState:{profile,loading}}) => {
	useEffect(() => {
		getProfile()
	},[])
  return ( profile === null && loading === true ? <PulseLoaderSpinner loading={loading}/> :
    <Fragment>
    	<PrimaryInfo profileData={profile}/>
    	<section className="about-wrapper">
		  <div className="container">
		    <div className="about">
		    <h1 className="primary-title"><i className="fa fa-users"></i>About</h1>
		    <div className="about-section">
		     <Alert/>
		      <div className="row">
		        <div className="col-md-12">
		          <h5 className="sub-title">work</h5>
		         
		          <div className="add-fill">
		             <Link to="/add-work"><i className="fa fa-plus-circle"></i> Add Work</Link>
		          </div>
			        {
			        	profile && profile.work ? 
			        	profile.work.map((work,i) => <Work key={i} work={work} />):
			        	(<p className="nothing-found">No Work Exists</p>)
			        }
		        </div>
		      </div>
		    </div>
		    <div className="about-section">
		      <div className="row">
		        <div className="col-md-12">
		          <h5 className="sub-title">Education</h5>

		          <div className="add-fill">
		            <Link to="/add-edu"><i className="fa fa-edit"></i> Add a Education</Link>
		          </div>
		         	{
			        	profile && profile.education ? 
			        	profile.education.map((education,i) => <Education key={i} education={education} />):
			        	(<p className="nothing-found">No Work Exists</p>)
			        }
		        </div>
		      </div>
		    </div>
		  
		    <div className="about-section">
		      <div className="row">
		        <div className="col-md-12">
		          <h5 className="sub-title">CURRENT CITY AND HOMETOWN</h5>
		          <div className="add-fill">
		            <Link to="/add-city"><i className="fa fa-edit"></i> Update City</Link>
		          </div>
		          <div className="about-item">
		            <i className="fa fa-map"></i>
		            <div>
		              <h5>{profile && profile.currentcity}</h5>
		              <p>Current city</p>
		            </div>
		          </div>
		          <div className="about-item">
		            <i className="fa fa-map"></i>
		            <div>
		              <h5>{profile && profile.homeTown}</h5>
		              <p>Hometown</p>
		            </div> 
		          </div>
		        </div>
		      </div>
		    </div>
		  
		    <div className="about-section">
		      <div className="row">
		        <div className="col-md-12">
		          <h5 className="sub-title">CONTACT INFORMATION</h5>
		          <div className="add-fill">
		            <Link to="/contactinfo"><i className="fa fa-edit"></i> Update Contact</Link>
		          </div>
		          <div className="about-item">
		            <div className="cotact-info">

		            {
		            	profile && profile.mobile ? (
		            		<div className="contact-info-item"><h6>Mobile Phones </h6> <span>
				              <a href={`tel:${profile && profile.mobile}`}>{profile && profile.mobile}</a></span>
				             </div>
		            		): ''
		            }{
		            	profile && profile.email ? (
		            		<div className="contact-info-item"><h6>Email</h6> <span>
				              <a href={`mailto:${profile && profile.email}`}>{profile && profile.email}</a></span>
				             </div>
		            		): ''
		            }
		             
		              

		            </div>
		          </div>
		        </div>
		      </div>
		    </div>

		    <div className="about-section">
		      <div className="row">
		        <div className="col-md-12">
		          <h5 className="sub-title">WEBSITES AND SOCIAL LINKS</h5>
		          <div className="add-fill">
		             <Link to="/socialLinks"><i className="fa fa-edit"></i> Edit Social Links</Link>
		          </div>
		          <div className="about-item">
		            <div className="cotact-info">
			            {
			            	profile && profile.website ? (
			            		<div className="contact-info-item">
			            		<h6>Website</h6> 
			            		<span>
					              <a href={profile && profile.website}>{profile && profile.website}</a>
					              </span>
					             </div>
			            		): ''
			            }{
			            	profile && profile.social && profile.social.twitter ? (
			            		<div className="contact-info-item">
			            		<h6>Twitter</h6> 
			            		<span>
					              <a href={profile.social && profile.social.twitter}>
					            	 {profile.social && profile.social.twitter}</a>
					              </span>
					             </div>
			            		): ''
			            }
			            {
			            	profile && profile.social && profile.social.linkedin ? (
			            		<div className="contact-info-item">
			            		<h6>linkedin</h6> 
			            		<span>
					              <a href={profile.social && profile.social.linkedin}>
					            	 {profile.social && profile.social.linkedin}</a>
					              </span>
					             </div>
			            		): ''
			            } {
			            	profile && profile.social && profile.social.instagram ? (
			            		<div className="contact-info-item">
			            		<h6>Instagram</h6> 
			            		<span>
					              <a href={profile.social && profile.social.instagram}>
					            	 {profile.social && profile.social.instagram}</a>
					              </span>
					             </div>
			            		): ''
			            }
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
	
		    <div className="about-section">
		      <div className="row">
		        <div className="col-md-12">
		          <h5 className="sub-title">BASIC INFORMATION</h5>
		          <div className="add-fill">
		            <Link to="/add-basic-info"><i className="fa fa-edit"></i> Edit Basic info</Link>
		          </div>
		          <div className="about-item">
		            <div className="cotact-info">
		              {
		              	profile && profile.birthDate ? (
		              		<div className="contact-info-item"><h6>BirthDay </h6> 
							  <span>
							  	<Moment format="D MMM YYYY" withTitle>{profile && profile.birthDate}</Moment>
							  </span>
							</div>) : ''
		              }{
		              	profile && profile.gender ? (
		              		<div className="contact-info-item"><h6>Gender</h6> 
							  <span>
							  	{profile && profile.gender}
							  </span>
							</div>) : ''
		              }{
		              	profile && profile.interestedIn ? (
		              		<div className="contact-info-item"><h6>Interested In </h6> 
							  <span>
							  	{profile && profile.interestedIn.map(x => (`${x}${' '}`))}
							  </span>
							</div>) : ''
		              }
		            </div>
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




About.propTypes = {
	profileState : PropTypes.object.isRequired,
	getProfile : PropTypes.func.isRequired,
	authState : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profileState: state.profileState,
	authState:state.authState
})



export default connect(mapStateToProps,{getProfile})(About);





import React,{Fragment,useEffect} from 'react';
import{connect} from 'react-redux'
import {getProfileById} from '../../redux/actions/profileActions'
import UserPrimaryInfo from './UserPrimaryInfo'
import UserWork from './UserWork'
import UserEducation from './UserEducation'
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'




const UserAbout = ({getProfileById,match,profileState:{profile}}) => {
	useEffect(() => {
		getProfileById(match.params.userId)
	},[getProfileById,match.params.userId])
  return (
    <Fragment>
    	 <UserPrimaryInfo profileData={profile && profile}/>
    	 <section class="about-wrapper">
		  <div class="container">
		    <div class="about">
		    <h1 class="primary-title"><i class="fa fa-users"></i>About</h1>

	

		    {
	        	profile && profile.work ? 
	        	(<Fragment>
	        		    <div class="about-section">
					      <div class="row">
					        <div class="col-md-12">
					          <h5 class="sub-title">work</h5>
					          {
					          	profile && profile.work && profile.work.map((work,i) => (<UserWork key={i} work={work}/>))
					          }
					        </div>
					      </div>
					    </div>
	        	</Fragment>): ""
			}
			{
	        	profile && profile.education ? 
	        	(<Fragment>
	        		    <div class="about-section">
					      <div class="row">
					        <div class="col-md-12">
					          <h5 class="sub-title">Education</h5>
					          {
					          	profile && profile.education && profile.education.map((education,i) => (<UserEducation key={i} education={education}/>))
					          }
					        </div>
					      </div>
					    </div>
	        	</Fragment>): ""
			}

			{
				profile && profile.currentcity || profile && profile.homeTown ? 
				(<Fragment>

				    <div class="about-section">
				      <div class="row">
				        <div class="col-md-12">
				          <h5 class="sub-title">CURRENT CITY AND HOMETOWN</h5>
				          
				          {
				          	profile && profile.currentcity ? (<Fragment>
				          		<div class="about-item">
						            <i class="fa fa-map"></i>
						            <div>
						              <h5>{profile && profile.currentcity}</h5>
						              <p>Current city</p>
						            </div>
						         </div>
				          	</Fragment>):""
				          }
				          {
				          	profile && profile.homeTown ? (<Fragment>
				          		<div class="about-item">
						            <i class="fa fa-map"></i>
						            <div>
						              <h5>{profile && profile.homeTown}</h5>
						              <p>HomeTown</p>
						            </div>
						         </div>
				          	</Fragment>):""
				          }

				        </div>
				      </div>
				    </div>					
				</Fragment>):""
			}


		  <div className="about-section">
		      <div className="row">
		        <div className="col-md-12">
		          <h5 className="sub-title">CONTACT INFORMATION</h5>
		          
		          <div className="about-item">
		            <div className="cotact-info">

		            {
		            	profile && profile.mobile ? (
		            		<div className="contact-info-item"><h6>Mobile Phones </h6> <span>
				             {profile && profile.mobile}</span>
				             </div>
		            		): ''
		            }{
		            	profile && profile.email ? (
		            		<div className="contact-info-item"><h6>Email</h6> <span>
				              {profile && profile.email}</span>
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
		          
		          <div className="about-item">
		            <div className="cotact-info">
			            {
			            	profile && profile.website ? (
			            		<div className="contact-info-item">
			            		<h6>Website</h6> 
			            		<span>
					              {profile && profile.website}
					              </span>
					             </div>
			            		): ''
			            }{
			            	profile && profile.social && profile.social.twitter ? (
			            		<div className="contact-info-item">
			            		<h6>Twitter</h6> 
			            		<span>
					             
					            	 {profile.social && profile.social.twitter}
					              </span>
					             </div>
			            		): ''
			            }
			            {
			            	profile && profile.social && profile.social.linkedin ? (
			            		<div className="contact-info-item">
			            		<h6>linkedin</h6> 
			            		<span>
					             
					            	 {profile.social && profile.social.linkedin}
					              </span>
					             </div>
			            		): ''
			            } {
			            	profile && profile.social && profile.social.instagram ? (
			            		<div className="contact-info-item">
			            		<h6>Instagram</h6> 
			            		<span>
					              
					            	 {profile.social && profile.social.instagram}
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
 const mapStateToProps = state => ({
 	profileState: state.profileState
 })

export default connect(mapStateToProps,{getProfileById})(UserAbout);
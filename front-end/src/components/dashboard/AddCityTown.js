import React, {Fragment, useEffect,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {updateProfile,getProfile} from '../../redux/actions/profileActions'
import Alert from '../layout/Alert'

const AddCityTown = ({updateProfile,getProfile,profileState,history}) => {
	
	const [formData,setFormData] = useState({
		website:'',
		twitter:'',
		linkedin:'',
		instagram:'',
		mobile:'',
		email:'',
		currentcity:'',
		homeTown:''
	})
	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
 	}
 	// SUBMIT
 	const onSubmit = async (e) => {
 		e.preventDefault()
 		updateProfile(formData,history,true)
 	}
 	useEffect(() => {
 		getProfile()
		setFormData({
			...formData,
			currentcity:profileState.profile &&
	 			   profileState.profile.currentcity ?
	 			   profileState.profile.currentcity &&
	 			   profileState.profile.currentcity:"",
	 		homeTown:profileState.profile &&
	 			   profileState.profile.homeTown ?
	 			   profileState.profile.homeTown &&
	 			   profileState.profile.homeTown:"",
	 		mobile:profileState.profile &&
	 			   profileState.profile.mobile ?
	 			   profileState.profile.mobile &&
	 			   profileState.profile.mobile:"",
	 		email:profileState.profile &&
	 			   profileState.profile.email ?
	 			   profileState.profile.email &&
	 			   profileState.profile.email:"",
			website:profileState.profile && 
			 		profileState.profile.website ?
			 		profileState.profile.website && 
			 		profileState.profile.website: "",
			twitter:profileState.profile && profileState.profile.social ?
					profileState.profile.social.twitter &&
					profileState.profile.social.twitter : "",
			linkedin:profileState.profile && profileState.profile.social ?
					profileState.profile.social.linkedin &&
					profileState.profile.social.linkedin : "",
			instagram:profileState.profile && profileState.profile.social ?
					profileState.profile.social.instagram &&
					profileState.profile.social.instagram : "", 	
 		})
	},[profileState.loading])
 	
 	const {currentcity,homeTown} = formData;
  return (
    <Fragment>
      <section class="hero-area">
	    <div class="container">
	      <div class="row">
	        <div class="col-md-12 text-center">
	              <div class="formBox center">
	               <form onSubmit={e => onSubmit(e)}>              
	                    <h1>Add City or HomeTown</h1>
	                    <Alert/>
	                    <div class="row">
	                        <div class="col-md-12">
	                            <input 
	                            	name="currentcity" 
	                            	type="text" 
	                            	placeholder="What is your Current City Name ?"
		                            value={currentcity}
				                    onChange = {(e) => onChange(e)}/>
	                        </div>
	                    </div>
	                    <div class="row">
	                        <div class="col-md-12">
	                            <input 
	                            	name="homeTown" 
	                            	type="text" 
	                            	placeholder="What is your HomeTown Name"
		                            value={homeTown}
				                    onChange = {(e) => onChange(e)}/>
	                        </div>
	                    </div>
	                    <input type="submit" value="Submit"/>
	                </form>
	            </div>
	        </div>
	      </div>
	    </div>
	  </section>
    </Fragment>
  )
}




AddCityTown.propTypes = {
	updateProfile : PropTypes.func.isRequired,
	getProfile : PropTypes.func.isRequired,
	profileState : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profileState:state.profileState
})



export default connect(mapStateToProps,{updateProfile,getProfile})(AddCityTown)
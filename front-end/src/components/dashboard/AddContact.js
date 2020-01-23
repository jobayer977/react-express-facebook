import React, {Fragment, useEffect,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {updateProfile,getProfile} from '../../redux/actions/profileActions'
import Alert from '../layout/Alert'

const AddContact = ({updateProfile,getProfile,profileState,history}) => {
	
	const [formData,setFormData] = useState({
		website:'',
		twitter:'',
		linkedin:'',
		instagram:'',
		mobile:'',
		email:''
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
			twitter:profileState.profile.social ?
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
 	
 	const {mobile,email} = formData;
  return (
    <Fragment>
     <section className="hero-area">
	    <div className="container">
	      <div className="row">
	        <div className="col-md-12 text-center">
	              <div className="formBox center">
	                <form onSubmit={e => onSubmit(e)}>
	                    <h1>Add CONTACT INFORMATION</h1>
	                    <Alert/>
	                    <div className="row">
	                        <div className="col-md-12">
	                            <input 
	                            	name="mobile" 
	                            	type="text" 
	                            	placeholder="Phone Number"
	                            	value={mobile}
					                onChange = {(e) => onChange(e)}/>
	                        </div>
	                    </div> 
	                    <div className="row">
	                        <div className="col-md-12">
	                            <input 
	                            	name="email" 
	                            	type="email" 
	                            	placeholder="Personal Email"
	                            	value={email}
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




AddContact.propTypes = {
	updateProfile : PropTypes.func.isRequired,
	getProfile : PropTypes.func.isRequired,
	profileState : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profileState:state.profileState
})



export default connect(mapStateToProps,{updateProfile,getProfile})(AddContact)
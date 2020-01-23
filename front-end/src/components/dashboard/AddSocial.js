import React, {Fragment, useEffect,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {updateProfile,getProfile} from '../../redux/actions/profileActions'
import Alert from '../layout/Alert'

const AddSocial = ({updateProfile,getProfile,profileState,history}) => {

	const [formData,setFormData] = useState({
		website:'',
		twitter:'',
		linkedin:'',
		instagram:''
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

 	
 	const {twitter,linkedin,instagram} = formData;
  return (
    <Fragment>
    	   <section className="hero-area">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-12 text-center">
		              <div className="formBox center">
		                <form onSubmit={e => onSubmit(e)}>
		                    <h1>Add WEBSITES AND SOCIAL LINKS</h1>
		                    <Alert/>
		                    <div className="row">
		                        <div className="col-md-12">
		                            <input 
		                            	name="website" 
		                            	type="text" 
		                            	placeholder="Your Website"
			                            value={formData.website}
					                    onChange = {(e) => onChange(e)}/>
		                        </div>
		                    </div> 
		                    <div className="row">
		                        <div className="col-md-12">
		                            <input 
		                            	name="twitter" 
		                            	type="text" 
		                            	placeholder="Twitter username"
			                            value={twitter}
					                    onChange = {(e) => onChange(e)}/>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-md-12">
		                            <input 
		                            	name="linkedin" 
		                            	type="text" 
		                            	placeholder="Linkedin username"
			                            value={linkedin}
					                    onChange = {(e) => onChange(e)}/>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-md-12">
		                            <input 
		                            	name="instagram" 
		                            	type="text" 
		                            	placeholder="Instagram username"
			                            value={instagram}
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




AddSocial.propTypes = {
	updateProfile : PropTypes.func.isRequired,
	getProfile : PropTypes.func.isRequired,
	profileState : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profileState:state.profileState
})



export default connect(mapStateToProps,{updateProfile,getProfile})(AddSocial)
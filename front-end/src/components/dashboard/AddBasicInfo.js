import React, {Fragment,useState,useEffect } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {updateProfile} from '../../redux/actions/profileActions'
import Alert from '../layout/Alert'



const AddBasicInfo = ({updateProfile,history}) => {
	const [formData,setFormData] = useState({
		birthDate:'',
		gender:'',
		interestedIn:'',
		language:''
	})
	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
 	}
 	const onGenderChange = (e) => {
		setFormData({
			...formData,
			gender: e.target.value
		})
 	}
 	const onInterstChange = (e) => {
		setFormData({
			...formData,
			interestedIn: e.target.value
		})
 	}

 		// SUBMIT
 	const onSubmit = async (e) => {
 		e.preventDefault()
 		updateProfile(formData,history)
 	}
 	const {birthDate,gender,interestedIn,language} = formData;
  return (
    <Fragment>
    	  <section className="hero-area">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-12 text-center">
		              <div className="formBox center">
		                <form onSubmit={e => onSubmit(e)}>
		                    <h1>Add Basic info</h1>
		                       <Alert/>
		                     <div className="row">
		                        <div className="col-md-12 text-left">
		                            <label>Birth Date</label> 
		                            <input 
		                            	name="birthDate" 
		                            	type="date" 
			                            value={birthDate}
					                    onChange = {(e) => onChange(e)}/>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-md-12">
		                            <div className="select-box">
		                              <label>Gender</label>
		                              <select 
			                              className="custom-select" 
			                              name="gender"
			                              value={gender}
					                      onChange = {(e) => onGenderChange(e)}>
		                                <option value="N/A">N/A</option>
		                                <option value="Custom">Custom</option>
		                                <option value="Male">Male</option>
		                                <option value="Female">Female</option>
		                            </select>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-md-12">
		                            <div className="select-box">
		                              <label>Interested In</label>
		                              <select 
			                              className="custom-select" 
			                              name="interestedIn"
			                              value={interestedIn}
					                      onChange = {(e) => onInterstChange(e)}>
		                                <option value="N/A">N/A</option>
		                                <option value="Men">Men</option>
		                                <option value="Woman">Woman</option>
		                                <option value="Men Woman">Men Woman</option>
		                            </select>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-md-12">
			                        <div className="select-box">
			                        	<label>Language</label>
			                            <input 
			                            	name="language" 
			                            	type="text" 
			                            	placeholder="Bangla,English"
			                            	name="language"
			                              	value={language}
					                      	onChange = {(e) => onChange(e)}
			                            />
			                        </div>
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




AddBasicInfo.propTypes = {
	updateProfile : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	
})



export default connect(mapStateToProps,{updateProfile})(AddBasicInfo)
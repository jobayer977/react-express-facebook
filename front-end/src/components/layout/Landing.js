import React, {Fragment,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions/authAction'
import {alertAction} from '../../redux/actions/alertAction'
import Alert from './Alert'




 const Landing = (props) => {

 	const [formData,setFormData] = useState({
 		fristname: '',
		lastname: '',
 		email:'',
 		password:'',
 		password2:'',
 		birthDate:'',
 		gender:''
 	})

 	if (props.authState.isAuthenticated) {
 		return <Redirect to="/profile"/>
 	}

 	if (props.authState.loginError) {
 		return <Redirect to="/login"/>
 	}

	
 	const onChange = (e) => {
 		setFormData({
 			...formData,
 			[e.target.name]: e.target.value
 		})
 	}

 	// SUBMIT
 	const onSubmit = async (e) => {
 		e.preventDefault()
 		if (formData.password !== formData.password2) {
 			props.alertAction('Password Do not match','danger')
 		}else {
 			props.register({
 				fristname:formData.fristname,
				lastname:formData.lastname,
		 		email:formData.email,
		 		password:formData.password,
		 		password2:formData.password2,
		 		birthDate:formData.birthDate,
		 		gender:formData.gender
 			})
 		}
 	}

		return (
			<Fragment>
				  <section className="hero-area">
				    <div className="container">
				   
				      <div className="row">
				        <div className="col-md-6">
				          <div className="hero-line">
				           <span>
				              <h2>Connect to World</h2>
				              <p>We are the best and biggest social network with 5 billion active users all around the world. Share your thoughts, write blog posts, show your favourite music, earn badges and much more!</p>
				           </span>
				          </div>
				        </div>
				        <div className="col-md-6">
				              <div className="formBox">
				                <form onSubmit={e => onSubmit(e)}>
				                 <h1>Create a new account</h1>
				                 <Alert/>
				                    <div className="row">
				                        <div className="col-md-6">
				                            <input 
				                            	name="fristname" 
				                            	type="text" 
				                            	placeholder="First Name"
				                            	value={formData.text}
				                            	onChange = {(e) => onChange(e)}
				                            />
				                        </div>
				                        <div className="col-md-6">
				                            <input 
				                            	name="lastname" 
				                            	type="text" 
				                            	placeholder="Last Name"
				                            	value={formData.text}
				                            	onChange = {(e) => onChange(e)}
				                            />
				                        </div>
				                    </div> 
				                    <div className="row">
				                        <div className="col-md-12">
				                            <input 
					                            name="email" 
					                            type="email" 
					                            placeholder="Your Email"
					                            value={formData.email}
					                            onChange = {(e) => onChange(e)}
				                            />
				                        </div>
				                    </div>
				                    <div className="row">
				                        <div className="col-md-6">
				                            <input 
					                            name="password" 
					                            type="password" 
					                            placeholder="Password"
					                            value={formData.password}
					                            onChange = {(e) => onChange(e)}
				                            />
				                        </div>
				                        <div className="col-md-6">
				                            <input 
					                            name="password2" 
					                            type="Password" 
					                            placeholder="Re-Password"
					                            value={formData.password2}
					                            onChange = {(e) => onChange(e)}
				                            />
				                        </div>
				                    </div>
				                    <div className="row">
				                        <div className="col-md-12">
				                          <div className="birthday-select">
				                         	 <input 
					                         	 name="birthDate" 
					                         	 type="date"
					                         	 value={formData.birthDate}
					                         	 onChange = {(e) => onChange(e)}
				                         	 />
				                          </div>
				                      </div>
				                    </div>
				                    <div className="row">
				                      <div className="col-md-12">
				                        <div className="gender-check">
				                          <span>
				                            <input 
					                            type="radio"  
					                            name="gender"
					                            value="Female"
					                            onChange = {(e) => onChange(e)}
				                            />
				                            <label>Female</label>
				                          </span>
				                          <span>
				                            <input
					                             type="radio"  
					                             name="gender"
					                             value="Male"
					                             onChange = {(e) => onChange(e)}
					                         />
				                            <label>Male</label>
				                          </span>
				                          <span>
				                            <input 
					                            type="radio" 
					                            name="gender"
					                            value="Custom"
					                            onChange = {(e) => onChange(e)}
				                            />
				                            <label>Custom</label>
				                          </span>
				                        </div>
				                      </div>
				                    </div>
				                     <input type="submit" value="registration"/>
				                </form>
				            </div>
				        </div>
				      </div>

				    </div>
				  </section>
			</Fragment>
		)
}

Landing.propTypes = {
	register: PropTypes.func.isRequired,
	alertAction: PropTypes.func.isRequired,
	isAuthCheck : PropTypes.bool
}

const mapStateToProps = (state) => ({
	authState:state.authState
})



export default connect(mapStateToProps,{register,alertAction})(Landing);
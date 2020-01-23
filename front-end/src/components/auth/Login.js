import React, {Fragment,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import Alert from '../layout/Alert'
import {login} from '../../redux/actions/authAction'




const Login = (props) => {
	const [formData,setFormData] = useState({
	 	email:'',
	 	password:''
	 })
	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name] : e.target.value
			
		})
	}
	const onSubmit = (e) => {
		e.preventDefault()
		props.login(formData.email,formData.password)

 	} 
 	if (props.authState.isAuthenticated) {
 		return <Redirect to="/profile"/>
 	}	
  return (
    <Fragment>
	  <section className="hero-area">
	    <div className="container">
	      <div className="row">
	        <div className="col-md-12 text-center">
	              <div className="formBox center">
	                <form onSubmit={e => onSubmit(e)}>         
	                    <h1>Login to your Account</h1>
	                    <Alert/>  
	                    <div className="row">
	                        <div className="col-md-12">
	                            <input 
				                	type="email" 
				                	placeholder="Email" 
				                	name="email"
				                	onChange={(e) => onChange(e)}
				                	value={formData.email}
				                	/>
	                        </div>
	                    </div>
	                    <div className="row">
	                        <div className="col-md-12">
	                           <input 
				                	type="password" 
				                	placeholder="Password" 
				                	name="password"
				                	onChange={(e) => onChange(e)}
				                	value={formData.password}
				                	/>
	                        </div>
	                    </div>
	                    <input type="submit" value="login"/>
	                </form>
	                <Link to="/">back</Link>
	            </div>
	        </div>
	      </div>
	    </div>
	  </section>
    </Fragment>
  )
}




Login.propTypes = {
	login: PropTypes.func.isRequired,
	authState : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	authState:state.authState
})

export default connect(mapStateToProps,{login})(Login);
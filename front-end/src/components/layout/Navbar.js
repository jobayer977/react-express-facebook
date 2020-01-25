import React,{Fragment,useState,useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link,Redirect} from 'react-router-dom'
import {logout,login} from '../../redux/actions/authAction'
import Alert from './Alert'

const Navbar = (props) => {
	 const [formData,setFormData] = useState({
	 	email:'',
	 	password:''
	 })
   
 const authNav = (
 	<nav className="main-nav">
	    <nav className="main-nav">
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/people">People</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="#" onClick={props.logout}>Logout</Link></li>
            </ul>
          </nav>
	 </nav>
 	)


 	const guestNav = (
		 <nav className="main-nav">
		  	<form onSubmit={e => onSubmit(e)}>
                <input 
                	type="email" 
                	placeholder="Email t@t.com" 
                	name="email"
                	onChange={(e) => onChange(e)}
                	value={formData.email}
                	/>
                <input 
                	type="password" 
                	placeholder="Password 123456" 
                	name="password"
                	onChange={(e) => onChange(e)}
                	value={formData.password}
                	/>
                <input type="submit" value="Login"/>
            </form>
		
           
          </nav>
		)
 	
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

  return (
    <Fragment>
		 <header>
		   <div className="container">
		     <div className="row">
		       <div className="col-md-7">
		          <div className="main-logo">
		            <Link to="/home">connectTess</Link>
		          </div>
		       </div>
		       <div className="col-md-5 text-right">
		         {
					!props.authState.loading && props.authState.isAuthenticated ? authNav : guestNav
		         }
		       </div>
		     </div>
		   </div>
		 </header>

	</Fragment>
  )
}

Navbar.propTypes = {
  authState: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	authState: state.authState,
  profileState : state.profileState
})

export default connect(mapStateToProps,{login,logout})(Navbar);
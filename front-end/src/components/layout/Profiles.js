import React, {Fragment,useState,useEffect } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {getProfiles,updateConnection} from '../../redux/actions/profileActions'
import {PulseLoaderSpinner} from '../../components/Spinner'


const Profiles = ({authState:{user},updateConnection,getProfiles,profileState:{profiles,loading}}) => {
	useEffect(() => {
		getProfiles()
	},[getProfiles])

  return (loading == true || profiles.length <= 0 ? <PulseLoaderSpinner loading={loading}/> :
    <Fragment>
    	<section className="people-wrapper">
		  <div className="container">
		    <div className="connection">
		    <h1 className="primary-title"><i className="fa fa-users"></i>Connection</h1>
		     <div className="row">
		     {
		     	profiles && profiles.filter(x => x.user && x.user._id !== (user && user._id && user._id)).map((profile,i) => (
		     	
			 		<div className="col-md-6" key={i}>
			          <div className="connect">
			          <Link  to={`/user/${profile.user._id}`}>
			            <div className="connect-info">
			              <img src={profile.profilePicture ? (`/${profile.profilePicture}`) : `https://placehold.it/70x70` } alt=""/>
			              <h4>{profile.user && profile.user.fristname} {" "}
			              {profile.user && profile.user.lastname}  
			              <p>{profile.currentcity && profile.currentcity}</p></h4>
			            </div>
			             </Link>
			            <div className="connect-action">
			              <button onClick={e => updateConnection(profile._id && profile._id)}>Connect</button>
			            </div>
			          </div>
			       </div>
		      ))
		     }
		     </div>
		  </div>
		  </div>
		</section>

    </Fragment>
  )
}




Profiles.propTypes = {
	profileState : PropTypes.object.isRequired,
	updateConnection : PropTypes.func.isRequired,
	authState : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profileState: state.profileState,
	authState:state.authState
})



export default connect(mapStateToProps,{getProfiles,updateConnection})(Profiles);
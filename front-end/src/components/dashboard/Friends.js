import React, {Fragment,useState,useEffect } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {getProfile,updateConnection} from '../../redux/actions/profileActions'
import PrimaryInfo from './PrimaryInfo'
import {PulseLoaderSpinner} from '../Spinner'
import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'

const Friends = ({updateConnection,getProfile,profileState,profileState:{profile,loading}}) => {
	useEffect(() => {
		getProfile()
	},[])
	console.log(profile)
  return (profile === null && loading === true ? <PulseLoaderSpinner loading={loading}/> :
    <Fragment>
	<PrimaryInfo profileData={profile}/>
    	<section className="connection-wrapper">
		  <div className="container">
		    <div className="connection">
		    <h1 className="primary-title"><i className="fa fa-users"></i>Connection</h1>
		     <div className="row">
		       {
		       	profile && profile.connection && profile.connection.following <= 0 ?
		       	(<p className="nothing-found">No Connection Exists</p>):
		       	<Fragment>
		       		{
		       			profile && profile.connection && profile.connection.following.map((x,i) => (
		       				 <div className="col-md-6" key={i}>
					          <div className="connect">
					            <div className="connect-info">
					              <img src={x && x.profilePicture ? x.profilePicture && x.profilePicture : dummyProfilePicture} alt=""/>
					              <h4>{x.userInfo && x.userInfo.fristname && x.userInfo.fristname}
					              {" "}{x.userInfo && x.userInfo.lastname && x.userInfo.lastname}</h4>
					            </div>
					            <div className="connect-action">
					              <button onClick={e => updateConnection(x._id && x._id)}>Connect</button>
					            </div>
					          </div>
					       </div>
		       				))
		       		}
		       	</Fragment>
		       	
		       }
		     </div>
		  </div>
		  </div>
		</section>
    </Fragment>
  )
}




Friends.propTypes = {

}

const mapStateToProps = (state) => ({
	profileState: state.profileState
})



export default connect(mapStateToProps,{getProfile,updateConnection})(Friends);
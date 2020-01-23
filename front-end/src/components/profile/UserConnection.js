import React,{Fragment,useEffect} from 'react';
import{connect} from 'react-redux'
import {getProfileById,updateConnection} from '../../redux/actions/profileActions'
import UserPrimaryInfo from './UserPrimaryInfo'
import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'



const UserConnection = ({updateConnection,getProfileById,match,profileState,profileState:{profile}}) => {
	useEffect(() => {
		getProfileById(match.params.userId)
	},[getProfileById,match.params.userId])
  return (
    <Fragment>
    <UserPrimaryInfo profileData={profileState.profile && profileState.profile}/>
	    <section class="connection-wrapper">
		  <div class="container">
		    <div class="connection">
		    <h1 class="primary-title"><i class="fa fa-users"></i>Connection</h1>
		     <div class="row">
		        {
		       	profile && profile.connection && profile.connection.following <= 0 ?
		       	(<p className="nothing-found">No Connection Exists</p>):
		       	<Fragment>
		       		{
		       			profile && profile.connection && profile.connection.following.map((x,i) => (
		       				 <div className="col-md-6" key={i}>
					          <div className="connect">
					            <div className="connect-info">
					              <img src={x && x.profilePicture ? (`/${x.profilePicture && x.profilePicture}`) : dummyProfilePicture} alt=""/>
					              <h4>{x.userInfo && x.userInfo.fristname && x.userInfo.fristname}
					              {" "}{x.userInfo && x.userInfo.lastname && x.userInfo.lastname}</h4>
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
 const mapStateToProps = state => ({
 	profileState: state.profileState
 })

export default connect(mapStateToProps,{getProfileById,updateConnection})(UserConnection);
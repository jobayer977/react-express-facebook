import React,{Fragment,useEffect} from 'react';
import{connect} from 'react-redux'
import {getProfileById} from '../../redux/actions/profileActions'
import {getPosts} from '../../redux/actions/statusActions'
import UserPrimaryInfo from './UserPrimaryInfo'
import UserIntroItem from './UserIntroItem'
import Post from './Post'
import {ScaleLoaderSpinner} from '../Spinner'

const UserTimeline = ({getProfileById,match,profileState,postState:{posts,loading},getPosts}) => {
	useEffect(() => {
		getProfileById(match.params.userId)
		getPosts()
	},[getProfileById,match.params.userId])
  return (profileState && profileState.profile === null && 
  	profileState && profileState.loading === true ? 
  	<ScaleLoaderSpinner loading={loading}/> : 
    <Fragment>
    	  <UserPrimaryInfo profileData={profileState.profile && profileState.profile}/>
    	  <section class="timeline">
		    <div class="container">
		      <div class="row">
		        <div className="col-md-4">
		       		 <UserIntroItem profileState={profileState}/>
		        </div>
		        <div class="col-md-8">
		    		 {
		                  posts === null && loading === true ? <ScaleLoaderSpinner loading={loading}/> : 
		                  (<Fragment>
		                      {posts && posts.getAllStatus && posts.getAllStatus.filter(post => post.user == match.params.userId).map((post,i) =>  <Post key={i} post={post} profile={profileState}/>)}
		                  </Fragment>)
		               }
		        </div>
		      </div>
		    </div>
		  </section>
    </Fragment>
  )
}
 const mapStateToProps = state => ({
 	profileState: state.profileState,
 	postState: state.postState,
 })

export default connect(mapStateToProps,{getProfileById,getPosts})(UserTimeline);
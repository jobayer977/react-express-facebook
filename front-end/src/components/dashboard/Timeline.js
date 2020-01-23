import React, {Fragment,useState,useEffect } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {getPosts,addPost} from '../../redux/actions/statusActions'
import Post from '../posts/post'
import Alert from '../../components/layout/Alert'
import {ScaleLoaderSpinner} from '../Spinner'
import PrimaryInfo from './PrimaryInfo'
import {getProfile} from '../../redux/actions/profileActions'

const Timeline = ({getProfile,addPost,getPosts,authState,profileState,postState:{posts,loading}}) => {
  useEffect(() => {
    getProfile()
    getPosts()
  },[])
 const [textData,setTextData] = useState({
   text:''
 })
 const onChangeHandler = (e) => {
  setTextData({
    [e.target.name]:e.target.value
  })
 }
 const onSubmit = (e) => {
   e.preventDefault()
   addPost(textData)
   setTextData({
     text:''
   })
 }
  return (
    <Fragment>
       <PrimaryInfo profileData={profileState.profile}/>
    	 <section className="timeline">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="intro-info">
                <h1 className="secoundary-title">Intro</h1>
                {
                  profileState &&
                  profileState.profile &&
                  profileState.profile.work &&
                  profileState.profile.work.map(x => (
                    <p><i className="fa fa-briefcase"></i>{x.position ? (x.position +" at") : '' }  {x.workPlaceName}</p>
                    ))
                }

                {
                  profileState &&
                  profileState.profile &&
                  profileState.profile.homeTown ?
                  (<p><i className="fa fa-home"></i>Lives in {" "}
                    {profileState.profile.homeTown && profileState.profile.homeTown}</p>):""
                  
                }
               
                <p><i className="fa fa-wifi"></i>Following to 360 people</p>
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-status">
                <div className="post-status">
                 <Alert/>
                  <form onSubmit={e => onSubmit(e)}>
                    <textarea 
                        className="form-control" 
                        name="text" 
                        placeholder="What's on your mind ?" 
                        cols="30" 
                        rows="10"
                        value={textData.text}
                        onChange={e => onChangeHandler(e)}
                        >
                     </textarea>
                    <input type="submit" value="Post"/>
                  </form>
                </div>
               {
                  posts === null && loading === true ? <ScaleLoaderSpinner loading={loading}/> : 
                  (<Fragment>
                      {posts && posts.getAllStatus && posts.getAllStatus.filter(post => post.user == (authState.user && authState.user._id)).map((post,i) =>  <Post key={i} post={post} profile={profileState}/>)}
                  </Fragment>)
               }
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}




Timeline.propTypes = {
  authState : PropTypes.object.isRequired,
  getPosts : PropTypes.func.isRequired,
  postState : PropTypes.object.isRequired,
  addPost : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	postState: state.postState,
  authState: state.authState,
  profileState: state.profileState
})



export default connect(mapStateToProps,{getPosts,getProfile,addPost})(Timeline);

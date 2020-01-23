import React, {Fragment,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'
import {deletePost,updateLike} from '../../redux/actions/statusActions'



const Post = ({post,authState,deletePost,updateLike}) => {
  return (
    <Fragment>
    	<div className="single-status"> 
          <div className="status-profile">
            <span>
              <img src={post.profile && post.profile.profilePicture ?
                (`/${ post.profile.profilePicture && post.profile.profilePicture}`) :
                 dummyProfilePicture} alt=""/>
              <h6>

                <Link to={`/user/${post.user && post.user}`}> {post.name && post.name}  </Link>
               <Moment fromNow>{post.date}</Moment>
              </h6>
            </span>
            {
              post.user === (authState.user && authState.user._id) ? 
              (<Fragment>
                <span>
                  <button onClick={e => deletePost(post._id)}><i className="fa fa-trash-o"></i></button>
                </span>
              </Fragment>):""
            }
          </div>
          <Link to={`/post/${post._id}`}><p>{post.text && post.text}</p></Link>
          <div className="status-action">
            <span><button onClick={e => updateLike(post._id)}><i className="fa fa-thumbs-o-up"></i> Like {post && post.likes && post.likes.length}</button></span>
            <span><Link to={`/post/${post._id}`}><button><i className="fa fa-comment-o"></i> Comment</button></Link></span>
          </div>
        </div>
    </Fragment>
  )
}


Post.propTypes = {
	post: PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  updateLike : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authState:state.authState
	
})


export default connect(mapStateToProps,{deletePost,updateLike})(Post);



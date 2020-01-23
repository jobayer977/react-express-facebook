import React, {Fragment,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'
import {updateLike} from '../../redux/actions/statusActions'



const Post = ({post,profile,updateLike}) => {
  return (
    <Fragment>
    	<div className="single-status"> 
          <div className="status-profile">
            <span>
              <img src={profile.profilePicture ? profile.profilePicture : dummyProfilePicture} alt=""/>
              <h6>
              <Link to={`/user/${profile.profile && profile.profile.user && profile.profile.user._id}`}> {post.name && post.name}  </Link>
             <Moment fromNow>{post.date}</Moment>
            </h6>
            </span>
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
  profile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	
})



export default connect(mapStateToProps,{updateLike})(Post);
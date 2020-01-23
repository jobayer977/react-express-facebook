import React,{Fragment,useEffect} from 'react';
import {connect} from 'react-redux'
import {ScaleLoaderSpinner} from '../Spinner'
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import {getPost} from '../../redux/actions/statusActions'
import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'
import {deletePost,updateLike,deleteComment} from '../../redux/actions/statusActions'
import CommentForm from '../comment/CommentForm'
import CommentItem from '../comment/CommentItem'



const PostDetail = ({getPost,postState:{post,loading},match,deletePost,updateLike,deleteComment,authState:{user}}) => {
    useEffect(() => {
      getPost(match.params.statusId)
    },[match.params.statusId])
  return (post === null && loading === true ? <ScaleLoaderSpinner loading={loading}/> : 
    <Fragment>
    	<div className="container">
        <div className="row">
          <div className="col-md-12">
               <div class="single-status mt-5">
                <div class="status-profile">
                  <span>
                    <img src={post && post.profile && post.profile.profilePicture ?
                (`/${ post.profile.profilePicture && post.profile.profilePicture}`) :
                 dummyProfilePicture} alt=""/>
                    <h6><Link to={`/user/${post && post.user && post.user}`}>{post && post.name && post.name} </Link>
                    <Moment fromNow>{post && post.date && post.date}</Moment></h6>
                  </span>
                  <span>
                    {
                      (user && user._id == post && post.user) ? 
                      (<Link to="/home"><button onClick={e => deletePost(post._id)}><i class="fa fa-trash-o"></i></button></Link>):""
                    }
                  </span>
                </div>
                <p>{post && post.text && post.text}</p>
                <div class="status-action">
                  <span><button onClick={e => updateLike(post._id)}><i class="fa fa-thumbs-o-up"></i> Like {post && post.likes && post.likes.length}</button></span>
                  <span><button><i class="fa fa-comment-o"></i> Comment</button></span>
                </div>
              </div> 
              <div className="comment-wrapper">
                <CommentForm postId={post && post._id && post._id}/>
                {
                  post && post.comments && post.comments.map(comment => <CommentItem 
                    deleteComment={deleteComment} 
                    userId={user && user._id} 
                    postId={post && post._id && post._id} 
                    comment={comment}/> )
                }
              </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
   postState:state.postState,
   authState:state.authState
})

export default connect(mapStateToProps,{getPost,deletePost,updateLike,deleteComment})(PostDetail);




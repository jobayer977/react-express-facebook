import React,{Fragment} from 'react';
import {Link,Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'
import {deleteComment} from '../../redux/actions/statusActions'

const CommentItem = ({comment,deleteComment,postId,userId}) => {
  return (
    <Fragment>
	 <div class="single-status">
      <div class="status-profile">
        <span>
          <img src={comment && comment.avatar ? (`/${comment.avatar && comment.avatar}`) : dummyProfilePicture} alt=""/>
         <h6>
         <Link to={`/user/${comment && comment.user && comment.user}`}>
        	{comment && comment.name && comment.name}
         </Link>
         	<Moment fromNow>{comment && comment.date && comment.date}</Moment>
         </h6>
        </span>
        <span>
       	 {
       	 	comment && comment.user == userId ? 
       	 	(<button onClick={e => deleteComment(postId,comment._id)}><i class="fa fa-trash-o"></i></button>):""
       	 }
        </span>
      </div>
      <p>{comment && comment.text && comment.text}</p>
    </div>
    </Fragment>
  )
}

export default CommentItem;
import React, {Fragment,useEffect,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {getPosts,addPost} from '../../redux/actions/statusActions'
import Alert from './Alert'
import Post from '../posts/post'
import {ScaleLoaderSpinner} from '../Spinner'



const NewsFeed = ({getPosts,addPost,postState:{posts,loading}}) => {
	useEffect(() => {
		getPosts()
	},[getPosts])

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
  return ( posts === null && loading === true ? <ScaleLoaderSpinner loading={loading}/> : 
    <Fragment>
    	 <div className="container">
    	 	<div className="row">
    	 		<div className="col-md-12 py-2">
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
    	 		</div>
    	 	</div>
    	 	<div className="row">
    	 		<div className="col-md-12">
    	 		 {
    	 		 	posts && posts.getAllStatus && posts.getAllStatus.map((post,i) => <Post key={i} post={post}/> )
    	 		 }
    	 		</div>
    	 	</div>
    	 </div>
    </Fragment>
  )
}




NewsFeed.propTypes = {
	getPosts: PropTypes.func.isRequired,
	postState: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	postState: state.postState,
})

export default connect(mapStateToProps,{getPosts,addPost})(NewsFeed);
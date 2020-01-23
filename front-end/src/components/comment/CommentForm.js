import React,{Fragment,useState} from 'react';
import {connect} from 'react-redux'
import {addComment} from '../../redux/actions/statusActions'
import Alert from '../../components/layout/Alert'

const CommentForm = ({postId,addComment}) => {
	const [text,setText] = useState('')
  return (
    <Fragment>
    	 <div className="post-status">
         <Alert/>
          <form onSubmit={e => {
		    	e.preventDefault();
		    	addComment(postId,{text});
		    	setText('')
		    }}>
            <textarea 
                className="form-control" 
                name="text" 
                placeholder="Your Comment" 
                cols="30" 
                rows="10"
                value={text}
                onChange={e => setText(e.target.value)}
                >
             </textarea>
            <input type="submit" value="COMMENT"/>
          </form>
        </div>
    </Fragment>
  )
}

export default connect(null,{addComment})(CommentForm);
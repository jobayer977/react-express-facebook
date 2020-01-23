import React, {Fragment,useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {updateProfile} from '../../redux/actions/profileActions'



const UploadCoverPicture = ({updateProfile,history}) => {
	const [formData,setFormData] = useState({
	  	coverPicture:null

	  })

   const onFileChange = (e) => {
	     setFormData({
	        ...formData,
	        coverPicture:e.target.files[0]
	   
	    })    
	 }
	 const onSubmit = (e) => {
	   e.preventDefault()
	      const Data = new FormData()
	        Data.append('coverPicture', formData.coverPicture)
	        updateProfile(Data,history)
	  }

  return (
    <Fragment>
    	 <section class="hero-area">
	    <div class="container">
	      <div class="row">
	        <div class="col-md-12 text-center">
	              <div class="formBox center">
	                <form onSubmit={e => onSubmit(e)} encType="multipart/form-data">
				      	<input type="file" onChange={e => onFileChange(e)}/>
				      	<button type="submit">SUBMIT</button>
			      </form>
	            </div>
	        </div>
	      </div>
	    </div>
	  </section>
    </Fragment>
  )
}




UploadCoverPicture.propTypes = {

}

const mapStateToProps = (state) => ({
	
})



export default connect(mapStateToProps,{updateProfile})(UploadCoverPicture);
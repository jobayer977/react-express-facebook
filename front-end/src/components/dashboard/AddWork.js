import React, {Fragment,useState,useEffect } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import {addWork} from '../../redux/actions/profileActions'
import Alert from '../layout/Alert'


const AddWork = ({addWork,history}) => {
	const [formData,setFormData] = useState({
		workPlaceName:'',
		position:'',
		location:'',
		description:'',
		from:'',
		to:'',
		current:''
	})
	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
 	}
 	// SUBMIT
 	const onSubmit = async (e) => {
 		e.preventDefault()
 		addWork(formData,history)
 	}
 	  const [toDateDisabled,toggleDisabled] = useState(false)
	const {workPlaceName,position,location,description,from,to,current} = formData;
  return (
    <Fragment>
    	<section className="hero-area">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-12 text-center">
		              <div className="formBox center">
		                <form onSubmit={e => onSubmit(e)}>
		                    <h1>Add Work</h1>
		                    <Alert/>
		                    <div className="row">
		                        <div className="col-md-12">
		                            <input 
			                            name="workPlaceName" 
			                            type="text" 
			                            placeholder="Where have you workded ?"
			                            value={workPlaceName}
					                    onChange = {(e) => onChange(e)}/>
		                        </div>
		                    </div> 
		                    <div className="row">
		                        <div className="col-md-12">
		                            <input 
		                            	name="position" 
		                            	type="text" 
		                            	placeholder="What is your job title ?"
			                            value={position}
					                    onChange = {(e) => onChange(e)}/>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-md-12">
		                            <input 
		                            	name="location" 
		                            	type="text" 
		                            	placeholder="City/Town"
			                            value={location}
					                    onChange = {(e) => onChange(e)}/>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-md-12">
		                            <input 
		                            	name="description" 
		                            	type="text" 
		                            	placeholder="Description"
			                            value={description}
					                    onChange = {(e) => onChange(e)}/>
		                        </div>
		                    </div> 
		                      <div className="row">
		                          <div className="col-md-12">
		                            <div className="form-date">
		                              <span>From  
			                              <input 
			                             	 name="from" 
			                             	 type="date"
				                             value={from}
						                     onChange = {(e) => onChange(e)}/> 
		                              </span>
		                              <span>Now
		                              	<input 
		                              		name="current" 
		                              		type="checkbox"
				                            value={current}
						                    onChange={(e) => {
								          	setFormData({...formData,current:!current})
								          	toggleDisabled(!toDateDisabled)
								          }}/> 
						              </span>
		                              <span>To  
		                              	<input 
		                              		name="to" 
		                              		type="date"
				                            value={to}
						                    onChange={(e) => onChange(e)}
          									disabled={toDateDisabled ? 'disabled' : ''}/> 
		                              	</span>     
		                            </div>
		                          </div>
		                      </div>
		                    <input type="submit" value="Submit"/>
		                </form>
		            </div>
		        </div>
		      </div>
		    </div>
		  </section>
    </Fragment>
  )
}


AddWork.propTypes = {
	addWork : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	
})



export default connect(mapStateToProps,{addWork})(AddWork)
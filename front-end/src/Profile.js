// import React, {Fragment,useEffect } from 'react';
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {getProfile} from '../../redux/actions/profileActions'
// import {PulseLoaderSpinner} from '../Spinner'
// import dummyCoverPicture from '../../img/dummyCoverPicture.jpg'
// import dummyProfilePicture from '../../img/dummyProfilePicture.jpg'
// import {Link,Redirect } from "react-router-dom";
// import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
// import Timeline from './Timeline'
// import About from './About'
// import Friends from './Friends'
// import PrimaryInfo from './PrimaryInfo'
// import PrivateRoute from '../auth/PrivateRoute'
// import AddBasicInfo from './AddBasicInfo'
// import PostDetail from '../posts/PostDetail'


// const Profile = (props) => {
//   useEffect(() => {
//     props.getProfile()
//   },[])

//   if (!props.auth.isAuthenticated) {
// 		return <Redirect to="/"/>
//   }
//   return (
//     <Fragment>
//     	{props.profileState.loading &&
//         props.profileState.profile === null ?
//         <PulseLoaderSpinner loading={props.profileState.loading}/>: 
//         <Fragment>
//         <PrimaryInfo profileData={props.profileState.profile}/>
//          <Router>
//          <Fragment>
//              <Switch>
//                   <Route exact path="/profile" component={Timeline}/>
//                   <PrivateRoute exact path="/about" component={About}/>
//                   <Route exact path="/friends" component={Friends}/>
//               </Switch>
//           </Fragment>
//         </Router>
//     </Fragment>
//       }
//     </Fragment>
//   )
// }




// Profile.propTypes = {
// 	auth : PropTypes.object.isRequired,
//   profileState: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
// 	auth:state.authState,
//   profileState:state.profileState,
//   getProfile: PropTypes.func.isRequired
// })

// export default connect(mapStateToProps,{getProfile})(Profile);



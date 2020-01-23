import React,{Fragment,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

// LAYOUT
import Login from './components/auth/Login'
import PrivateRoute from './components/auth/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import Profiles from './components/layout/Profiles'
import NewsFeed from './components/layout/NewsFeed'

// DASHBOARD
import About from './components/dashboard/About'
import Timeline from './components/dashboard/Timeline'
import Friends from './components/dashboard/Friends'
import AddBasicInfo from './components/dashboard/AddBasicInfo'
import AddSocial from './components/dashboard/AddSocial'
import AddContact from './components/dashboard/AddContact'
import AddCityTown from './components/dashboard/AddCityTown'
import AddWork from './components/dashboard/AddWork'
import AddEdu from './components/dashboard/AddEdu'
import UploadProfilePicture from './components/dashboard/UploadProfilePicture'
import UploadCoverPicture from './components/dashboard/UploadCoverPicture'

// PUBLIC PROFILE
import PostDetail from './components/posts/PostDetail'
import UserTimeline from './components/profile/UserTimeline'
import UserAbout from './components/profile/UserAbout'
import UserConnection from './components/profile/UserConnection'

// REDUX
import {Provider} from 'react-redux'
import store from './redux/store'
import {loadUser} from './redux/actions/authAction'
import setAuthToken from './util/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  },[])
  return (
   <Provider store={store}>
     <Router>
        <Fragment>
            <Navbar/>
            <Route path="/" exact component={Landing}/>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/home" component={NewsFeed}/>
                <PrivateRoute exact path="/people" component={Profiles}/>
                <PrivateRoute exact path="/About" component={About}/>
                <PrivateRoute exact path="/update-profile-picture" component={UploadProfilePicture}/>
                <PrivateRoute exact path="/update-cover-picture" component={UploadCoverPicture}/>
                <PrivateRoute exact path="/connection" component={Friends}/>
                <PrivateRoute exact path="/socialLinks" component={AddSocial}/>
                <PrivateRoute exact path="/contactinfo" component={AddContact}/>

                <PrivateRoute exact path="/profile" component={Timeline}/>
                <PrivateRoute exact path="/add-city" component={AddCityTown}/>
                <PrivateRoute exact path="/add-work" component={AddWork}/>
                <PrivateRoute exact path="/add-edu" component={AddEdu}/>
                <PrivateRoute exact path="/add-basic-info" component={AddBasicInfo}/>

                <PrivateRoute exact path="/post/:statusId" component={PostDetail}/>
                <PrivateRoute exact path="/user/:userId" component={UserTimeline}/>
                <PrivateRoute exact path="/about/:userId" component={UserAbout}/>
                <PrivateRoute exact path="/connection/:userId" component={UserConnection}/>

            </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;

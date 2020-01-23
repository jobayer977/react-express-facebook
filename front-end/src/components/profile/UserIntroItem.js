import React,{Fragment} from 'react';

const UserIntroItem = ({profileState}) => {
  return (
    <Fragment>
          <div className="intro-info">
            <h1 className="secoundary-title">Intro</h1>
            {
              profileState &&
              profileState.profile &&
              profileState.profile.work &&
              profileState.profile.work.map(x => (
                <p><i className="fa fa-briefcase"></i>{x.position ? (x.position +" at") : '' }  {x.workPlaceName}</p>
                ))
            }

            {
              profileState &&
              profileState.profile &&
              profileState.profile.homeTown ?
              (<p><i className="fa fa-home"></i>Lives in {" "}
                {profileState.profile.homeTown && profileState.profile.homeTown}</p>):""
              
            }
           
            <p><i className="fa fa-wifi"></i>Following to 360 people</p>
          </div>
    </Fragment>
  )
}

export default UserIntroItem;
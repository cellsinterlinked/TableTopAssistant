import React from 'react';
import Cat from '../../Resources/Cat_on_laptop_-_Just_Browsing.jpg';
import './WorldMap.css';

const WorldMap = (props) => {
  return (
    <div className="worldMapContainer">
      {props.map ? <div className="mapInnerBox"><img src={props.map.map} alt="nope!" /></div> : 
      <div className="noMap">
        <h1>OOPS! Your DM Hasn't Provided Any Maps!</h1>
        <div className="catContainer">
          <img src={Cat} alt="" />
        </div>
      </div>}

      
      {/* window.localStorage.getItem('map')  */}
      
    </div>
  )
}

export default WorldMap;
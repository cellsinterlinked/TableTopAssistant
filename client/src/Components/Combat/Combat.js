import React, {useEffect, useState} from 'react';
import { GiConsoleController } from 'react-icons/gi';
import './Combat.css';

const Combat = ({setUserYPosition, setUserXPosition, userXPosition, userYPosition}) => {



  useEffect(() => {
    let theThing = document.querySelector("#thing");
    let container = document.querySelector("#contentContainer")
  
    container.addEventListener("click", function(event) {
      var xPosition = event.clientX - container.getBoundingClientRect().left - (theThing.clientWidth / 2);
      var yPosition = event.clientY - container.getBoundingClientRect().top - (theThing.clientHeight / 2);
      setUserXPosition(xPosition);
      setUserYPosition(yPosition);
      // in case of a wide border, the boarder-width needs to be considered in the formula above
      theThing.style.left = xPosition + "px";
      theThing.style.top = yPosition + "px";
      
      }
    );


  }, [])
  
//   container.addEventListener("click", getClickPosition, false)

// const getClickPosition = (e) => {
//   let parentPosition = getPosition(e.currentTarget);
//   let xPosition = e.clientX - parentPosition.x - (theThing.clientWidth / 2);
//   let yPosition = e.clientY - parentPosition.y - (theThing.clientHeight / 2);
  
//   theThing.style.left = xPosition + "px";
//   theThing.style.top = yPosition + "px";
// }

// const getPosition = (el) => {
//   let xPos = 0;
//   let yPos = 0;
  
//   while (el) {
//     if (el.tagName === "BODY") {
//       var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
//       var yScroll = el.scrollTop || document.documentElement.scrollTop;
//       xPos += (el.offsetLeft - xScroll + el.clientLeft);
//       yPos += (el.offsetTop - yScroll + el.clientTop);
//     } else {
//       xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//       yPos += (el.offsetTop - el.scrollTop + el.clientTop);
//     }
    
//     el = el.offsetParent;
//   }
//   return {
//     x: xPos,
//     y: yPos
//   }
  




  return (
    <div className="combat-outer-border">
      <div  id="contentContainer">
        <img id="thing" alt="" src="//www.kirupa.com/images/smiley_red.png"></img>
        <img className="combat-image" alt="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F1b%2F14%2Ff1%2F1b14f1f8ae95c8d60520c32e454e9d84.jpg&f=1&nofb=1"></img>
      </div>
    </div>
  )
}

export default Combat
import React, {useEffect, useState, useRef} from 'react';
import { GiConsoleController } from 'react-icons/gi';
import './Combat.css';

const Combat = ({setUserYPosition, setUserXPosition, userXPosition, userYPosition, sendPlayerPosition, users, partyPosition, name, array}) => {
  

  

  const xValue = useRef(localStorage.getItem('xValue') ? JSON.parse(localStorage.getItem('xValue')) : 50)
  const yValue = useRef(localStorage.getItem('yValue') ? JSON.parse(localStorage.getItem('yValue')) : 50)

  // useEffect(() => {
  //   let theThing = document.querySelector("#thing");
  //   theThing.style.left = xValue.current + "px";
  //   theThing.style.top = yValue.current + "px";
  // })

  useEffect(() => {
    let theThing = document.querySelector("#thing");
    let container = document.querySelector("#contentContainer")
  
    container.addEventListener("click", function(event) {
      xValue.current = event.clientX - container.getBoundingClientRect().left - (theThing.clientWidth / 2);
      yValue.current = event.clientY - container.getBoundingClientRect().top - (theThing.clientHeight / 2);
      window.localStorage.setItem("xValue", JSON.stringify(xValue.current))
      window.localStorage.setItem('yValue', JSON.stringify(yValue.current))
      // theThing.style.left = xValue.current + "px";
      // theThing.style.top = yValue.current + "px";
      setUserXPosition(xValue.current)
      setUserYPosition(yValue.current)
      console.log(xValue.current)
      console.log(yValue.current)
      
      

      }
    );


  }, [users])

  const endTurn = () => {
    let position = {x: xValue.current, y: yValue.current}
    sendPlayerPosition(position)
    console.log(partyPosition)
  }
  
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
        <button  onClick={endTurn}id="end-turn-button">END MOVEMENT TURN</button>
      
      <div  id="contentContainer">
        <img id="thing" alt="" style={{left: `${xValue.current}px`, top: `${yValue.current}px`}}src="//www.kirupa.com/images/smiley_red.png"></img>
        {/* this won't work if there isn't a location for each */}
        {/* {Object.keys(partyPosition).map((user, index) =>  <img 
          key={user} 
          id={user} 
          style={{left: `${partyPosition[user].position.x - ((index + 1) * 28)}px`, 
                  top: `${partyPosition[user].position.y}px`, 
                  position: "relative", 
                  zIndex: `${array[index]}`, 
                  height: "28px",
                  width: "28px", 
                  transition: "left 0.5s ease-in, top 0.5s ease-in"}} 
          alt="" 
          src="//www.kirupa.com/images/smiley_red.png"></img> )} */}
          
          {Object.keys(partyPosition).map((user, index) =>  <div 
          key={user} 
          id={user} 
          style={{left: `${partyPosition[user].position.x - ((index + 1) * 28)}px`, 
                  top: `${partyPosition[user].position.y}px`, 
                  position: "relative", 
                  zIndex: `${array[index]}`, 
                  height: "28px",
                  width: "28px", 
                  transition: "left 0.5s ease-in, top 0.5s ease-in"}} 
           
          ><img 
          alt="" 
          src={partyPosition[user].icon}
          className="youSuck"
          >
          </img>
          </div> )}
          

          

          
        <img 
          className="combat-image" 
          alt="" 
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fksr-ugc.imgix.net%2Fassets%2F024%2F571%2F640%2Fd1fbc0f59a39b0171b84a00ad5a2e8df_original.jpg%3Fixlib%3Drb-2.1.0%26w%3D680%26fit%3Dmax%26v%3D1553776162%26auto%3Dformat%26gif-q%3D50%26q%3D92%26s%3D494a229e0ef305174afa42e843a5fda2&f=1&nofb=1"
          >
          </img>
            
      </div>
    </div>
  )
}

export default Combat

// style={{left: `${partyPosition[user.name].position.x}px`, right: `${partyPosition[user.name].position.y}px`}}

// style={{left: `${partyPosition[user.name].position.x - ((users.length) * 20 )}px`, top: `${partyPosition[user.name].position.y}px`, position: "relative", zIndex: "200", height: "20px", width: "20px;", transition: "left 0.5s ease-in, top 0.5s ease-in"}}

// {/* <div  id="contentContainer">
//         <div id="thing" style={{left: `${xValue.current}px`, top: `${yValue.current}px`, overflow: "hidden"}}>
//         <img alt="" style={{height: "100", width: "100%", overflow: 'hidden'}}src={stats.portrait}></img>
//         </div>

          
// this is how portrait was being added, but it screwed up all of the location math i had in place

//         {/* this won't work if there isn't a location for each */}
//         {Object.keys(partyPosition).map((user, index) =>  
//         <div
//         key={user} 
//           id={user} 
//           style={{left: `${partyPosition[user].position.x - ((index + 1) * 28)}px`, 
//                   top: `${partyPosition[user].position.y}px`, 
//                   position: "relative", 
//                   zIndex: `${array[index]}`, 
//                   height: "28px", 
//                   width: "28px", 
//                   transition: "left 0.5s ease-in, top 0.5s ease-in",
//                   overflow: "hidden"
//                 }} 
//         ><img 
//           alt=""
//           style={{height: "100%", width: "100%", overflow: 'hidden'}}
//           src={partyPosition[user].icon}></img></div> )} */}

//add comment
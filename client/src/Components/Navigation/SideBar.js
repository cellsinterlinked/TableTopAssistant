import React, { useState } from 'react';
import './SideBar.css';
import {AiOutlineMessage} from 'react-icons/ai';
import {BsMap} from 'react-icons/bs';
import {GiAxeSword} from 'react-icons/gi';
import {BsFillPersonLinesFill} from 'react-icons/bs';
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi';
import {RiImageEditFill} from 'react-icons/ri';
import {GiIciclesAura} from 'react-icons/gi';
import Backdrop from './BackDrop';
import SideDrawer from './SideDrawer';
import Messaging from '../Messaging/Messaging'
import MapDrawer from './MapDrawer';
import WorldMap from '../Maps/WorldMap';
import PostDrawer from './PostDrawer';
import Post from '../Post/Post';
import NPCDisplay from '../NPC/NPCDisplay';
import Dice from '../Dice/Dice';
import InputBar from '../InputBar';
import Combat from '../Combat/Combat';

const SideBar = (
  {sendMapData, 
    map, 
    npcArray, 
    sendNPCData, 
    deleteNPCData, 
    sendNPCNote, 
    sendPlayerRoll, 
    setStats, 
    sendPlayerData, 
    name, 
    stats, 
    setMessage, 
    sendPlayerMessage, 
    message, 
    users, 
    setRecipients, 
    recipients, 
    messages, 
    unreadMessages, 
    setUnreadMessages,
    setUserXPosition,
    setUserYPosition,
    userXPosition,
    userYPosition,
    sendPlayerPosition,
    partyPosition
  }
    ) => {

  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [mapDrawerOpen, setMapDrawerOpen] = useState(false);
  const [postDrawerOpen, setPostDrawerOpen] = useState(false);
  const [npcDrawerOpen, setNPCDrawerOpen] = useState(false);
  const [diceDrawerOpen, setDiceDrawerOpen] = useState(false);
  const [characterDrawerOpen, setCharacterDrawerOpen] = useState(false);
  const [combatDrawerOpen, setCombatDrawerOpen] = useState(false)

  const openChatDrawerHandler = () => {
    chatDrawerOpen ? setChatDrawerOpen(false) : setChatDrawerOpen(true)
  }
  const openMapDrawerHandler = () => {
    mapDrawerOpen ? setMapDrawerOpen(false) : setMapDrawerOpen(true)
  }
  const postDrawerHandler = () => {
    postDrawerOpen ? setPostDrawerOpen(false) : setPostDrawerOpen(true)
  }
  const openNPCDrawerHandler = () => {
    npcDrawerOpen ? setNPCDrawerOpen(false) : setNPCDrawerOpen(true)
  }
  const openDiceDrawerHandler = () => {
    diceDrawerOpen ? setDiceDrawerOpen(false) : setDiceDrawerOpen(true)
  }
  const openCharacterDrawerHandler = () => {
    characterDrawerOpen ? setCharacterDrawerOpen(false) : setCharacterDrawerOpen(true);
  }
  const openCombatDrawerHandler = () => {
    combatDrawerOpen ? setCombatDrawerOpen(false) : setCombatDrawerOpen(true);
  }


  const array = [301, 302, 303, 304, 305, 306]

 


 const closeAllHandler = () => {
   setMapDrawerOpen(false)
   setChatDrawerOpen(false)
   setPostDrawerOpen(false)
   setDiceDrawerOpen(false)
   setNPCDrawerOpen(false)
   setCharacterDrawerOpen(false)
   setCombatDrawerOpen(false)
 }

  return (
    <>
    {/* set background to close all open windows */}
    {(chatDrawerOpen || mapDrawerOpen || postDrawerOpen || diceDrawerOpen || npcDrawerOpen || characterDrawerOpen) && <Backdrop onClick={closeAllHandler} />}
    <SideDrawer show={chatDrawerOpen}>
      <Messaging 
        setMessage={setMessage} 
        sendPlayerMessage={sendPlayerMessage} 
        message={message} 
        users={users} 
        setRecipients={setRecipients} 
        recipients={recipients} 
        messages={messages} 
        name={name}
        unreadMessages={unreadMessages}
        setUnreadMessages={setUnreadMessages}
        />

    </SideDrawer>
    
    <MapDrawer show={mapDrawerOpen}>
      <WorldMap map={map} />
    </MapDrawer>

    <PostDrawer show={postDrawerOpen}>
      <Post sendMapData={sendMapData} sendNPCData={sendNPCData} />
    </PostDrawer>
    
    <MapDrawer show={npcDrawerOpen}>
      <NPCDisplay npcArray={npcArray} deleteNPCData={deleteNPCData} sendNPCNote={sendNPCNote}/>
    </MapDrawer>

    <MapDrawer show={combatDrawerOpen}>
      <Combat 
      setUserYPosition={setUserYPosition} 
      setUserXPosition={setUserXPosition} 
      userXPosition={userXPosition} 
      userYPosition={userYPosition} 
      sendPlayerPosition={sendPlayerPosition}
      users={users}
      partyPosition={partyPosition}
      array = {array}
      name = {name}
      stats = {stats}
      />
    
    </MapDrawer>

    <PostDrawer show={diceDrawerOpen}>
      <Dice 
      sendPlayerRoll={sendPlayerRoll} 
      setStats={setStats} 
      sendPlayerData={sendPlayerData}/>
    </PostDrawer>

    <PostDrawer show={characterDrawerOpen}>

    <InputBar 
    name={name} 
    sendPlayerData={sendPlayerData}
    sendPlayerRoll={sendPlayerRoll}
    setStats={setStats}
    stats={stats}/>
    </PostDrawer>





    <div className="sideBar-container">
      <div className="sideBar-button" onClick={openChatDrawerHandler}>
        {unreadMessages >= 1 && <div className="notification-bubble">{unreadMessages}</div>}
        <AiOutlineMessage className={chatDrawerOpen ? "side-icon purple" : "side-icon"}/>
        <div className="nav-explanation">MESSAGING</div>
      </div>

      <div className="sideBar-button" onClick={openMapDrawerHandler}>
        <BsMap className={mapDrawerOpen ? "side-icon purple" : "side-icon"}/>
        <div className="nav-explanation">MAPS</div>
      </div>

      <div className="sideBar-button" onClick={openCombatDrawerHandler}>
        <GiAxeSword className="side-icon"/>
        <div className="nav-explanation">COMBAT</div>
      </div>

      <div className="sideBar-button" onClick={openNPCDrawerHandler}>
        <BsFillPersonLinesFill className={npcDrawerOpen ? "side-icon purple": "side-icon"}/>
        <div className="nav-explanation">NPCs</div>
      </div>

      <div className="sideBar-button" onClick={openDiceDrawerHandler}>
        <GiDiceTwentyFacesTwenty className="side-icon"/>
        <div className="nav-explanation">DICE</div>
      </div>

      <div className="sideBar-button" onClick={postDrawerHandler}>
        <RiImageEditFill className={postDrawerOpen ? "side-icon purple" : "side-icon"}/>
        <div className="nav-explanation">POST INFO</div>
      </div>

      <div className="sideBar-button" onClick={openCharacterDrawerHandler}>
        <GiIciclesAura className={characterDrawerOpen ? "side-icon purple" : "side-icon"}/>
        <div className="nav-explanation">CHARACTER</div>
      </div>
      

    </div>
    </>
  )
}

export default SideBar;
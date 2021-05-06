import React, { useState } from 'react';
import './SideBar.css';
import {AiOutlineMessage} from 'react-icons/ai';
import {BsMap} from 'react-icons/bs';
import {GiAxeSword} from 'react-icons/gi';
import {BsFillPersonLinesFill} from 'react-icons/bs';
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi';
import {RiImageEditFill} from 'react-icons/ri';
import {GiIciclesAura} from 'react-icons/gi';
import {MdLiveHelp} from 'react-icons/md'
import {AiOutlineLogout} from 'react-icons/ai'
import Backdrop from './BackDrop';
import SideDrawer from './SideDrawer';
import Messaging from '../Messaging/Messaging'
import MapDrawer from './MapDrawer';
import WorldMap from '../Maps/WorldMap';
import PostDrawer from './PostDrawer';
import DiceDrawer from './DiceDrawer';
import Post from '../Post/Post';
import NPCDisplay from '../NPC/NPCDisplay';
import Dice from '../Dice/Dice';
import InputBar from '../InputBar';
import Combat from '../Combat/Combat';
import PlayerCombat from '../Combat/PlayerCombat';

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
    partyPosition,
    notePost,
    setNotePost,
    npcNotes,
    showSomething,
    showModal,
    role,
    sendMonsterInfo,
    monsterData,
    clearMonsterInfo,
    showLogoutWarning,
    exitModal,
    clearPlayerPosition,
    sendCombatMap,
    combatMap,
    showNotification,
    partyData,
    partyRolls
  }
    ) => {

  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [mapDrawerOpen, setMapDrawerOpen] = useState(false);
  const [postDrawerOpen, setPostDrawerOpen] = useState(false);
  const [npcDrawerOpen, setNPCDrawerOpen] = useState(false);
  const [diceDrawerOpen, setDiceDrawerOpen] = useState(false);
  const [characterDrawerOpen, setCharacterDrawerOpen] = useState(false);
  const [combatDrawerOpen, setCombatDrawerOpen] = useState(false)

  const closeThemAllHandler = () => {
    setChatDrawerOpen(false)
    setMapDrawerOpen(false)
    setPostDrawerOpen(false)
    setNPCDrawerOpen(false)
    setDiceDrawerOpen(false)
    setCharacterDrawerOpen(false)
    setCombatDrawerOpen(false)
  }

  const openChatDrawerHandler = async() => {
    if (chatDrawerOpen)  {setChatDrawerOpen(false)} 
    else {
      await closeThemAllHandler()
      setChatDrawerOpen(true);
    } 
  }

    
  const openMapDrawerHandler = async() => {
    if (mapDrawerOpen)  {setMapDrawerOpen(false)} 
    else {
      await closeThemAllHandler()
      setMapDrawerOpen(true);
    } 
  }


  const postDrawerHandler = async() => {
    if (postDrawerOpen)  {setPostDrawerOpen(false)} 
    else {
      await closeThemAllHandler()
      setPostDrawerOpen(true);
    } 
  }

  const openNPCDrawerHandler = async() => {
    if (npcDrawerOpen)  {setNPCDrawerOpen(false)} 
    else {
      await closeThemAllHandler()
      setNPCDrawerOpen(true);
    } 
  }

  const openDiceDrawerHandler = async() => {
    if (diceDrawerOpen)  {setDiceDrawerOpen(false)} 
    else {
      await closeThemAllHandler()
      setDiceDrawerOpen(true);
    } 
  }

  const openCharacterDrawerHandler = async() => {
    if (characterDrawerOpen)  {setCharacterDrawerOpen(false)} 
    else {
      await closeThemAllHandler()
      setCharacterDrawerOpen(true);
    } 
  }
  const openCombatDrawerHandler = async() => {
    if (combatDrawerOpen)  {setCombatDrawerOpen(false)} 
    else {
      await closeThemAllHandler()
      setCombatDrawerOpen(true);
    } 
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
      <Post sendMapData={sendMapData} sendNPCData={sendNPCData} sendCombatMap={sendCombatMap} showNotification={showNotification} />
    </PostDrawer>
    
    <MapDrawer show={npcDrawerOpen}>
      <NPCDisplay npcArray={npcArray} deleteNPCData={deleteNPCData} sendNPCNote={sendNPCNote} notePost={notePost} setNotePost={setNotePost} npcNotes={npcNotes} role={role}/>
    </MapDrawer>

    <MapDrawer show={combatDrawerOpen}>
    {role === "DM" && <Combat 
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
      monsterData={monsterData}
      sendMonsterInfo={sendMonsterInfo}
      role={role}
      clearMonsterInfo={clearMonsterInfo}
      clearPlayerPosition={clearPlayerPosition}
      combatMap={combatMap}
      showNotification={showNotification}
      partyData={partyData}
      partyRolls={partyRolls}
      />}

      {role === "PLAYER" && <PlayerCombat 
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
      monsterData={monsterData}
      sendMonsterInfo={sendMonsterInfo}
      role={role}
      clearMonsterInfo={clearMonsterInfo}
      clearPlayerPosition={clearPlayerPosition}
      combatMap={combatMap}
      showNotification={showNotification}
      partyData={partyData}
      partyRolls={partyRolls}
      sendPlayerRoll={sendPlayerRoll}
      />}
    
    </MapDrawer>

    <DiceDrawer show={diceDrawerOpen}>
      <Dice 
      sendPlayerRoll={sendPlayerRoll} 
      setStats={setStats} 
      sendPlayerData={sendPlayerData}/>
    </DiceDrawer>

    <DiceDrawer show={characterDrawerOpen}>

    <InputBar 
    name={name} 
    sendPlayerData={sendPlayerData}
    sendPlayerRoll={sendPlayerRoll}
    setStats={setStats}
    stats={stats}
    showNotification={showNotification}
    />
    
    </DiceDrawer>





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
        <GiAxeSword className={combatDrawerOpen ? "side-icon purple": "side-icon"}/>
        <div className="nav-explanation">COMBAT</div>
      </div>

      <div className="sideBar-button" onClick={openNPCDrawerHandler}>
        <BsFillPersonLinesFill className={npcDrawerOpen ? "side-icon purple": "side-icon"}/>
        <div className="nav-explanation">NPCs</div>
      </div>

      <div className="sideBar-button" onClick={openDiceDrawerHandler}>
        <GiDiceTwentyFacesTwenty className={diceDrawerOpen ? "side-icon purple": "side-icon"}/>
        <div className="nav-explanation">DICE</div>
      </div>

      {role === "DM" && <div className="sideBar-button" onClick={postDrawerHandler}>
        <RiImageEditFill className={postDrawerOpen ? "side-icon purple" : "side-icon"}/>
        <div className="nav-explanation">POST INFO</div>
      </div>}

      {role === 'PLAYER' && <div className="sideBar-button" onClick={openCharacterDrawerHandler}>
        <GiIciclesAura className={characterDrawerOpen ? "side-icon purple" : "side-icon"}/>
        <div className="nav-explanation">CHARACTER</div>
      </div>}

      <div className="sideBar-button" onClick={showSomething}>
        <MdLiveHelp className={showModal ? "side-icon purple" : "side-icon"}/>
        <div className="nav-explanation">TUTORIAL</div>
      </div>

      <div className="sideBar-button" onClick={showLogoutWarning}>
        <AiOutlineLogout className={exitModal ? "side-icon purple" : "side-icon"}/>
        <div className="nav-explanation">LOG OUT</div>
      </div>
      

    </div>
    </>
  )
}

export default SideBar;
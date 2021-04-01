import React, { useState } from 'react';
import './DiceRoll.css';
import diceSound from  '../Resources/diceRoll.mp3';
import {Howl, Howler} from 'howler';

const DiceRoll = ({sendPlayerRoll}) => {
  const [result, setResult] = useState(null)
  const [type, setType] = useState(4)
  const [number, setNumber] = useState(1)

  const audioClips = [
    {sound: diceSound, label: "dice"}
  ]


  const diceOptions = [
    {
      label: "D4",
      value: 4
    },
    {
      label: "D6",
      value: 6
    },
    {
      label: "D8",
      value: 8
    },
    {
      label: "D10",
      value: 10
    },
    {
      label: "D12",
      value: 12
    },
    {
      label: "D20",
      value: 20
    },

  ]

  const diceCount = [
    {
      label: 1,
      value: 1
    },
    {
      label: 2,
      value: 2
    },
    {
      label: 3,
      value: 3
    },
    {
      label: 4,
      value: 4
    },
    {
      label: 5,
      value: 5
    },
    {
      label: 6,
      value: 6
    },
  ]

  const handleType = (event) => {
    setType(event.target.value)
  }

  const handleNumber = (event) => {
    setNumber(event.target.value)
  }

  const diceMaths = () => {
    let diceVal = 0
    if (number > 1) {
      for (let i = 1;  i <= number; i++) {
        diceVal = diceVal + Math.floor(Math.random() * type) + 1
        
      }
    } else {
      diceVal = Math.floor(Math.random() * type) + 1
    }
    setResult(diceVal);
    sendPlayerRoll(diceVal)
    diceFunc(audioClips[0].sound)
    // console.log(diceVal);
  }

  const diceFunc = (src) => {
    const sound = new Howl({
      src
    })
    sound.play();
  }

  const clearRoll = () => {
    setResult(null);
    setType(4);
    setNumber(1);
  }

  return (
    <div className="diceRollContainer">
      <div className="diceSelectContainer">
      <div className="custom-select">
        <select className="diceSelect" onChange={handleType} value={type}>
          {diceOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <span className="custom-arrow" />
      </div>

      <div className="custom-select">
        <select className="diceSelect" onChange={handleNumber} value={number}>
          {diceCount.map((count) => (
            <option key={count.value }value={count.value}>{count.label}</option>
          ))}
        </select>
        <span className="custom-arrow" />
      </div>
      </div>
      <div className="diceButtonContainer">
        <button type="button" onClick={clearRoll}>CLEAR</button>
        <button type="button" onClick={diceMaths}>ROLL DICE</button>
      </div>
      <div className="diceResultContainer">
            <div className="diceResultBackground">
          {result && <h1>{result}</h1>}
            </div>
      </div>

    </div>
  )
}

export default DiceRoll;
import React from "react"
import './App.css';
import {nanoid} from "nanoid"
import Dice from "./Dice"
export default function App()
{

  const [dice,setDice] = React.useState(allNewDice())

  function generateNewDice(){
    return {
      value : Math.ceil(Math.random() * 6),
      idHeld : false,
      key : nanoid()
    }
  }
  function allNewDice(){
    const newDice = []
    for(let i=0;i<10;i++)
    {newDice.push(generateNewDice())}
    console.log(newDice)
    return newDice
  }
  const diceElements = dice.map(die=>(
    <Dice 
       value = {die.value}
       idHeld = {die.isHeld}
       key = {die.key}
    />
    ))
  function rollDice()
  {
    setDice(allNewDice)
  }
  return(
    <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>Roll</button>
    </main>
  )
}
import React from "react"
import './App.css';
import {nanoid} from "nanoid"
import Dice from "./Dice"
import Confetti from "react-confetti"

export default function App()
{

  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)

  React.useEffect(
    ()=>{
      const allHeld = dice.every(die=>die.isHeld)
      const first = dice[0].value
      const allSameValue = dice.every(die=>die.value===first)

      if(allHeld && allSameValue)
      {
        setTenzies(true)
      }
    },[dice]
  )
  function generateNewDice(){
    return {
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      key : nanoid()
    }
  }
  function allNewDice(){
    const newDice = []
    for(let i=0;i<10;i++)
    {newDice.push(generateNewDice())}
    // console.log(newDice)
    return newDice
  }

    function holdDice(key) {
      
      setDice(oldDice => oldDice.map(die => {
          return die.key === key ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }

  const diceElements = dice.map(die=>(
    <Dice 
      key = {die.key}
       value = {die.value}
       isHeld = {die.isHeld}
       holdDice={() => holdDice(die.key)}
    />
    ))
  function rollDice()
  {
    if(!tenzies)
    {
      setDice(oldDice => oldDice.map(die=>
        {
          return die.isHeld?die:generateNewDice()
        }))
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  return(
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
    </main>
  )
}
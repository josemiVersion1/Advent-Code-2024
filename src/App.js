import React, { useState } from "react"
import Day1 from "./AdventCode/Day1/Day1"
import Day2 from "./AdventCode/Day2/Day2"
import Day3 from "./AdventCode/Day3/Day3"
import './App.css'

function App() {
  const [dayToShow, setDayToShow] = useState(null)

  const getDayBoxes = () => {
    const boxes = []
    for (let i = 1; i < 26; i++) {
      boxes.push(
        <div key={i} className={i % 2 == 0 ? 'day-box day-box-red' : 'day-box'} onClick={() => setDayToShow(i)}>
          <p>Day {i}</p>
        </div>
      )
    }
    return boxes
  }

  return (
    <div className="main-container">
      <div className="title-section">
        <h1 className="main-title">Advent of Code 2024</h1>
      </div>
      <div className="day-selector-container">
        {getDayBoxes()}
      </div>
      <div className="day-selected-container">
        {dayToShow === 1 && (<Day1 />)}
        {dayToShow === 2 && (<Day2 />)}
        {dayToShow === 3 && (<Day3 />)}
      </div>
      <div className="image-container">
        <img alt="christmas-image" src="https://png.pngtree.com/png-vector/20221122/ourmid/pngtree-3d-merry-christmas-decorative-text-png-image_241350.png" />
      </div>
    </div>
  )
}

export default App

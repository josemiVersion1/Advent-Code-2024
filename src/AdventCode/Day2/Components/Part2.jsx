import React, { useState } from "react"

const Part2 = () => {
  const [inputData, setInputData] = useState("")
  const [safeCount, setSafeCount] = useState(null)

  // Function to check if a report is safe
  const isSafeReport = (levels) => {
    // Check if levels are all increasing or all decreasing
    const isIncreasing = levels.every(
      (value, index) => index === 0 || value > levels[index - 1]
    )
    const isDecreasing = levels.every(
      (value, index) => index === 0 || value < levels[index - 1]
    )

    if (!isIncreasing && !isDecreasing) {
      return false
    }

    // Check if adjacent levels differ by 1 to 3
    const hasValidDifferences = levels.every(
      (value, index) =>
        index === 0 || Math.abs(value - levels[index - 1]) >= 1 &&
        Math.abs(value - levels[index - 1]) <= 3
    )

    return hasValidDifferences
  }

  // Function to check if a report can be made safe by removing one level
  const canBeMadeSafe = (levels) => {
    for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = levels.filter((_, index) => index !== i)
      if (isSafeReport(modifiedLevels)) {
        return true
      }
    }
    return false
  }

  // Function to process the input data and calculate the safe count
  const processReports = () => {
    const reports = inputData.trim().split("\n").map((line) =>
      line.split(" ").map(Number)
    )

    const safeReports = reports.filter(
      (levels) => isSafeReport(levels) || canBeMadeSafe(levels)
    )

    setSafeCount(safeReports.length)
  }

  return (
    <div className='part-container'>
      <h2>Part 2</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
            The engineers are surprised by the low number of safe reports until they realize they forgot to tell you about the Problem Dampener.
            The Problem Dampener is a reactor-mounted module that lets the reactor safety systems tolerate a single bad level in what would otherwise be a safe report. It's like the bad level never happened!
            Now, the same rules apply as before, except if removing a single level from an unsafe report would make it safe, the report instead counts as safe.
            <br /><br />
            More of the above example's reports are now safe:
            <br />
            7 6 4 2 1: Safe without removing any level.<br />
            1 2 7 8 9: Unsafe regardless of which level is removed.<br />
            9 7 6 2 1: Unsafe regardless of which level is removed.<br />
            1 3 2 4 5: Safe by removing the second level, 3.<br />
            8 6 4 4 1: Safe by removing the third level, 4.<br />
            1 3 6 7 9: Safe without removing any level.<br /><br />
            Thanks to the Problem Dampener, 4 reports are actually safe!<br />
            <br />
            Update your analysis by handling situations where the Problem Dampener can remove a single level from unsafe reports. How many reports are now safe?
          </p>
        </div>
        <div className="problem-input-container">
          <textarea
            className="input-field"
            placeholder="Enter reports data here"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button className='submit-button' onClick={processReports}>
            Analyze Reports
          </button>
        </div>
      </div>
      {safeCount !== null && (
        <div className="result-container">
          <strong>Safe Reports Count: </strong>
          {safeCount}
        </div>
      )}
    </div>
  )
}

export default Part2
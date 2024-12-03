import React, { useState } from "react"

const Part1 = () => {
  const [inputData, setInputData] = useState("")
  const [safeCount, setSafeCount] = useState(null)

  // Function to check if a report is safe
  const isSafeReport = (report) => {
    const levels = report.split(" ").map(Number)

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

  // Function to process the input data and calculate the safe count
  const processReports = () => {
    const reports = inputData.trim().split("\n")
    const safeReports = reports.filter(isSafeReport)
    setSafeCount(safeReports.length)
  }

  return (
    <div className="part-container">
      <h2>Part 1</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
            Fortunately, the first location The Historians want to search isn't a long walk from the Chief Historian's office.
            While the Red-Nosed Reindeer nuclear fusion/fission plant appears to contain no sign of the Chief Historian, the engineers there run up to you as soon as they see you. Apparently, they still talk about the time Rudolph was saved through molecular synthesis from a single electron.
            They're quick to add that - since you're already here - they'd really appreciate your help analyzing some unusual data from the Red-Nosed reactor. You turn to check if The Historians are waiting for you, but they seem to have already divided into groups that are currently searching every corner of the facility. You offer to help with the unusual data.
            The unusual data (your puzzle input) consists of many reports, one report per line. Each report is a list of numbers called levels that are separated by spaces.
            <br />
            <br />
            For example:
            <br />
            7 6 4 2 1<br />
            1 2 7 8 9<br />
            9 7 6 2 1<br />
            1 3 2 4 5<br />
            8 6 4 4 1<br />
            1 3 6 7 9<br /><br />
            This example data contains six reports each containing five levels. The engineers are trying to figure out which reports are safe. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:
            <br /><br />
            The levels are either all increasing or all decreasing.<br />
            Any two adjacent levels differ by at least one and at most three.<br /><br />
            In the example above, the reports can be found safe or unsafe by checking those rules:
            <br />
            7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.<br />
            1 2 7 8 9: Unsafe because 2 7 is an increase of 5.<br />
            9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.<br />
            1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.<br />
            8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.<br />
            1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.<br />
            So, in this example, 2 reports are safe.<br /><br />

            Analyze the unusual data from the engineers. How many reports are safe?
          </p>
        </div>
        <div className="problem-input-container">
          <textarea
            className="input-field"
            placeholder="Enter reports data"
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
          <strong>Safe Reports Count:</strong>
          {safeCount}
        </div>
      )}
    </div>
  )
}

export default Part1
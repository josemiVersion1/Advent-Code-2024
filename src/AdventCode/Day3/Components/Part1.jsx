import React, { useState } from "react"

const Part1 = () => {
  const [inputData, setInputData] = useState("");
  const [totalSum, setTotalSum] = useState(null);

  // Regular expression to match valid mul(X,Y) instructions
  const validMulRegex = /mul\(\d{1,3},\d{1,3}\)/g;

  // Function to process the input data and calculate the sum
  const processMemory = () => {
    // Find all matches of valid mul instructions
    const matches = inputData.match(validMulRegex);

    if (!matches) {
      setTotalSum(0); // No valid instructions found
      return;
    }

    // Calculate the sum of all valid mul results
    const sum = matches.reduce((acc, match) => {
      // Extract the numbers X and Y from the instruction
      const [x, y] = match
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(Number);
      return acc + x * y;
    }, 0);

    setTotalSum(sum);
  };

  return (
    <div className="part-container">
      <h2>Part 1</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
            "Our computers are having issues, so I have no idea if we have any Chief Historians in stock! You're welcome to check the warehouse, though," says the mildly flustered shopkeeper at the North Pole Toboggan Rental Shop. The Historians head out to take a look.
            The shopkeeper turns to you. "Any chance you can see why our computers are having issues again?"
            The computer appears to be trying to run a program, but its memory (your puzzle input) is corrupted. All of the instructions have been jumbled up!
            It seems like the goal of the program is just to multiply some numbers. It does that with instructions like mul(X,Y), where X and Y are each 1-3 digit numbers. For instance, mul(44,46) multiplies 44 by 46 to get a result of 2024. Similarly, mul(123,4) would multiply 123 by 4.
            However, because the program's memory has been corrupted, there are also many invalid characters that should be ignored, even if they look like part of a mul instruction. Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.
            <br /><br />
            For example, consider the following section of corrupted memory:
            <br />
            xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
            <br /><br />
            Only the four highlighted sections are real mul instructions. Adding up the result of each instruction produces 161 (2*4 + 5*5 + 11*8 + 8*5).
            <br /><br />
            Scan the corrupted memory for uncorrupted mul instructions. What do you get if you add up all of the results of the multiplications?
          </p>
        </div>
        <div className="problem-input-container">
          <textarea
            className="input-field"
            placeholder="Enter corrupted memory data here"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button className='submit-button' onClick={processMemory}>
          Analyze Memory 
          </button>
        </div>
      </div>
      {
        totalSum !== null && (
          <div className="result-container">
            <strong>Total Sum: </strong>
            {totalSum}
          </div>
        )
      }
    </div>
  )
}

export default Part1
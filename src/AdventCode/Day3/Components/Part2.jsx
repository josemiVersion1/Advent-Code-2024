import React, { useState } from "react"

const Part2 = () => {
  
  const [inputData, setInputData] = useState("");
  const [totalSum, setTotalSum] = useState(null);

  const processMemory = () => {
    // Initialize variables
    let mulEnabled = true; // Start with mul enabled
    let sum = 0;

    // Regular expressions for valid instructions
    const validMulRegex = /mul\((\d{1,3}),(\d{1,3})\)/;
    const enableRegex = /do\(\)/;
    const disableRegex = /don't\(\)/;

    // Split the input into chunks by instructions
    const instructions = inputData.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g) || [];

    instructions.forEach((instruction) => {
      if (enableRegex.test(instruction)) {
        // Enable future mul instructions
        mulEnabled = true;
      } else if (disableRegex.test(instruction)) {
        // Disable future mul instructions
        mulEnabled = false;
      } else if (mulEnabled && validMulRegex.test(instruction)) {
        // Process valid mul instructions
        const match = instruction.match(validMulRegex);
        if (match) {
          const x = parseInt(match[1], 10);
          const y = parseInt(match[2], 10);
          sum += x * y;
        }
      }
    });

    setTotalSum(sum);
  };

  return (
    <div className='part-container'>
      <h2>Part 2</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
          As you scan through the corrupted memory, you notice that some of the conditional statements are also still intact. If you handle some of the uncorrupted conditional statements in the program, you might be able to get an even more accurate result.
          There are two new instructions you'll need to handle:
          <br /><br />
          The do() instruction enables future mul instructions.
          The don't() instruction disables future mul instructions.
          <br /><br />
          Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.
          <br /><br />
          For example:
          <br />
          xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
          <br /><br />
          This corrupted memory is similar to the example from before, but this time the mul(5,5) and mul(11,8) instructions are disabled because there is a don't() instruction before them. The other mul instructions function normally, including the one at the end that gets re-enabled by a do() instruction.
          This time, the sum of the results is 48 (2*4 + 8*5).
          <br /><br />
          Handle the new instructions; what do you get if you add up all of the results of just the enabled multiplications?
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
      {totalSum !== null && (
        <div className="result-container">
          <strong>Total Sum: </strong>
          {totalSum}
        </div>
      )}
    </div>
  );
}

export default Part2
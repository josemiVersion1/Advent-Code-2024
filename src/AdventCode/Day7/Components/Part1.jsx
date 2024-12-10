 import React, { useState } from "react"

const Part1 = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  // Function to check if a combination of operators produces the target value
  const isEquationValid = (target, numbers) => {
    const operators = ["+", "*"];

    const calculate = (nums, ops) => {
      let result = nums[0];
      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "+") result += nums[i + 1];
        else if (ops[i] === "*") result *= nums[i + 1];
      }
      return result;
    };

    const generateCombinations = (n) => {
      if (n === 1) return operators.map((op) => [op]);
      const smallerCombinations = generateCombinations(n - 1);
      return smallerCombinations.flatMap((combo) =>
        operators.map((op) => [...combo, op])
      );
    };

    const operatorCombinations = generateCombinations(numbers.length - 1);

    for (let ops of operatorCombinations) {
      if (calculate(numbers, ops) === target) return true;
    }

    return false;
  };

  const solveEquations = () => {
    const lines = input.split("\n").filter((line) => line.trim() !== "");
    let totalCalibrationResult = 0;

    for (let line of lines) {
      const [targetStr, numbersStr] = line.split(":");
      const target = parseInt(targetStr.trim(), 10);
      const numbers = numbersStr
        .trim()
        .split(" ")
        .map((n) => parseInt(n, 10));

      if (isEquationValid(target, numbers)) {
        totalCalibrationResult += target;
      }
    }

    setResult(totalCalibrationResult);
  };

  return (
    <div className="part-container">
      <h2>Part 1</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
          The Historians take you to a familiar rope bridge over a river in the middle of a jungle. The Chief isn't on this side of the bridge, though; maybe he's on the other side?
          When you go to cross the bridge, you notice a group of engineers trying to repair it. (Apparently, it breaks pretty frequently.) You won't be able to cross until it's fixed.
          You ask how long it'll take; the engineers tell you that it only needs final calibrations, but some young elephants were playing nearby and stole all the operators from their calibration equations! They could finish the calibrations if only someone could determine which test values could possibly be produced by placing any combination of operators into their calibration equations (your puzzle input).
          <br /><br />
          For example:<br />
          190: 10 19<br />
          3267: 81 40 27<br />
          83: 17 5<br />
          156: 15 6<br />
          7290: 6 8 6 15<br />
          161011: 16 10 13<br />
          192: 17 8 14<br />
          21037: 9 7 18 13<br />
          292: 11 6 16 20
          <br /><br />
          Each line represents a single equation. The test value appears before the colon on each line; it is your job to determine whether the remaining numbers can be combined with operators to produce the test value.
          Operators are always evaluated left-to-right, not according to precedence rules. Furthermore, numbers in the equations cannot be rearranged. Glancing into the jungle, you can see elephants holding two different types of operators: add (+) and multiply (*).
          Only three of the above equations can be made true by inserting operators:
          <br /><br />
          190: 10 19 has only one position that accepts an operator: between 10 and 19. Choosing + would give 29, but choosing * would give the test value (10 * 19 = 190).<br />
          3267: 81 40 27 has two positions for operators. Of the four possible configurations of the operators, two cause the right side to match the test value: 81 + 40 * 27 and 81 * 40 + 27 both equal 3267 (when evaluated left-to-right)!<br />
          292: 11 6 16 20 can be solved in exactly one way: 11 + 6 * 16 + 20.<br /><br />
          
          The engineers just need the total calibration result, which is the sum of the test values from just the equations that could possibly be true. In the above example, the sum of the test values for the three equations listed above is 3749.
          Determine which equations could possibly be true. What is their total calibration result?  
          </p>
        </div>
        <div className="problem-input-container">
          <textarea
            className="input-field"
            placeholder="Enter equations here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className='submit-button' onClick={solveEquations}>
            Solve 
          </button>
        </div>
      </div>
      {
        result !== null && (
          <div className="result-container">
            <strong>Total Calibration Result: </strong>
            {result}
          </div>
        )
      }
    </div>
  );
}

export default Part1
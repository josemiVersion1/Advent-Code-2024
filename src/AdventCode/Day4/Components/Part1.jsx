import React, { useState } from "react"

const Part1 = () => {
  const [gridInput, setGridInput] = useState("");
  
  const wordToFind = "XMAS";  const [occurrences, setOccurrences] = useState(0);
  
  const directions = [
    [0, 1], // Horizontal right
    [0, -1], // Horizontal left
    [1, 0], // Vertical down
    [-1, 0], // Vertical up
    [1, 1], // Diagonal down-right
    [-1, -1], // Diagonal up-left
    [1, -1], // Diagonal down-left
    [-1, 1], // Diagonal up-right
  ];

  const searchWordInGrid = () => {
    const grid = gridInput
      .trim()
      .split("\n")
      .map((line) => line.trim().split(""));
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = wordToFind.length;

    const resultGrid = Array.from({ length: rows }, () =>
      Array(cols).fill(".")
    );

    let count = 0;

    const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

    const findWord = (x, y, dx, dy) => {
      for (let i = 0; i < wordLength; i++) {
        const nx = x + i * dx;
        const ny = y + i * dy;
        if (!isValid(nx, ny) || grid[nx][ny] !== wordToFind[i]) {
          return false;
        }
      }
      return true;
    };

    const markWord = (x, y, dx, dy) => {
      for (let i = 0; i < wordLength; i++) {
        const nx = x + i * dx;
        const ny = y + i * dy;
        resultGrid[nx][ny] = grid[nx][ny];
      }
    };

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        for (const [dx, dy] of directions) {
          if (findWord(x, y, dx, dy)) {
            count++;
            markWord(x, y, dx, dy);
          }
        }
      }
    }

    setOccurrences(count);
  };

  return (
    <div className="part-container">
      <h2>Part 1</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
          "Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the Ceres monitoring station!
          As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input). She only has to find one word: XMAS.
          This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:
          <br /><br />
          ..X...<br />
          .SAMX.<br />
          .A..A.<br />
          XMAS.S<br />
          .X....<br /><br />
          
          The actual word search will be full of letters instead. For example:
          <br /><br />
          MMMSXXMASM<br />
          MSAMXMSMSA<br />
          AMXSXMAAMM<br />
          MSAMASMSMX<br />
          XMASAMXAMM<br />
          XXAMMXXAMA<br />
          SMSMSASXSS<br />
          SAXAMASAAA<br />
          MAMMMXMMMM<br />
          MXMXAXMASX<br /><br />
          In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:
          <br /><br />
          ....XXMAS.<br />
          .SAMXMS...<br />
          ...S..A...<br />
          ..A.A.MS.X<br />
          XMASAMX.MM<br />
          X.....XA.A<br />
          S.S.S.S.SS<br />
          .A.A.A.A.A<br />
          ..M.M.M.MM<br />
          .X.X.XMASX<br /><br />
          Take a look at the little Elf's word search. How many times does XMAS appear?
          </p>
        </div>
        <div className="problem-input-container">
          <textarea
            className="input-field"
            placeholder="Enter the word search grid here"
            value={gridInput}
            onChange={(e) => setGridInput(e.target.value)}
          />
          <button className='submit-button' onClick={searchWordInGrid}>
            Find Word
          </button>
        </div>
      </div>
      {
        occurrences > 0 && (
          <div className="result-container">
            <strong>Occurrences Found: </strong>
            {occurrences}
          </div>
        )
      }
    </div>
  );
}

export default Part1
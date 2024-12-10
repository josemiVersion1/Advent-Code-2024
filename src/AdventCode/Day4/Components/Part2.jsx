import React from "react"

const Part2 = () => {
  return (
    <div className="part-container">
      <h2>Part 2 - Missing</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
          The Elf looks quizzically at you. Did you misunderstand the assignment?
          Looking for the instructions, you flip over the word search to find that this isn't actually an XMAS puzzle;
          it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:
          <br /><br />
          M.S<br />
          .A.<br />
          M.S<br /><br />
          
          Irrelevant characters have again been replaced with . in the above diagram. Within the X, each MAS can be written forwards or backwards.
          Here's the same example from before, but this time all of the X-MASes have been kept instead:
          <br /><br />
          .M.S......<br />
          ..A..MSMS.<br />
          .M.S.MAA..<br />
          ..A.ASMSM.<br />
          .M.S.M....<br />
          ..........<br />
          S.S.S.S.S.<br />
          .A.A.A.A..<br />
          M.M.M.M.M.<br />
          ..........<br /><br />
          In this example, an X-MAS appears 9 times. Flip the word search from the instructions back over to the word search side and try again. How many times does an X-MAS appear?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Part2
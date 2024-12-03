import React, { useState } from 'react'

const Part2 = () => {
  const [inputText, setInputText] = useState('')
  const [similarityScore, setSimilarityScore] = useState(null)

  const calculateSimilarityScore = () => {
    const cleaned = inputText
      .split('\n') // Split input into lines
      .map(line => line.trim().replace(/\s{3}/, ' ')) // Remove 3 spaces and trim trailing space
      .join('\n') // Join back into a single string
    // Split the input into lines and then into individual numbers
    const lines = cleaned.split('\n').map(line => line.trim())
    const leftList = []
    const rightList = []

    lines.forEach(line => {
      const [left, right] = line.split(/\s+/).map(Number) // Split by spaces and convert to numbers
      if (!isNaN(left) && !isNaN(right)) {
        leftList.push(left)
        rightList.push(right)
      }
    })

    // Calculate similarity score
    let score = 0
    leftList.forEach(leftNum => {
      const countInRightList = rightList.filter(rightNum => rightNum === leftNum).length
      score += leftNum * countInRightList
    })

    setSimilarityScore(score)
  }

  return (
    <div className='part-container'>
      <h2>Part 2</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
            Your analysis only confirmed what everyone feared: the two lists of location IDs are indeed very different.
            Or are they?
            The Historians can't agree on which group made the mistakes or how to read most of the Chief's handwriting, but in the commotion you notice an interesting detail: a lot of location IDs appear in both lists! Maybe the other numbers aren't location IDs at all but rather misinterpreted handwriting.
            This time, you'll need to figure out exactly how often each number from the left list appears in the right list. Calculate a total similarity score by adding up each number in the left list after multiplying it by the number of times that number appears in the right list.
            <br /><br />
            Here are the same example lists again:
            <br />
            3   4<br />
            4   3<br />
            2   5<br />
            1   3<br />
            3   9<br />
            3   3<br /><br />
            For these example lists, here is the process of finding the similarity score:
            <br />
            The first number in the left list is 3. It appears in the right list three times, so the similarity score increases by 3 * 3 = 9.<br />
            The second number in the left list is 4. It appears in the right list once, so the similarity score increases by 4 * 1 = 4.<br />
            The third number in the left list is 2. It does not appear in the right list, so the similarity score does not increase (2 * 0 = 0).<br />
            The fourth number, 1, also does not appear in the right list.<br />
            The fifth number, 3, appears in the right list three times; the similarity score increases by 9.<br />
            The last number, 3, appears in the right list three times; the similarity score again increases by 9.<br />
            So, for these example lists, the similarity score at the end of this process is 31 (9 + 4 + 0 + 0 + 9 + 9).
            <br /><br />
            Once again consider your left and right lists. What is their similarity score?
          </p>
        </div>
        <div className="problem-input-container">
          <textarea
            className="input-field"
            placeholder="Enter pairs of numbers"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className='submit-button' onClick={calculateSimilarityScore}>
            Calculate Similarity Score
          </button>
        </div>
      </div>
      {similarityScore !== null && (
        <div className="result-container">
          <strong>Similarity Score: </strong>
          {similarityScore}
        </div>
      )}
    </div>
  )
}

export default Part2
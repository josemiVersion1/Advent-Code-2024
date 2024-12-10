import React, { useState } from "react"

const Part2 = () => {
  const [rulesInput, setRulesInput] = useState('');
  const [updatesInput, setUpdatesInput] = useState('');
  const [result, setResult] = useState(null);

  const parseInput = (input) => input.trim().split('\n').map(line => line.split('|').map(Number));
  const parseUpdates = (input) => input.trim().split('\n').map(line => line.split(',').map(Number));

  const topologicalSort = (pages, rules) => {
    const graph = new Map();
    const indegree = new Map();

    // Initialize graph and indegree
    pages.forEach(page => {
      graph.set(page, []);
      indegree.set(page, 0);
    });

    rules.forEach(([before, after]) => {
      if (!graph.has(before)) graph.set(before, []);
      if (!indegree.has(after)) indegree.set(after, 0);

      graph.get(before).push(after);
      indegree.set(after, indegree.get(after) + 1);
    });

    const queue = [...pages.filter(page => indegree.get(page) === 0)];
    const sorted = [];

    while (queue.length) {
      const current = queue.shift();
      sorted.push(current);

      (graph.get(current) || []).forEach(neighbor => {
        indegree.set(neighbor, indegree.get(neighbor) - 1);
        if (indegree.get(neighbor) === 0) queue.push(neighbor);
      });
    }

    return sorted.length === pages.length ? sorted : null;
  };

  const checkAndFixUpdates = (rules, updates) => {
    const correctlyOrdered = [];
    const incorrectlyOrdered = [];
    const fixedUpdates = [];

    updates.forEach(update => {
      const relevantRules = rules.filter(([x, y]) => update.includes(x) && update.includes(y));
      const sorted = topologicalSort(update, relevantRules);
      if (sorted && JSON.stringify(sorted) === JSON.stringify(update)) {
        correctlyOrdered.push(update);
      } else {
        const reordered = topologicalSort(update, relevantRules);
        incorrectlyOrdered.push(update);
        fixedUpdates.push(reordered);
      }
    });

    return { correctlyOrdered, incorrectlyOrdered, fixedUpdates };
  };

  const calculateMiddleSum = (updates) => {
    const middleNumbers = updates.map(update => update[Math.floor(update.length / 2)]);
    return middleNumbers.reduce((acc, num) => acc + num, 0);
  };

  const handleSubmit = () => {
    const rules = parseInput(rulesInput);
    const updates = parseUpdates(updatesInput);
    const { correctlyOrdered, incorrectlyOrdered, fixedUpdates } = checkAndFixUpdates(rules, updates);
    const middleSumFixed = calculateMiddleSum(fixedUpdates);

    setResult({ correctlyOrdered, incorrectlyOrdered, fixedUpdates, middleSumFixed });
  };

  return (
    <div className="part-container">
      <h2>Part 2</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
          While the Elves get to work printing the correctly-ordered updates, you have a little time to fix the rest of them.
          For each of the incorrectly-ordered updates, use the page ordering rules to put the page numbers in the right order. For the above example, here are the three incorrectly-ordered updates and their correct orderings:
          <br /><br />
          75,97,47,61,53 becomes 97,75,47,61,53.<br />
          61,13,29 becomes 61,29,13.<br />
          97,13,75,29,47 becomes 97,75,47,29,13.<br /><br />
          
          After taking only the incorrectly-ordered updates and ordering them correctly, their middle page numbers are 47, 29, and 47. Adding these together produces 123.
          Find the updates which are not in the correct order. What do you get if you add up the middle page numbers after correctly ordering just those updates?
          </p>
        </div>
        <div className="problem-input-container">
          <textarea
            className="input-field"
            placeholder="Enter rules (e.g., 47|53)"
            value={rulesInput}
            onChange={(e) => setRulesInput(e.target.value)}
          />
          <textarea
            className="input-field"
            placeholder="Enter updates (e.g., 75,47,61,53,29)"
            value={updatesInput}
            onChange={(e) => setUpdatesInput(e.target.value)}
          />
          <button className='submit-button' onClick={handleSubmit}>
            Fix Updates
          </button>
        </div>
      </div>
      {
        result && (
          <div className="result-container">
            <strong>Sum of Middle Page Numbers of Fixed Updates: </strong>
            {result.middleSumFixed}
          </div>
        )
      }
    </div>
  );
}

export default Part2
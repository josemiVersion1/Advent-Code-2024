import React, { useState } from "react"

const Part1 = () => {
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

  const checkUpdates = (rules, updates) => {
    const validUpdates = [];
    updates.forEach(update => {
      const relevantRules = rules.filter(([x, y]) => update.includes(x) && update.includes(y));
      const sorted = topologicalSort(update, relevantRules);
      if (sorted && JSON.stringify(sorted) === JSON.stringify(update)) {
        validUpdates.push(update);
      }
    });
    return validUpdates;
  };

  const calculateMiddleSum = (validUpdates) => {
    const middleNumbers = validUpdates.map(update => update[Math.floor(update.length / 2)]);
    return middleNumbers.reduce((acc, num) => acc + num, 0);
  };

  const handleSubmit = () => {
    const rules = parseInput(rulesInput);
    const updates = parseUpdates(updatesInput);
    const validUpdates = checkUpdates(rules, updates);
    const middleSum = calculateMiddleSum(validUpdates);

    setResult({ validUpdates, middleSum });
  };

  return (
    <div className="part-container">
      <h2>Part 1</h2>
      <div className="problem-container">
        <div className="problem-description-container">
          <h4>Description:</h4>
          <p>
          Satisfied with their search on Ceres, the squadron of scholars suggests subsequently scanning the stationery stacks of sub-basement 17.
          The North Pole printing department is busier than ever this close to Christmas, and while The Historians continue their search of this historically significant facility, an Elf operating a very familiar printer beckons you over.
          The Elf must recognize you, because they waste no time explaining that the new sleigh launch safety manual updates won't print correctly. Failure to update the safety manuals would be dire indeed, so you offer your services.
          Safety protocols clearly indicate that new pages for the safety manuals must be printed in a very specific order. The notation X|Y means that if both page number X and page number Y are to be produced as part of an update, page number X must be printed at some point before page number Y.
          The Elf has for you both the page ordering rules and the pages to produce in each update (your puzzle input), but can't figure out whether each update has the pages in the right order.
          <br /><br />
          For example:
          <br /><br />
          47|53<br />
          97|13<br />
          97|61<br />
          97|47<br />
          75|29<br />
          61|13<br />
          75|53<br />
          29|13<br />
          97|29<br />
          53|29<br />
          61|53<br />
          97|53<br />
          61|29<br />
          47|13<br />
          75|47<br />
          97|75<br />
          47|61<br />
          75|61<br />
          47|29<br />
          75|13<br />
          53|13<br />
          <br />
          75,47,61,53,29<br />
          97,61,53,29,13<br />
          75,29,13<br />
          75,97,47,61,53<br />
          61,13,29<br />
          97,13,75,29,47<br /><br />
          
          The first section specifies the page ordering rules, one per line. The first rule, 47|53, means that if an update includes both page number 47 and page number 53, then page number 47 must be printed at some point before page number 53. (47 doesn't necessarily need to be immediately before 53; other pages are allowed to be between them.)
          The second section specifies the page numbers of each update. Because most safety manuals are different, the pages needed in the updates are different too. The first update, 75,47,61,53,29, means that the update consists of page numbers 75, 47, 61, 53, and 29.
          To get the printers going as soon as possible, start by identifying which updates are already in the right order.
          In the above example, the first update (75,47,61,53,29) is in the right order:
          <br /><br />
          75 is correctly first because there are rules that put each other page after it: 75|47, 75|61, 75|53, and 75|29.<br />
          47 is correctly second because 75 must be before it (75|47) and every other page must be after it according to 47|61, 47|53, and 47|29.<br />
          61 is correctly in the middle because 75 and 47 are before it (75|61 and 47|61) and 53 and 29 are after it (61|53 and 61|29).<br />
          53 is correctly fourth because it is before page number 29 (53|29).<br />
          29 is the only page left and so is correctly last.<br /><br />
          
          Because the first update does not include some page numbers, the ordering rules involving those missing page numbers are ignored.<br />
          The second and third updates are also in the correct order according to the rules. Like the first update, they also do not include every page number, and so only some of the ordering rules apply - within each update, the ordering rules that involve missing page numbers are not used.<br />
          The fourth update, 75,97,47,61,53, is not in the correct order: it would print 75 before 97, which violates the rule 97|75.<br />
          The fifth update, 61,13,29, is also not in the correct order, since it breaks the rule 29|13.<br />
          The last update, 97,13,75,29,47, is not in the correct order due to breaking several rules.<br />
          For some reason, the Elves also need to know the middle page number of each update being printed. Because you are currently only printing the correctly-ordered updates, you will need to find the middle page number of each correctly-ordered update. In the above example, the correctly-ordered updates are:
          <br /><br />
          75,47,61,53,29<br />
          97,61,53,29,13<br />
          75,29,13<br /><br />
          
          These have middle page numbers of 61, 53, and 29 respectively. Adding these page numbers together gives 143.
          Of course, you'll need to be careful: the actual list of page ordering rules is bigger and more complicated than the above example.
          Determine which updates are already in the correct order. What do you get if you add up the middle page number from those correctly-ordered updates?
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
            Check Updates
          </button>
        </div>
      </div>
      {
        result && (
          <div className="result-container">
            <strong>Sum of Middle Page Numbers: </strong>
            {result.middleSum}
          </div>
        )
      }
    </div>
  );
}

export default Part1
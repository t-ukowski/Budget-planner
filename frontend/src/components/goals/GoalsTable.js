import React from 'react';
import CheckBoxes from './CheckBoxes';

export default function GoalsTable({ goalsData, updateNeeded, setUpdateNeeded }) {
  return (
    <>
      {goalsData.map(({ id, goalName, goalElementList }) => (
        <CheckBoxes
          key={id}
          parentGoal={{ id: id, name: goalName, subgoals: goalElementList }}
          updateNeeded={updateNeeded}
          setUpdateNeeded={setUpdateNeeded}
        />
      ))}
    </>
  );
}

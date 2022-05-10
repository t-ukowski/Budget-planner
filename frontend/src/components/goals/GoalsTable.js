import React from 'react';
import CheckBoxes from './CheckBoxes';

export default function GoalsTable({ goalsData }) {
  return (
    <>
      {goalsData.map(({ id, goalName, goalElementList }) => {
        const parentGoal = {
          id: id,
          name: goalName,
          subgoals: goalElementList
        };
        return (
          <>
            <CheckBoxes key={id} parentGoal={parentGoal} />
          </>
        );
      })}
    </>
  );
}

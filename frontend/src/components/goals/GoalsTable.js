import React from 'react';
import CheckBoxes from './CheckBoxes';

export default function GoalsTable({ goalsData }) {
  return (
    <>
      {goalsData.map(({ id, goalName, goalElementList }) => (
        <CheckBoxes key={id} parentGoal={{ id: id, name: goalName, subgoals: goalElementList }} />
      ))}
    </>
  );
}
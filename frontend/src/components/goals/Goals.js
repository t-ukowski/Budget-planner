import React, { useState, useEffect } from 'react';
import GoalsTable from './GoalsTable';

export default function Goals() {
  const [completedGoals, setCompletedGoals] = useState([]);
  const [uncompletedGoals, setUncompletedGoals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/CompletedGoals')
      .then((res) => res.json())
      .then((json) => setCompletedGoals(json));
    fetch('http://localhost:8080/UncompletedGoals')
      .then((res) => res.json())
      .then((json) => setUncompletedGoals(json));
  });

  return (
    <>
      <h1>W trakcie realizacji</h1>
      <GoalsTable goalsData={uncompletedGoals}></GoalsTable>
      <h1>Zrealizowane</h1>
      <GoalsTable goalsData={completedGoals}></GoalsTable>
    </>
  );
}

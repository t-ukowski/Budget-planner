import React, { useState, useEffect } from 'react';
import GoalsTable from './GoalsTable';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/AddBox';
import Title from '../page/Title';
import AddGoalModal from '../modals/AddGoalModal';

export default function Goals() {
  const [completedGoals, setCompletedGoals] = useState([]);
  const [uncompletedGoals, setUncompletedGoals] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetch('http://localhost:8080/CompletedGoals')
      .then((res) => res.json())
      .then((json) => setCompletedGoals(json));
    fetch('http://localhost:8080/UncompletedGoals')
      .then((res) => res.json())
      .then((json) => setUncompletedGoals(json));
  }, []);

  return (
    <>
      <div className="titleCard">
        <Title text="Cele" />
        <Button className="addButton big" onClick={openModal}>
          <AddIcon className="icon" />
        </Button>
      </div>
      <AddGoalModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <h1>W trakcie realizacji</h1>
      <GoalsTable goalsData={uncompletedGoals}></GoalsTable>
      <h1>Zrealizowane</h1>
      <GoalsTable goalsData={completedGoals}></GoalsTable>
    </>
  );
}

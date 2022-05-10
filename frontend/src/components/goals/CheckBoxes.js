import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddSubgoalModal from '../modals/AddSubgoalModal';
import AddIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';

export default function CheckBoxes({ parentGoal }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [subgoals, setSubgoals] = useState(parentGoal.subgoals);
  const [parent, setParent] = useState(parentGoal.name);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetch('http://localhost:8080/goals')
      .then((res) => res.json())
      .then((json) => {
        setSubgoals(json[parentGoal.id - 1].goalElementList);
        setParent(json[parentGoal.id - 1].goalName);
      });
  }, [modalIsOpen]);

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {subgoals.map((subgoal) => {
        return (
          <FormControlLabel
            key={subgoal.id}
            label={`NAME: ${subgoal.goalElementName}, ID: ${subgoal.id}, COST: ${subgoal.cost}`}
            control={<Checkbox checked={subgoal.achieved} />}
          />
        );
      })}
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label={parent}
        control={<Checkbox checked={!parentGoal.subgoals.map((s) => s.achieved).includes(false)} />}
      />
      {children}
      <Button className="addButton" onClick={openModal}>
        <AddIcon className="icon" />
      </Button>
      <AddSubgoalModal modalIsOpen={modalIsOpen} closeModal={closeModal} parent={parent} />
    </div>
  );
}

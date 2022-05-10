import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddSubgoalModal from '../modals/AddSubgoalModal';
import AddIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Button } from '@mui/material';

export default function CheckBoxes({ parentGoal }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [subgoals, setSubgoals] = useState(parentGoal.subgoals);
  const [parent, setParent] = useState(parentGoal.name);
  const [deleted, setDeleted] = useState(false);

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

  function handleDelete() {
    axios({
      method: 'delete',
      url: `http://localhost:8080/goals/${parentGoal.id}`
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.data));
    setDeleted(true);
  }

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
    <>
      {!deleted && (
        <div>
          <FormControlLabel
            label={parent}
            control={
              <Checkbox checked={!parentGoal.subgoals.map((s) => s.achieved).includes(false)} />
            }
          />
          <Button className="addButton" onClick={handleDelete}>
            <DeleteIcon className="icon" />
          </Button>
          {children}
          <Button className="addButton" onClick={openModal}>
            <AddIcon className="icon" />
          </Button>
          <AddSubgoalModal modalIsOpen={modalIsOpen} closeModal={closeModal} parent={parent} />
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddSubgoalModal from '../modals/AddSubgoalModal';
import AddIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Button } from '@mui/material';
import EditGoalModal from '../modals/EditGoalModal';

export default function CheckBoxes({ parentGoal }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [subgoals, setSubgoals] = useState(parentGoal.subgoals);
  const [parent, setParent] = useState(parentGoal.name);
  const [deleted, setDeleted] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openEditModal() {
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
  }

  useEffect(() => {
    if (!deleted) {
      fetch('http://localhost:8080/goals')
        .then((res) => res.json())
        .then((json) => {
          const mainGoal = json.find((e) => e.goalName === parentGoal.name);
          if (
            mainGoal &&
            Object.prototype.hasOwnProperty.call(mainGoal, 'goalElementList') &&
            Object.prototype.hasOwnProperty.call(mainGoal, 'goalName')
          ) {
            setSubgoals(mainGoal.goalElementList);
            setParent(mainGoal.goalName);
          }
        });
    }
  }, [modalIsOpen, editModalIsOpen]);

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
          <Button className="iconButton" onClick={openEditModal}>
            <EditIcon className="icon" />
          </Button>
          <Button className="iconButton" onClick={handleDelete}>
            <DeleteIcon className="icon" />
          </Button>
          {children}
          <Button className="iconButton" onClick={openModal}>
            <AddIcon className="icon" />
          </Button>
          <AddSubgoalModal modalIsOpen={modalIsOpen} closeModal={closeModal} parent={parent} />
          <EditGoalModal
            modalIsOpen={editModalIsOpen}
            closeModal={closeEditModal}
            goal={parentGoal}
          />
        </div>
      )}
    </>
  );
}

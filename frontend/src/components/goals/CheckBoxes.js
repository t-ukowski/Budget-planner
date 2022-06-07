import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddSubgoalModal from '../modals/AddSubgoalModal';
import AddIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import { Button } from '@mui/material';
import EditGoalModal from '../modals/EditGoalModal';
import { buttonStyleSmall } from '../../styles/buttonStyle';
import { buttonStyleVerySmall } from '../../styles/buttonStyle';

export default function CheckBoxes({ parentGoal, updateNeeded, setUpdateNeeded }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [subgoals, setSubgoals] = useState(parentGoal.subgoals);
  const [parent, setParent] = useState(parentGoal.name);
  const [deleted, setDeleted] = useState(false);
  const [realizationDate, setRealizationDate] = useState('');
  const [accounts, setAccounts] = useState('');
  const [selectedAccountName, setSelectedAccountName] = useState('');
  const [accountNames, setAccountNames] = useState('');

  const [showSubgoals, setShowSubgoals] = useState(false);
  const [affordable, setAffordable] = useState(false);
  const [sum, setSum] = useState(0);
  const [paymentLeft, setPaymentLeft] = useState(0);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setUpdateNeeded(!updateNeeded);
  }

  function openEditModal() {
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
  }

  function handleAccountSelection(newAccount) {
    setAffordable(false);
    const found = accounts.filter(({ accountName }) => accountName === newAccount);
    if (found[0].accountBalance >= paymentLeft) setAffordable(true);
    setUpdateNeeded(!updateNeeded);
  }

  function handleDelete() {
    axios({
      method: 'delete',
      url: `http://localhost:8080/goals/${parentGoal.id}`
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.data));
    setDeleted(true);
  }

  function handleShowSubGoals() {
    setShowSubgoals(!showSubgoals);
    setSum(
      subgoals.map((subgoal) => subgoal.cost).reduce((accumulator, curr) => accumulator + curr)
    );
    setPaymentLeft(
      subgoals
        .filter((subgoal) => !subgoal.achieved)
        .map((subgoal) => subgoal.cost)
        .reduce((accumulator, curr) => accumulator + curr)
    );
  }

  function handleTick() {
    const account = accounts.find((acc) => {
      return acc.accountName === selectedAccountName;
    });
    axios({
      method: 'put',
      url: `http://localhost:8080/goals/tick/${parentGoal.id}/${account.id}`
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.data));
    setUpdateNeeded(!updateNeeded);
  }

  useEffect(() => {
    if (!deleted) {
      fetch('http://localhost:8080/GoalRealization')
        .then((res) => res.json())
        .then((json) => {
          const mainGoal = json.find((e) => e.goal.id === parentGoal.id);
          if (
            mainGoal &&
            Object.prototype.hasOwnProperty.call(mainGoal, 'goal') &&
            Object.prototype.hasOwnProperty.call(mainGoal.goal, 'goalElementList') &&
            Object.prototype.hasOwnProperty.call(mainGoal.goal, 'goalName')
          ) {
            setSubgoals(mainGoal.goal.goalElementList);
            setParent(mainGoal.goal.goalName);
            if (Object.prototype.hasOwnProperty.call(mainGoal, 'date')) {
              setRealizationDate(mainGoal.date);
            }
          }
        });
      fetch('http://localhost:8080/UncompletedGoals')
        .then((res) => res.json())
        .then((json) => {
          const mainGoal = json.find((e) => e.id === parentGoal.id);
          if (
            mainGoal &&
            Object.prototype.hasOwnProperty.call(mainGoal, 'goalElementList') &&
            Object.prototype.hasOwnProperty.call(mainGoal, 'goalName')
          ) {
            setSubgoals(mainGoal.goalElementList);
            setParent(mainGoal.goalName);
          }
        });
      fetch('http://localhost:8080/CompletedGoals')
        .then((res) => res.json())
        .then((json) => {
          const mainGoal = json.find((e) => e.id === parentGoal.id);
          if (
            mainGoal &&
            Object.prototype.hasOwnProperty.call(mainGoal, 'goalElementList') &&
            Object.prototype.hasOwnProperty.call(mainGoal, 'goalName')
          ) {
            setSubgoals(mainGoal.goalElementList);
            setParent(mainGoal.goalName);
          }
        });
      fetch('http://localhost:8080/AccountsList')
        .then((res) => res.json())
        .then((json) => {
          setAccountNames(json.map((obj) => obj.accountName));
        });
      fetch('http://localhost:8080/AccountsList')
        .then((res) => res.json())
        .then((json) => {
          setAccounts(json);
        });
    }
  }, [modalIsOpen, editModalIsOpen, updateNeeded]);

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {subgoals.map((subgoal) => {
        return (
          <FormControlLabel
            key={subgoal.id}
            label={`${subgoal.goalElementName} ${subgoal.cost} PLN`}
            control={
              <Checkbox
                sx={{
                  color: '#003049',
                  '&.Mui-checked': {
                    color: '#003049'
                  }
                }}
                checked={subgoal.achieved}
              />
            }
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
              <Checkbox
                sx={{
                  color: '#003049',
                  '&.Mui-checked': {
                    color: '#003049'
                  }
                }}
                checked={!subgoals.map((s) => s.achieved).includes(false)}
                disabled={!affordable || selectedAccountName === ''}
                onChange={handleTick}
              />
            }
          />
          <Button sx={buttonStyleSmall} className="iconButton small" onClick={openEditModal}>
            <EditIcon className="icon" />
          </Button>
          <Button sx={buttonStyleSmall} className="iconButton small" onClick={handleDelete}>
            <DeleteIcon className="icon" />
          </Button>
          {!showSubgoals && (
            <Button sx={buttonStyleSmall} className="iconButton small" onClick={handleShowSubGoals}>
              <ArrowDropDownIcon className="icon" />
            </Button>
          )}
          {showSubgoals && (
            <Button sx={buttonStyleSmall} className="iconButton small" onClick={handleShowSubGoals}>
              <ArrowDropUpIcon className="icon" />
            </Button>
          )}
          {showSubgoals && (
            <>
              {paymentLeft > 0 && (
                <>
                  <div className="text-base scoreboard">
                    Pozostało jeszcze {paymentLeft} PLN z {sum} PLN
                  </div>
                  <Autocomplete
                    name="select-account"
                    id="select-account"
                    className="autocomplete"
                    value={selectedAccountName}
                    onChange={(event, newAccount) => {
                      setSelectedAccountName(newAccount);
                      handleAccountSelection(newAccount);
                    }}
                    sx={{ width: 210 }}
                    options={accountNames}
                    isOptionEqualToValue={(option, value) => option === value || value === ''}
                    autoHighlight
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        label="Konto"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password' // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  {realizationDate !== '' && (
                    <div className="text-base italic">
                      Najbliższa możliwa data realizacji: {realizationDate}
                    </div>
                  )}
                </>
              )}

              {children}
              <Button sx={buttonStyleVerySmall} className="iconButton small" onClick={openModal}>
                <AddIcon className="icon" />
              </Button>
            </>
          )}
          <AddSubgoalModal modalIsOpen={modalIsOpen} closeModal={closeModal} parent={parent} />
          <EditGoalModal
            modalIsOpen={editModalIsOpen}
            closeModal={closeEditModal}
            goal={{ id: parentGoal.id, name: parent }}
          />
        </div>
      )}
    </>
  );
}

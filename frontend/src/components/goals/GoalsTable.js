import { Button } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/AddBox';
import CheckBoxes from './CheckBoxes';

export default function GoalsTable({ goalsData }) {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Nazwa</th>
          </tr>
          {goalsData.map(({ id, goalName, goalElementList }) => {
            const parentGoall = {
              name: `${id} ${goalName}`,
              subgoals: goalElementList
            };
            return (
              <>
                <CheckBoxes parentGoal={parentGoall}></CheckBoxes>
                {goalElementList.map(({ id, cost, goalElementName, achieved }) => (
                  <tr key={id} className="subgoaltr">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{id}</td>
                    <td>{cost}</td>
                    <td>{goalElementName}</td>
                    <td>{achieved ? 'achieved' : 'not achieved'}</td>
                  </tr>
                ))}
              </>
            );
          })}
        </tbody>
      </table>
      <Button className="addButton">
        <AddIcon className="icon" />
      </Button>
    </>
  );
}

/*
{goalsData.map(({ id, goalName, goalElementList }) => (
            <>
              <tr key={id}>
                <td>{id}</td>
                <td>{goalName}</td>
                <td>
                  <Button>
                    <DeleteIcon />
                  </Button>
                  <Button>
                    <EditIcon />
                  </Button>
                </td>
              </tr>
              {goalElementList.map(({ id, cost, goalElementName, achieved }) => (
                <tr key={id} className="subgoaltr">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{id}</td>
                  <td>{cost}</td>
                  <td>{goalElementName}</td>
                  <td>{achieved ? 'achieved' : 'not achieved'}</td>
                </tr>
              ))}
            </>
          ))}




{goalsData.map(({ id, goalName, goalElementList }) => (
            <>
              <CheckBoxes parentGoal={`${id} ${goalName}`}></CheckBoxes>
              {goalElementList.map(({ id, cost, goalElementName, achieved }) => (
                <tr key={id} className="subgoaltr">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{id}</td>
                  <td>{cost}</td>
                  <td>{goalElementName}</td>
                  <td>{achieved ? 'achieved' : 'not achieved'}</td>
                </tr>
              ))}
            </>
          ))}

*/

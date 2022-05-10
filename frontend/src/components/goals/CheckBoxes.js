import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBoxes({ parentGoal }) {
  const [checked, setChecked] = React.useState([parentGoal.subgoals.map((s) => s.achieved)]);

  const handleMainChange = (event) => {
    const all = new Array(2).fill(event.target.checked);
    setChecked(all);
  };

  const handleChange = (event) => {
    let tmp = checked;
    const index = event.target.key;
    console.log(index);
    setChecked(tmp);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {parentGoal.subgoals.map((subgoal, index) => {
        return (
          <FormControlLabel
            key={subgoal.id}
            label={`NAME: ${subgoal.goalElementName}, ID: ${subgoal.id}, COST: ${subgoal.cost}`}
            control={<Checkbox checked={checked[index]} onChange={handleChange} />}
          />
        );
      })}
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label={`${parentGoal.name}`}
        control={<Checkbox checked={!checked.includes(false)} onChange={handleMainChange} />}
      />
      {children}
    </div>
  );
}

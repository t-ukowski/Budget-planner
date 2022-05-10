import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBoxes({ parentGoal }) {
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {parentGoal.subgoals.map((subgoal) => {
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
        label={`${parentGoal.name}`}
        control={<Checkbox checked={!parentGoal.subgoals.map((s) => s.achieved).includes(false)} />}
      />
      {children}
    </div>
  );
}

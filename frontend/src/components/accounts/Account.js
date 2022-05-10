// import React, { useState } from 'react';
import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { buttonStyleSmall } from '../../styles/buttonStyle';
// import axios from 'axios';

export default function Account({ id, accountName, accountBalance }) {
  // const [deleted, setDeleted] = useState(false);
  // const [edited, setEdited] = useState(false);

  function handleDelete() {
    console.log(`deleted ${id}`);
  }

  function handleEdit() {
    console.log(`edited ${id}`);
  }

  return (
    <tr>
      <th>{accountName}</th>
      <th>{accountBalance}</th>
      <th>
        <Button sx={buttonStyleSmall} className="iconButton small" onClick={handleDelete}>
          <DeleteIcon className="icon" />
        </Button>
        <Button sx={buttonStyleSmall} className="iconButton small" onClick={handleEdit}>
          <EditIcon className="icon" />
        </Button>
      </th>
    </tr>
  );
}

import React, { useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { buttonStyleSmall } from '../../styles/buttonStyle';
import axios from 'axios';
import EditAccountModal from '../modals/EditAccountModal';

export default function Account({ id, accountName, accountBalance }) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  function openEditModal() {
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
  }

  function handleDelete() {
    axios({
      method: 'delete',
      url: `http://localhost:8080/deleteAccount/${id}`
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.data));
    setDeleted(true);
  }

  return (
    <>
      <EditAccountModal
        modalIsOpen={editModalIsOpen}
        closeModal={closeEditModal}
        accountBalance={accountBalance}
        accountName={accountName}
        id={id}
      />
      {!deleted && (
        <tr>
          <th>{accountName}</th>
          <th>{accountBalance}</th>
          <th>
            <Button sx={buttonStyleSmall} className="iconButton small" onClick={handleDelete}>
              <DeleteIcon className="icon" />
            </Button>
            <Button sx={buttonStyleSmall} className="iconButton small" onClick={openEditModal}>
              <EditIcon className="icon" />
            </Button>
          </th>
        </tr>
      )}
    </>
  );
}

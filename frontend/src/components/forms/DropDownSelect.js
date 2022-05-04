import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function DropDownSelect(name, onChangeSet, label, options) {
  return (
    <Autocomplete
      name={name}
      id={`select-${name}`}
      value={name}
      onChange={(event, newType) => {
        onChangeSet(newType.label);
      }}
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      // getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          //onChange={(e) => setType(e.target.value.label)}
          label={`${label}`}
          //value={type}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

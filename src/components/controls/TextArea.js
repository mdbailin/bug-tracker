import React from 'react'
import { TextField } from '@material-ui/core';

export default function TextArea(props) {

    const { name, label, value, error=null, onChange } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
            multiline
            rows={2}
            maxRows={20}
        />
    )
}
import React from 'react'
import TicketForm from './ticketForm';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employees() {

    const classes = useStyles();

    return (

            <Paper className={classes.pageContent}>
                <TicketForm />
            </Paper> 
    )
}

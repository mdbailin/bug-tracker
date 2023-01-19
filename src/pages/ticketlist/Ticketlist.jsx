import * as React from 'react';
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import UserTicketList from "../../components/userTicketList/UserTicketList"
import "./ticketlist.scss"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TicketForm from '../../components/ticketForm/TicketForm';
import * as ticketService from "../../services/ticketService";
import { getProjects } from '../../services/ticketService';

const Ticketlist = () => {
        const [open, setOpen] = React.useState(false);
        
        const handleClickOpen = () => {
            getProjects();
            setOpen(true);
        };
        
        const handleClose = () => {
            setOpen(false);
        };
    return (
        <div className="ticketList">
            <Sidebar />
            <div className="ticketListContainer">
                <Navbar />
            <div className="ticketTable">
                <div className="ticketTitle">Tickets
                    <div className="newTicketButton">
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add New Ticket
                    </Button>
                    <Dialog open={open} onSubmit={handleClose} onClose={handleClose}>
                    <DialogTitle>New Ticket</DialogTitle>
                    <DialogContent>
                        <TicketForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions> 
                    </Dialog>
                    </div>
                </div>
                <UserTicketList />
            </div>
            </div>
        </div>
    )
};

export default Ticketlist
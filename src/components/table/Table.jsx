import React from 'react';
import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from "../../firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { useEffect,useState } from "react";

const List = () => {
  const [tickets, setTickets] = useState([])
  const [projects, setProjects] = useState([])
  

  useEffect(() => {
    const ticketRef = collection(db, "tickets")
    const ticketQuery = query(ticketRef, orderBy("timeStamp", "desc"), limit(5))
    

    const unsub = onSnapshot(ticketQuery, (snapshot) => 
      setTickets(snapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id })))
    );
  
  return unsub;
}, []);

useEffect(() => {
  const projectRef = collection(db, "projects")
  const projectQuery = query(projectRef)

  const unsub = onSnapshot(projectQuery, (snapshot) => 
    setProjects(snapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id })))
  );
  
  return unsub;
}, []);

  
  const statusArr = ["New", "In Progress", "Resolved"];
  const priorityArr = ["low", "medium", "high", "immediate"]

  function formatDateTime(input){
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(input));
    var date = epoch.toISOString();
    date = date.replace('T', ' ');
    return date.split('.')[0].split(' ')[0];
};

    const rows = []
    if(tickets.length && projects.length){
                for (var i = 0; i<tickets.length; i ++){
                    rows.push(
                {
                id: tickets[i]["id"],
                project: (projects[tickets[i]["projectId"]]) ? projects[tickets[i]["projectId"]]["projectName"] : "loading",
                ticket: tickets[i]["ticket"],
                status: statusArr[tickets[i]["status"]],
                date: (tickets[i]["timeStamp"]) ? formatDateTime(tickets[i]["timeStamp"].seconds) : "loading",
                priority: priorityArr[tickets[i]["priority"]]
                }
            )
        }
    }
    return (
        <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell className="tableCell">Id</TableCell>
              <TableCell className="tableCell">Project</TableCell>
              <TableCell className="tableCell">Ticket</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{row.project}</TableCell>
                <TableCell className="tableCell">{row.ticket}</TableCell>
                <TableCell className="tableCell">{row.status}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">
                  <span className={`priority ${row.priority}`}>{row.priority}</span>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default List 
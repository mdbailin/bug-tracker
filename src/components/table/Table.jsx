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

  console.log(tickets)
  const statusArr = ["New", "In Progress", "Resolved"];
  const priorityArr = ["low", "medium", "high", "immediate"]

  function formatDateTime(input){
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(input));
    var date = epoch.toISOString();
    date = date.replace('T', ' ');
    return date.split('.')[0].split(' ')[0];
};

    const rows = (tickets.length && projects.length) ? [
        {
          id: tickets[0]["id"],
          project: projects[tickets[0]["projectId"]]["projectName"],
          ticket: tickets[0]["ticket"],
          status: statusArr[tickets[0]["status"]],
          date: formatDateTime(tickets[0]["timeStamp"].seconds),
          priority: priorityArr[tickets[0]["priority"]]
        },
        {
          id: tickets[1]["id"],
          project: projects[tickets[1]["projectId"]]["projectName"],
          ticket: tickets[1]["ticket"],
          status: statusArr[tickets[1]["status"]],
          date: formatDateTime(tickets[1]["timeStamp"].seconds),
          priority: priorityArr[tickets[1]["priority"]]
        },
        {
          id: tickets[2]["id"],
          project: projects[tickets[2]["projectId"]]["projectName"],
          ticket: tickets[2]["ticket"],
          status: statusArr[tickets[2]["status"]],
          date: formatDateTime(tickets[2]["timeStamp"].seconds),
          priority: priorityArr[tickets[2]["priority"]]
        },
        {
          id: tickets[3]["id"],
          project: projects[tickets[3]["projectId"]]["projectName"],
          ticket: tickets[3]["ticket"],
          status: statusArr[tickets[3]["status"]],
          date: formatDateTime(tickets[3]["timeStamp"].seconds),
          priority: priorityArr[tickets[3]["priority"]]
        },
        {
          id: tickets[4]["id"],
          project: projects[tickets[4]["projectId"]]["projectName"],
          ticket: tickets[4]["ticket"],
          status: statusArr[tickets[4]["status"]],
          date: formatDateTime(tickets[4]["timeStamp"].seconds),
          priority: priorityArr[tickets[4]["priority"]]
        },
      ] : [];
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
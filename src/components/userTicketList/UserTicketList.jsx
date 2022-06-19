import "./userTicketList.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox'
import { db } from "../../firebase";
import { collection, query, orderBy, limit, onSnapshot, where, doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useEffect,useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { ticketIncrement } from "../ticketForm/TicketForm";



const UserTicketList = () => {
  
  const [tickets, setTickets] = useState([])
  const [projects, setProjects] = useState([])
  const [ticketData, setTicketData] = useState([])
  const [newTicketData, setNewTicketData] = useState([])
  const [finishedLoading, setFinishedLoading] = useState(false)
  const [isFirstRun, setIsFirstRun] = useState(false)
  const { userId } = useParams()

  useEffect(() => {
    const ticketRef = collection(db, "tickets")
    const ticketQuery = query(ticketRef, orderBy("timeStamp", "desc"), where("userId", "==", userId))
    

    const unsub = onSnapshot(ticketQuery, (snapshot) => 
      setTickets(snapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id })))
    );
  return unsub;
});

useEffect(() => {
  const projectRef = collection(db, "projects")
  const projectQuery = query(projectRef)

  const unsub = onSnapshot(projectQuery, (snapshot) => 
    setProjects(snapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id })))
  );
  return unsub;
});

  
  const statusArr = ["New", "In Progress", "Resolved"];
  const priorityArr = ["low", "medium", "high", "immediate"]

  function formatDateTime(input){
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(input));
    var date = epoch.toISOString();
    date = date.replace('T', ' ');
    return date.split('.')[0].split(' ')[0];
};
 

useEffect(() => {
  if(tickets.length && projects.length && !finishedLoading){ 
  let rows = []
  for (var i = 0; i<tickets.length; i ++){
      rows.push(
  {
  id: tickets[i]["id"],
  project: projects[tickets[i]["projectId"]]["projectName"],
  ticket: tickets[i]["ticket"],
  status: statusArr[tickets[i]["status"]],
  date: (tickets[i]["timeStamp"]) ? formatDateTime(tickets[i]["timeStamp"].seconds) : "loading",
  priority: priorityArr[tickets[i]["priority"]],
  completed: tickets[i]["completed"]
  }
  )
  }
  setFinishedLoading(true)
  setTicketData(rows)
}
}, [tickets])

useEffect(() => {
  if(isFirstRun){

    const newTicketRef = collection(db, "tickets")
    const newTicketQuery = query(newTicketRef, orderBy("timeStamp", "desc"), where("userId", "==", userId), limit(1))
    const unsub = onSnapshot(newTicketQuery, (snapshot) => 
      setNewTicketData(snapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id }))),
    );
  return unsub;
  
  } else {
    setIsFirstRun(true)
  }
  
}, [ticketIncrement]);

useEffect(() => {
  if(newTicketData.length && newTicketData[0]["timeStamp"]){
    const ticket = newTicketData[0];
    const ticketInfo = {
      id: ticket["id"],
      project: projects[ticket["projectId"]]["projectName"],
      ticket: ticket["ticket"],
      status: statusArr[ticket["status"]],
      date: (ticket["timeStamp"]) ? formatDateTime(ticket["timeStamp"].seconds) : "loading",
      priority: priorityArr[ticket["priority"]],
      completed: ticket["completed"]
    }
    const index = ticketData.map(object => object.id).indexOf(ticketInfo.id);
    if (index === -1){
      setTicketData(ticketData => [ticketInfo, ...ticketData])
    }
  }
  
}, [newTicketData]);


 const updateData = async(id) => {
   const ticketRef = doc(db, "tickets", id)
   const docSnap = await getDoc(ticketRef);
   if (docSnap.exists()) {
    if(docSnap.data().completed === false){
      await updateDoc(ticketRef, {
        completed: true,
        status: "2"
      });
    } else{
      await updateDoc(ticketRef, {
        completed: false,
        status: "1"
      });
    }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
 }
 const handleChange = (id) => {
      const newTicketList = ticketData.map(row=>{
        if(row.id === id)
          return {...row, status: (row.status === "In Progress" || row.status === "New") ? "Resolved" : "In Progress", completed:!row.completed }
        return row;
        })
      setTicketData(newTicketList)
      updateData(id)
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
              <TableCell className="tableCell">Completed?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{row.project}</TableCell>
                <TableCell className="tableCell">{row.ticket}</TableCell>
                <TableCell className="tableCell">{row.status}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">
                  <span className={`priority ${row.priority}`}>{row.priority}</span>
                  </TableCell>
                <TableCell className="tableCell">
                <Checkbox
                  checked={row.completed}
                  onClick={() => handleChange(row.id)}
                />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default UserTicketList 
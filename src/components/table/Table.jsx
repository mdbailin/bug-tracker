import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const List = () => {
    const rows = [
        {
          id: 1,
          project: "Frontend Dev",
          ticket: "Div not centered",
          status: "resolved",
          date: "a month ago",
          priority: "immediate"
        },
        {
          id: 2,
          project: "Frontend Dev",
          ticket: "Div not centered",
          status: "resolved",
          date: "a month ago",
          priority: "low"
        },
        {
          id: 3,
          project: "Frontend Dev",
          ticket: "Div not centered",
          status: "resolved",
          date: "a month ago",
          priority: "immediate"
        },
        {
          id: 4,
          project: "Backend Dev",
          ticket: "http GET method fails",
          status: "new",
          date: "10 days ago",
          priority: "high"
        },
        {
          id: 5,
          project: "Backend Dev",
          ticket: "http GET method fails",
          status: "new",
          date: "10 days ago",
          priority: "medium"
        },
      ];
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
import React from 'react'
import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BugReportIcon from '@mui/icons-material/BugReport';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom"
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext)
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                <span className="logo">Bugtracker</span>   
                </Link>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN </p>
                    <li>
                        <Link to="/" style={{ textDecoration: "none" }}>    
                        <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>      
                        <AccountTreeIcon className="icon"/>
                        <span>Projects</span>
                    </li>
                    <li>
                        <Link to="/tickets" style={{ textDecoration: "none" }}>  
                        <BugReportIcon className="icon"/>
                        <span>Tickets</span>
                        </Link>
                    </li>
                    <p className="title">USER </p>
                    <li>
                        <SupervisorAccountIcon className="icon"/>
                        <span>Admin</span>
                    </li>
                    <li>
                        <LogoutIcon className="icon"/>
                        <span>Logout</span>
                    </li>  
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" 
                    onClick={()=> dispatch({type: "LIGHT"})}>
                </div>
                <div className="colorOption"
                    onClick={()=> dispatch({type: "DARK"})}>
                </div>
            </div>
        </div>
                
            
    )
}

export default Sidebar
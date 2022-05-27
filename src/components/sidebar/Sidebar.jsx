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
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext, AuthContext)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))["uid"];

    const handleLogout = (e)=>{
        e.preventDefault()

        signOut(auth).then(() => {
            localStorage.clear();
            dispatch({type: "LOGOUT"})
            navigate("/login")
          }).catch((error) => {
            console.log(true)
        });
    }

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
                        <Link to={"/projects" } style={{ textDecoration: "none" }}>         
                        <AccountTreeIcon className="icon"/>
                        <span>Projects</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/tickets/" + user} style={{ textDecoration: "none" }}>  
                        <BugReportIcon className="icon"/>
                        <span>Tickets</span>
                        </Link>
                    </li>
                    <p className="title">USER </p>
                    <li>
                        <Link to={"/users" } style={{ textDecoration: "none" }}> 
                        <SupervisorAccountIcon className="icon"/>
                        <span>Team</span>
                        </Link>
                    </li>
                    <li>
                        <LogoutIcon className="icon"/>
                        <span onClick={handleLogout}>Logout</span>
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
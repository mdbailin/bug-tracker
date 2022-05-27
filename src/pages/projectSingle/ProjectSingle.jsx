import React from 'react';
import "./projectSingle.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProjectChart from "../../components/projectChart/ProjectChart";
import ShortProjectTicketList from "../../components/shortProjectTicketList/ShortProjectTicketList";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ProjectSingle = () => {
    const { projectId } = useParams();
    const [projectdesc, setprojectdesc] = React.useState('')
    const [projectname, setprojectname] = React.useState('')
    const [userId, setUserId] = React.useState([])

    const fetchUserInfo = async() => {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        return data
        
    }
    async function setData(){
        const data = await fetchUserInfo()
        setprojectdesc(data["projectDescription"])
        setprojectname(data["projectName"])
        setUserId(data["userId"])

    }

    setData()
    



    return (
    <div className="single">
        <Sidebar />
        <div className="singleContainer"> 
        <Navbar />
        <div className="top">
            <div className="left">
                <h1 className="title">Information</h1>
                <div className="item">
                    <div className="details">
                        <h1 className="itemTitle">{projectname}</h1>
                        <div className="detailItem">
                            <span className="itemKey">Project Description:</span>
                            <span className="itemValue">{projectdesc}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Team:</span>
                            <ul>
                            {userId.map((user) =>
                                <li key={user}>
                                <span className="itemValue">{user}</span>
                                </li>
                            )}
                            </ul>
                        </div>
                    </div>
                </div>   
            </div>
            <div className="right"></div>
                <ProjectChart aspect={2 / 1} title="Tickets by Month"/>
            </div>
        <div className="bottom">
        <h1 className="title">Latest Tickets</h1>
                <ShortProjectTicketList/>
        </div>
    </div>
   </div>
    )
}

export default ProjectSingle
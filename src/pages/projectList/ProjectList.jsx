import React from 'react';
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import ProjectTable from "../../components/projectTable/ProjectTable"
import "./projectList.scss"

const ProjectList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <ProjectTable />
            </div>
        </div>
    )
}

export default ProjectList
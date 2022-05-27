import "./projectTable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { projectColumns } from "../../projectsource";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {db} from "../../firebase"


const ProjectTable = () => {
  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);
        
        const handleClickOpen = () => {
            setOpen(true);
        };
        
        const handleClose = () => {
            setOpen(false);
        };

  useEffect(()=>{
    const unsub = onSnapshot(
      collection(db, "projects"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        for (var i = 0; i < list.length; i++) {
          list[i]["userId"] = list[i]["userId"].join(' ')
        }
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };

  },[]);

  const handleDelete = async(id) => {
    try{
      await deleteDoc(doc(db, "projects", id));
      setData(data.filter((item) => item.id !== id));
    } catch(err){
      console.log(err)
    }
  };


    const actionColumn = [
      {
        field: "action", 
        headerName: "Action", 
        width: 200, 
        renderCell: (params) => {
        return (
          <div className="cellAction">
          {/*    <Link to={"/projects/" + params.row.id} style={{ textDecoration: "none "}}>
               <div className="viewButton">View</div>
               </Link> */}
              <div 
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
              >
                Delete
                </div>
           </div>
        )
      }}];
    return (
    <div className="projectTable">
      <div className="projectTableTitle">
        Projects
        <Link to="/projects/new" style={{ textDecoration: "none "}} className="link">
           Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={projectColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    );
};

export default ProjectTable;
import React from 'react';
export const projectColumns = [
    { field: "projectName", headerName: "Project Name", width: 150},
    { field: "projectDescription", headerName: "Project Description", width: 230},
    { field: "userId", 
      headerName: "Team", 
      width: 430, 
      renderCell: (params) => {
        return (
            <div className="cellWithNames">
            {params.formattedValue}
           </div>
        )
      },
    }
     

    
];
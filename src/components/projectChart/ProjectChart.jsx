import React from 'react';
import "./projectChart.scss"
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from "../../firebase"
import { useParams } from "react-router-dom";

const ProjectChart = ({aspect, title}) => {
  const { projectId } = useParams()  
  const [january, setJanuary] = useState(0)
  const [feburary, setFebruary] = useState(0)
  const [march, setMarch] = useState(0)
  const [april, setApril] = useState(0)
  const [may, setMay] = useState(0)
  const [june, setJune] = useState(0)
  
  const data = [
      { name: "January", Total: january },
      { name: "February", Total: feburary },
      { name: "March", Total: march },
      { name: "April", Total: april },
      { name: "May", Total: may },
      { name: "June", Total: june },
    ];
  
    useEffect(() => {
      const fetchMonthData = async () => {
        const januaryBeginning = new Date('2022-01-01');
        const januaryEnd = new Date('2022-01-31');

        const februaryBeginning = new Date('2022-02-01');
        const februaryEnd = new Date('2022-02-28');

        const marchBeginning = new Date('2022-03-01');
        const marchEnd = new Date('2022-03-31');

        const aprilBeginning = new Date('2022-04-01');
        const aprilEnd = new Date('2022-04-30');

        const mayBeginning = new Date('2022-05-01');
        const mayEnd = new Date('2022-05-31');

        const juneBeginning = new Date('2022-06-01');
        const juneEnd = new Date('2022-06-30');
        
        const januaryQuery = query(
          collection(db, "tickets"),
          where("projectId", "==", projectId),
          where("timeStamp", "<=", januaryEnd),
          where("timeStamp", ">", januaryBeginning)
          );
        
        const februaryQuery = query(
          collection(db, "tickets"),
          where("projectId", "==", projectId),
          where("timeStamp", "<=", februaryEnd),
          where("timeStamp", ">", februaryBeginning)
          );

        const marchQuery = query(
          collection(db, "tickets"),
          where("projectId", "==", projectId),
          where("timeStamp", "<=", marchEnd),
          where("timeStamp", ">", marchBeginning)
          );
          
        const aprilQuery = query(
          collection(db, "tickets"),
          where("projectId", "==", projectId),
          where("timeStamp", "<=", aprilEnd),
          where("timeStamp", ">", aprilBeginning)
          );

        const mayQuery = query(
          collection(db, "tickets"),
          where("projectId", "==", projectId),
          where("timeStamp", "<=", mayEnd),
          where("timeStamp", ">", mayBeginning)
          );
        
        const juneQuery = query(
          collection(db, "tickets"),
          where("projectId", "==", projectId),
          where("timeStamp", "<=", juneEnd),
          where("timeStamp", ">", juneBeginning)
          );
          
  
          const januaryData = await getDocs(januaryQuery);
          const februaryData = await getDocs(februaryQuery);
          const marchData = await getDocs(marchQuery);
          const aprilData = await getDocs(aprilQuery);
          const mayData = await getDocs(mayQuery);
          const juneData = await getDocs(juneQuery);

          setJanuary(januaryData.docs.length);
          setFebruary(februaryData.docs.length);
          setMarch(marchData.docs.length);
          setApril(aprilData.docs.length);
          setMay(mayData.docs.length);
          setJune(juneData.docs.length);

          
      };
      fetchMonthData();
      }, []);
  return (
          
     <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect = {aspect}>
            <AreaChart 
                width={730} 
                height={250} 
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="Total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="gray"/>
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        <Tooltip />
        <Area 
            type="monotone" 
            dataKey="Total" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#Total)" 
        />
      </AreaChart>
      </ResponsiveContainer>
    </div>
    );
};

export default ProjectChart 
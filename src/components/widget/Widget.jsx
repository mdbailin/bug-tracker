import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BugReportIcon from '@mui/icons-material/BugReport';
import { collection, query, where, getDocs } from "firebase/firestore"
import {db} from "../../firebase"
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
        const [amount, setAmount] = useState(null)
        const [diff, setDiff] = useState(null)
        let data;

        switch(type){
            case "user":
                data={
                    title: "USERS",
                    link: "See all users",
                    query:"users",
                    icon : (
                        <PersonOutlineIcon className="icon" style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0 ,0.2)",
                        }}
                        />
                    ),
                };
                    break;
            case "project":
                data={
                    title: "PROJECTS",
                    link: "View all projects",
                    query: "projects",
                    icon : (
                        <AccountTreeIcon className="icon" style={{
                            color: "crimson",
                            backgroundColor: "rgba(0, 255, 0 ,0.2)",
                        }}/>
                            )
                        };
                            break;
            case "ticket":
                data={
                    title: "TICKETS",
                    link: "View all tickets",
                    query: "tickets",
                    icon : (
                        <BugReportIcon className="icon" style={{
                            color: "crimson",
                            backgroundColor: "rgba(0, 0, 255 ,0.2)",
                        }}/>
                            )
                        };
                        break;
                        default:
                        break;
                 }

                useEffect(() => {
                const fetchData = async () => {
                    const today = new Date();
                    const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
                    const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
            
                    const lastMonthQuery = query(
                    collection(db, data.query),
                    where("timeStamp", "<=", today),
                    where("timeStamp", ">", lastMonth)
                    );
                    const prevMonthQuery = query(
                    collection(db, data.query),
                    where("timeStamp", "<=", lastMonth),
                    where("timeStamp", ">", prevMonth)
                    );
            
                    const lastMonthData = await getDocs(lastMonthQuery);
                    const prevMonthData = await getDocs(prevMonthQuery);
            
                    setAmount(lastMonthData.docs.length);
                                     
                    setDiff(
                    ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
                        100
                    );
                };
                fetchData();
                }, []);

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
                    {diff < 0 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/> }
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget 
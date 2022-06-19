import "./featured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { collection, query, where, getDocs } from "firebase/firestore"
import {db} from "../../firebase"
import { useEffect, useState } from "react";

const Featured = () => {

    const [today, setToday] = useState(null)
    const [diff, setDiff] = useState(null)
    const [daily, setDaily] = useState(30)

    useEffect(() => {
        const fetchData = async () => {
            const today = new Date();
            today.setHours(0,1,0,0);
            const tomorrow = new Date(new Date().setDate(today.getDate()));
            tomorrow.setHours(23,59,0,0)
            
            
    
            const dayQuery = query(
            collection(db, "tickets"),
            where("status", "==", "2"),
            where("timeStamp", "<=", tomorrow),
            where("timeStamp", ">", today)
            );
            
    
            const dayData = await getDocs(dayQuery);
            
    
            setToday(dayData.docs.length);
            
        };
        fetchData();
        }, []);
        
    return (
        <div className="featured" data-testid="featured">
            <div className="top">
                <h1 className="title">Ticket Monitor</h1>
                <MoreVertIcon fontSize="small"/>
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={ (today/daily)*100 } text={Math.round((today/daily)*100)+"%"} strokeWidth={5}/>
                </div>
                <p className="title">Tickets solved today</p>
                <p className="amount">{today}</p>
                <p className="desc">Tickets solved from 12:01am to 11:59 pm each day
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Daily Target</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">{daily}</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">200</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className="resultAmount">200</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured
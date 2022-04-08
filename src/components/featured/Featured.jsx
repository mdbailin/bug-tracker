import "./featured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Ticket Monitor</h1>
                <MoreVertIcon fontSize="small"/>
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={50} text={"50%"} strokeWidth={5}/>
                </div>
                <p className="title">Tickets solved today</p>
                <p className="amount">100</p>
                <p className="desc">Tickets solved from 12:01am to 11:59 pm each day
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Daily Target</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">200</div>
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
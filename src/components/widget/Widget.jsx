import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BugReportIcon from '@mui/icons-material/BugReport';

const Widget = ({ type }) => {
        let data;

        //temporary
        const count = 100;
        const percent = 20;

        switch(type){
            case "user":
                data={
                    title: "USERS",
                    link: "See all users",
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

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{count}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {percent} %
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget 
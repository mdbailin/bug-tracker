import React from 'react';
import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UserChart from "../../components/userChart/UserChart";
import UserTicketList from "../../components/userTicketList/UserTicketList";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Single = () => {
    const { userId } = useParams();
    const [url_string, seturl_string] = React.useState('https://firebasestorage.googleapis.com/v0/b/bugtracker-ad036.appspot.com/o/loading.png?alt=media&token=6f586e74-eaf6-4250-9b5f-7aa713f7c183');
    const [username, setusername] = React.useState('')
    const [email, setemail] = React.useState('')
    const [phone, setphone] = React.useState('')
    const [country, setcountry] = React.useState('')

    const fetchUserInfo = async() => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        return data
        
    }
    async function setData(){
        const data = await fetchUserInfo()
        seturl_string(data["img"])
        setusername(data["username"])
        setemail(data["email"])
        setphone(data["phone"])
        setcountry(data["country"])

    }

    setData()
    



    return (
    <div className="single">
        <Sidebar />
        <div className="singleContainer"> 
        <Navbar />
        <div className="top">
            <div className="left">
                <div className="editButton">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                    <img src={url_string}
                    alt="avatar" 
                    className="itemImg" 
                    />
                    <div className="details">
                        <h1 className="itemTitle">{username}</h1>
                        <div className="detailItem">
                            <span className="itemKey">Email:</span>
                            <span className="itemValue">{email}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Phone:</span>
                            <span className="itemValue">{phone}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Country:</span>
                            <span className="itemValue">{country}</span>
                        </div>
                    </div>
                </div>   
            </div>
            <div className="right"></div> 
                <UserChart aspect={3 / 1} title="Tickets by Month"/>
            </div>
        <div className="bottom">
        <h1 className="title">Latest Tickets</h1>
                <UserTicketList/>
        </div>
        </div>
    </div>
    )
}

export default Single
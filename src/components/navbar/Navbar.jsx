import React from 'react';
import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import {db} from "../../firebase"


// Some features are commented out and will be added in future updates.

const Navbar = () => {
    const { dispatch } = useContext(DarkModeContext);
    const [url_string, seturl_string] = React.useState('https://firebasestorage.googleapis.com/v0/b/bugtracker-ad036.appspot.com/o/loading.png?alt=media&token=6f586e74-eaf6-4250-9b5f-7aa713f7c183');
    
    const fetchURL = async () => {
        try{
            const user = JSON.parse(localStorage.getItem('user'))["uid"];
            const userRef = doc(db, "users", user)
            const docSnap = await getDoc(userRef)
            const url = docSnap.data()["img"]
            return url
        } catch(err){
            console.log(err)
        }
    }

    async function url(){
        seturl_string(await fetchURL())
    }

    useEffect(()=>{
        url();
      },[]);
    

    const getFullscreenElement = () => {
        return document.fullscreenElement
            || document.webkitFullscreenElement
            || document.mozFullscreenElement
            || document.msFullscreenElement;

    }
    
    const toggleFullscreen = () => {
         if(getFullscreenElement()) {
             document.exitFullscreen();
         } else {
             document.documentElement.requestFullscreen().catch(console.log)
         }
    }

    

    
    
    return (
        <div className="navbar" data-testid="navbar">
            <div className="wrapper">
                <div className="search">
                    {/* TODO: Implement search feature */}
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon className="icon"/>
                </div>
                <div className="items">
                    {/* <div className="item">
                        <LanguageOutlinedIcon className="icon"/>
                        English
                    </div> */}
                    <div className="item">
                        <DarkModeOutlinedIcon className="icon" onClick={() => dispatch({ type: "TOGGLE" })}/>
                    </div>
                    <div className="item">
                        <FullscreenExitOutlinedIcon onClick={toggleFullscreen} className="icon"/>
                    </div>
                    {/* <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon"/>
                        <div className="counter">1</div>
                    </div> */}
                    {/* <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon"/>
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className="icon"/>  
                    </div> */}
                    <div className="item">
                        <img
                            src={url_string}
                            alt=""
                            className="avatar"
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
import "./newProject.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import React, {useEffect, useState} from "react";
import { doc, setDoc, serverTimestamp, getDocs, query, collection } from "firebase/firestore"; 
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { getProjects } from '../../services/ticketService';






const NewProject = ({inputs,title}) => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [per, setPer] = useState(null);
    const navigate = useNavigate()

    useEffect(()=>{
        const uploadFile = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPer(progress)
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break;
            }
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setData((prev)=>({...prev, img:downloadURL}))
            });
        }
        );
                };
                file && uploadFile();
            },[file]);

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({...data, [id]: value });
    }; 

    
    
    const handleAdd = async(e) => {
        e.preventDefault()
        const projectQuery = collection(db, "projects")
        const projectData = await getDocs(projectQuery)
        let count = (projectData.docs.length !== 0) ?  projectData.docs.length - 1 : 0
        count += 1
        try{
            await setDoc(doc(db, "projects", String(count)), {
                ...data,
                userId: [JSON.parse(localStorage.getItem("user"))["email"]],
                timeStamp: serverTimestamp()
            });
            getProjects();
            navigate(-1)
        } catch(err){
            console.log(err); 
        }     
    }
    
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleAdd}>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                    id={input.id} 
                                    type={input.type} 
                                    className={input.className} 
                                    placeholder={input.placeholder} 
                                    onChange={handleInput} />
                                </div>
                            ))}
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProject
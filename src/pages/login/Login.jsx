import React from 'react';
import { useContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./login.scss"
import {AuthContext} from "../../context/AuthContext"

const Login = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e)=>{
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch({type:"LOGIN", payload: user})
            navigate("/") 
            
        })
        .catch((error) => {
            setError(true)
        });

    }
    return (
        <div className="login">
            <h1>BugTracker</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="email" 
                    onChange={e=>setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    onChange={e=>setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <span>Wrong email or password!</span>}
            </form>
    </div>
    )
}

export default Login

import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const {login}=useContext(AuthContext);
    const navigate=useNavigate();
    const handleSubmit=()=>{
        const role=login(email,password);
        if(!role){
            alert("Invalid Credentials");
            return;
        }
        navigate(
            role==="admin"?"/admin/dashboard":"customers/dashboard"

        );
    };
    return(
        <div className="login">
            <h2>Login</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}
import "./css/LoginSignup.css"
import { useRef,useState,useContext,useEffect } from "react"
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { ThemeContext } from "../App";
import React from "react";
import { PlayList } from "./PlayList";


export const Login=()=>{
    const baseURL="http://localhost:7000";

    const navigate=useNavigate();

    const userNameInput=useRef("");
    const userPasswordInput=useRef("");
    const [userData,setUserData]=useState();

    async function Login(){
        const userName=userNameInput.current.value;
        const userPassword=userPasswordInput.current.value;

        await axios.post(baseURL+"/login" , {username:userName , password:userPassword})
            .then((response)=>{
                console.log(response.data);
                setUserData(response.data._id)
            }).catch((err)=>{
                console.log(err);
            })
    }


    if(userData!="user doesnt exist" && userData!="wrong username or password"){
        window.localStorage.setItem("user",userData);
        navigate("/home");
    }

    return(
        <div className="signup-container">
            <div className="signup">
                <p className="signup-desc">Username:</p>
                <input placeholder="Username" ref={userNameInput}/>
                <p className="signup-desc">Password:</p>
                <input placeholder="Password" ref={userPasswordInput}/>

                <div className="signup-button-container">
                    <button className="signup-button" onClick={Login}>Log In</button>
                </div>
                {/* <p className="signup-desc">{userData}</p> */}
            </div>
        </div>
    )
}
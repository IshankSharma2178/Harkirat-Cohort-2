import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
import axios from "axios"
import Heading from '../controllers/Heading';
import SubHeading from '../controllers/SubHeading';
import InputBox from '../controllers/InputBox';
import Button from '../controllers/Button';
import BottomWarning from '../controllers/BottomWarning';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const authUser = async() =>{
      const user = await axios.get("http://localhost:4000/api/v1/user/isValidUser",{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(user.data) 
    if(user.data.success){
          navigate("/dashboard");
        }
    }
    if(localStorage.getItem("token")){
      authUser()
    }
  },[])

  const signUpHandler = async() =>{
    if(password === "" || firstName === ""|| lastName === ""||userName === ""){
      return toast.error("Enter all fields");
    }else{
      const response = await axios.post("http://localhost:4000/api/v1/user/signup",{userName,firstName,lastName,password});
      if(response.data.success){
        localStorage.setItem("token",response.data.token);
        toast.success("Signup Successful");
        navigate("/dashboard")
      }else{
        toast.error("Some Error occurred");
      }
    }
  }

  return (
 <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="abc@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="xyz" label={"Password"} />
        <div className="pt-4">
          <Button onClick={() => signUpHandler()} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/login"} />
      </div>
    </div>
  </div>
  )
}

export default Signup
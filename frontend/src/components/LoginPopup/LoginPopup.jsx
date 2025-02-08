import React, {  useContext, useState } from 'react';
import "./LoginPopup.css"
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";




const LoginPopup = ({setShowLogin}) => {

  const [currentState,setCurrentState] = useState("Sign Up");
   // backend integration start from here
  const {url,setToken} = useContext(StoreContext);
 
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const onLogin = async(event)=>{
      event.preventDefault()
      //call api install axios package first 
      let newUrl = url;
      if (currentState === 'Login') {
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }
      const response = await axios.post(newUrl,data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);

      }
      else{
        alert(response.data.message)
      }
  }


  //end here

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
          {/*  here in login page we don't need your name input field that's why if curreent state is login then don't show input field */}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        {/* here currentState is sign Up so then sign Up form will open but if curentState is is not equal to sign up then login page will open this only not change the button name but also change the form  because in h2 tag we assigning currentSatate */}
        <button type='submit'>{currentState === "Sign Up" ? "Create account"  : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {/* Create a new account ? here "?" is a text don't get confuse suddenly when you see */}
        {
          currentState === "Login" ?
          <p>Create a new account ? <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span></p>
          : <p>Already have an account ? <span onClick={()=>setCurrentState("Login")}>Login Here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup

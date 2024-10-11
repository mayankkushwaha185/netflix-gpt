import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';

const Login = () => {
    const [isSignInForm, setIsSignInForm]= useState(true);
    const [errorMessage, setErrorMessage]= useState(null)

    const email = useRef(null);
    const password = useRef(null);
    const toggleSignInForm = ()=>{
            setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = ()=>{
        // Validate Data 
        const message = checkValidData(email.current.value, password.current.value)
        // console.log(email.current.value, password.current.value);
        console.log(message);
        setErrorMessage(message);
        if (!message) return;
        
        if(!isSignInForm){
            // Sign Up Logic
            createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                
                setErrorMessage(errorCode+"-"+ errorMessage)
            });
            


        }else{
            // Sign In Logic

            signInWithEmailAndPassword(auth,email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    
                    console.log(user);
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    setErrorMessage(errorCode+"-"+ errorMessage)
                });
        }


    }

  return (
      <div>
        <Header/>
        <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg' alt='bg-img'/>
        </div>
        <form onSubmit={(e)=>{e.preventDefault()}} className=' w-1/3  absolute my-36 mx-auto right-0 left-0 p-12 bg-black rounded-lg text-white bg-opacity-80'>
        <h1 className='font-bold text-2xl py-2'>{isSignInForm ? "Sign In":"Sign Up"}</h1>
           {!isSignInForm && <input type='text' placeholder='Full Name' className='p-3 w-full rounded-md my-3 bg-gray-700 font-medium'/>}
            <input ref={email} type='text' placeholder='Email Address' className='p-3 w-full rounded-md my-3 bg-gray-700 font-medium'/>
            <input ref={password} type='password' placeholder='Password' className='p-3 rounded-md bg-gray-700 font-medium my-3 w-full'/>
           <p className='text-red-500 font-semibold '>{errorMessage}</p>
            <button className='bg-red-700 rounded-md w-full p-4 my-4'onClick={handleButtonClick} > {isSignInForm? "Sign In":"Sign Up"}</button>
            <p className='cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign in Now"}</p>
        </form>
    </div>
  )
}

export default Login
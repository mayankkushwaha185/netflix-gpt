import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm]= useState(true)

    const toggleSignInForm = ()=>{
            setIsSignInForm(!isSignInForm);
    }

  return (
      <div>
        <Header/>
        <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg' alt='bg-img'/>
        </div>
        <form className=' w-1/3  absolute my-36 mx-auto right-0 left-0 p-12 bg-black rounded-lg text-white bg-opacity-80'>
        <h1 className='font-bold text-2xl py-2'>{isSignInForm ? "Sign In":"Sign Up"}</h1>
           {!isSignInForm && <input type='text' placeholder='Full Name' className='p-3 w-full rounded-md my-3 bg-gray-700 font-medium'/>}
            <input type='text' placeholder='Email Address' className='p-3 w-full rounded-md my-3 bg-gray-700 font-medium'/>
            <input type='password' placeholder='Password' className='p-3 rounded-md bg-gray-700 font-medium my-3 w-full'/>
            <button className='bg-red-700 rounded-md w-full p-4 my-4'> {isSignInForm? "Sign In":"Sign Up"}</button>
            <p className='cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign in Now"}</p>
        </form>
    </div>
  )
}

export default Login
import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { BACK_G_IMG, IMG_URL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); 
  const dispatch = useDispatch()

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // Validate Data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message); // Display the validation error message
    if (message) return; // Early return if there is a validation error

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: IMG_URL
          }).then(() => {
            name.current.value = '';
            email.current.value = '';
            password.current.value = '';
                const  { uid, email, displayName, photoURL } = auth.currentUser;
                    dispatch(addUser({ uid:uid, email:email, displayName:displayName, photoURL:photoURL })
                    )
            navigate("/browse")
            
          }).catch((error) => {
            setErrorMessage(error.message)
          });
         
          navigate('/browse'); // 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage); // Show error message
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Reset form fields after successful login
            email.current.value = '';
            password.current.value = '';
        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage); // Show error message
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BACK_G_IMG}
          alt="bg-img"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" w-1/3  absolute my-36 mx-auto right-0 left-0 p-12 bg-black rounded-lg text-white bg-opacity-80"
      >
        <h1 className="font-bold text-2xl py-2">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && (
          <input
          ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 w-full rounded-md my-3 bg-gray-700 font-medium"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 w-full rounded-md my-3 bg-gray-700 font-medium"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 rounded-md bg-gray-700 font-medium my-3 w-full"
        />
        <p className="text-red-500 font-semibold ">{errorMessage}</p>
        <button
          className="bg-red-700 rounded-md w-full p-4 my-4"
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? 'New to Netflix? Sign Up Now' : 'Already registered? Sign in Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;

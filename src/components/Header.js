import React, { useEffect } from 'react';
import { IMG_URL } from '../utils/Constant';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate();
    const user = useSelector(store =>store.user)
    const dispatch=useDispatch()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error'); 
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch (addUser ({ uid, email, displayName, photoURL }));
        
        navigate("/browse")
      } else {
        dispatch(removeUser ());
        navigate("/")
      }
    });

    // Cleanup the onAuthStateChanged listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between items-center absolute z-10 px-44 py-8 w-screen bg-gradient-to-b from-black">
      <img
        className="w-52"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix logo"
      />
      {user && <div className="flex">
        <img className="h-9" src={user?.photoURL} alt="User Avatar" />
        <button
          onClick={handleSignOut}
          className="border border-red-600 cursor-pointer px-2 mx-2 text-center text-white font-semibold"
        >
          Sign Out
        </button>
      </div>
  }  </div>
  );
};

export default Header;

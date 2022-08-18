import React, { useEffect } from "react"; 
import { auth } from "../Firebase";
const Header = () => { 

  const signOut = () => { 
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('signed out')
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
  
  useEffect(() => { 
    document.querySelector('.logOutBtn').addEventListener('click', signOut);
    return () => { 
      document.querySelector('.logOutBtn').removeEventListener('click', signOut)
    }
  }, [])

  return ( 
    <div className="header">
      <p>WALDO</p>
      <button className="logOutBtn">LOG OUT</button>
    </div>
  )
  
}; 

export default Header;
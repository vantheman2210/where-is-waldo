import React, { useEffect } from "react"; 
import { auth } from "../Firebase";
const Header = () => { 

  const signOut = () => { 
    auth.signOut();
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
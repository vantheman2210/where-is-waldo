import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { getDocs, collection } from "firebase/firestore";

const Leaderboard = () => { 

  const [leaderboard, setLeaderboard] = useState([]);

  const getItemCoords = async () => {
		const data = await getDocs(collection(db, 'leaderboard'));
		const items = data.docs.map((doc) => (doc = doc.data()));
		setLeaderboard(items)
	};
  
  

  useEffect(() => { 
    const check = async() => { 
      await getItemCoords();
    }
    check()
   console.log(leaderboard)
    
  }, [])
  

  return (
    <div className="leaderboard-container">
      { }
    </div>
  )
};

export default Leaderboard;
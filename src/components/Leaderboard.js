import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { getDocs, collection } from "firebase/firestore";

const Leaderboard = () => { 

  const [leaderboard, setLeaderboard] = useState([]);

  const getItemCoords = async () => {
		const data = await getDocs(collection(db, 'leaderboard'));
		const items = data.docs.map((doc) => (doc = doc.data()));
		return items;
	};
  
  

  useEffect(() => { 
    const check = async() => { 
      setLeaderboard(await getItemCoords())
    }
     check()
   console.log(leaderboard)
    
  }, [])
  

  return (
    <div className="leaderboard-container">
      {leaderboard.map((player, i) => { 
        return (
          <p key={i}>{player.name}: {player.time}</p>
        )
      })}
    </div>
  )
};

export default Leaderboard;
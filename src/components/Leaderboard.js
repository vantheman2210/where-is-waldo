import React, { useEffect } from "react";
import { db } from "../Firebase";
import { getDocs, collection } from "firebase/firestore";

const Leaderboard = () => { 

  const getItemCoords = async () => {
		const data = await getDocs(collection(db, 'items'));
		const items = data.docs.map((doc) => (doc = doc.data()));
		return items;
	};

  console.log(getItemCoords());

  return (
    <div className="leaderboard-container">
      { }
    </div>
  )
};

export default Leaderboard;
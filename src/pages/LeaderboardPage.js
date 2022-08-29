import React from "react"; 
import Leaderboard from "../components/Leaderboard";
import { Link } from "react-router-dom";

const LeaderboardPage = () => { 
  return ( 
    <div> 
      <Link>
      <p>Return</p>
      </Link>
      <Leaderboard />
    </div>
  )
}

export default LeaderboardPage;
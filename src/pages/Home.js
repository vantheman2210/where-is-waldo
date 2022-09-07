import React from "react"; 
import '../styles/Home.css'

const Home = () => { 

  const chooseLevel = (e) => {
    console.log(e.currentTarget)
  }
  return (
    <div className="homeContainer">
      <div className="card" onClick={chooseLevel}><img className="easy" src={require('../images/backgroundEasy.jpg')} alt="game" /></div> 
      <div className="card" onClick={chooseLevel}><img className="medium" src={require('../images/backgroundMedium.png')} alt="game" /></div> 
      <div className="card" onClick={chooseLevel}><img className="hard" src={require('../images/backgroundHard.jpg')} alt="game" /></div>
    </div>
  )
}

export default Home;

/*
  <img className="photo" onClick={onClick} src={require('../images/background.png')} alt="game" />
*/
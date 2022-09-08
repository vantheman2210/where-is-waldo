import React, { useState } from 'react';
import '../styles/Home.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [ level, setLevel ] = useState();
	const chooseLevel = (e) => {
		setLevel(e.currentTarget.firstChild.className);
	};

	return (
		<div className="homeContainer">
			<Link to="/gameboard" state={{ level: 'Easy' }}>
				<div className="card" id="cardEasy" onClick={chooseLevel}>
					<img className="easy" src={require('../images/backgroundEasy.jpg')} alt="game" />
				</div>
			</Link>

			<Link to="/gameboard" state={{ level: 'Medium' }}>
				<div className="card" id="cardMedium" onClick={chooseLevel}>
					<img className="medium" src={require('../images/backgroundMedium.jpg')} alt="game" />
				</div>
			</Link>
			<Link to="/gameboard" state={{ level: 'Hard' }}>
				<div className="card" id="cardHard" onClick={chooseLevel}>
					<img className="hard" src={require('../images/backgroundHard.jpg')} alt="game" />
				</div>
			</Link>
		</div>
	);
};

export default Home;

/*
  <img className="photo" onClick={onClick} src={require('../images/background.png')} alt="game" />
*/

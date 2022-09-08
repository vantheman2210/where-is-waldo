import React, { useState } from 'react';
import '../styles/Home.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [ level, setLevel ] = useState();
	const chooseLevel = (e) => {
		setLevel(e.currentTarget.firstChild.className);
	};
	useEffect(
		() => {
			console.log(level);
		},
		[ level ]
	);
	return (
		<div className="homeContainer">
			<Link to="/gameboard" state={{ level: "easy" }}>
				<div className="card" onClick={chooseLevel}>
					<img className="easy" src={require('../images/backgroundEasy.jpg')} alt="game" />
				</div>
			</Link>

			<Link to="/gameboard" state={{ level: "medium" }}>
				<div className="card" onClick={chooseLevel} value="medium">
					<img className="medium" src={require('../images/backgroundMedium.png')} alt="game" />
				</div>
			</Link>
			<Link to="/gameboard" state={{ level: "hard" }}>
				<div className="card" onClick={chooseLevel}>
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

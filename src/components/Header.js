import React, { useEffect } from 'react';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';
const Header = () => {
	const signOut = () => {
		auth.signOut();
	};

	useEffect(() => {
		document.querySelector('.logOutBtn').addEventListener('click', signOut);
		return () => {
			document.querySelector('.logOutBtn').removeEventListener('click', signOut);
		};
	}, []);

	const modalToggle = () => {
		if (!document.querySelector('.modal-container').classList.contains('modal-container-hide')) {
			document.querySelector('.modal-container').classList.toggle('modal-container-hide');
		}
		return;
	};

	return (
		<div className="header">
			<p>WALDO</p>
			<button className="logOutBtn">LOG OUT</button>
			<Link to="/leaderboard" onClick={modalToggle}>
				<p>Leaderboard</p>
			</Link>
		</div>
	);
};

export default Header;

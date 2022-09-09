import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
	const [ leaderboard, setLeaderboard ] = useState([]);

	const getItemCoords = async () => {
		const data = await getDocs(collection(db, 'leaderboard'));
		const items = data.docs.map((doc) => (doc = doc.data()));
		return items;
	};

	useEffect(() => {
		const check = async () => {
			setLeaderboard(await getItemCoords());
		};
		check();
		console.log(leaderboard);
	}, []);

	const modalToggle = () => {
		if (!document.querySelector('.modal-container').classList.contains('modal-container-hide')) {
			document.querySelector('.modal-container').classList.toggle('modal-container-hide');
		}
		return;
	};

	return (
		<div className="leaderboard-container">
			<Link to="/" onClick={modalToggle}>
				<button className='return'>Return</button>
			</Link>

			{leaderboard.map((player, i) => {
				return (
					<p key={i}>
						{player.name}: {`${Number(player.time).toFixed(2)} seconds`}
					</p>
				);
			})}
		</div>
	);
};

export default Leaderboard;

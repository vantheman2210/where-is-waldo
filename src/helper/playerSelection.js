const playerSelectionHandler = (coord1, coord2) => {
	return (
		coord1 === coord2 ||
		coord1 + 1 === coord2 ||
		coord1 + 2 === coord2 ||
		coord1 - 1 === coord2 ||
		coord1 - 2 === coord2 
	);
};

export default playerSelectionHandler;

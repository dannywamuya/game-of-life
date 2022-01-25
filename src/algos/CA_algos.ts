interface argTypes {
	i: number;
	k: number;
	numRows: number;
	grid: number[][];
	gridCopy?: number[][];
}

const computeNeighbors = ({ i, k, numRows, grid }: argTypes) => {
	const operations = [
		[0, 1],
		[0, -1],
		[1, -1],
		[-1, 1],
		[1, 1],
		[-1, -1],
		[1, 0],
		[-1, 0],
	];

	let neighbors = 0;
	const numCols = numRows * 2;

	operations.forEach(([x, y]) => {
		const newI = i + x;
		const newK = k + y;
		if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
			if (grid[newI][newK] === 1) neighbors += grid[newI][newK];
		}
	});
	return neighbors;
};

export const conways = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (grid[i][k] === 0 && neighbors === 3) {
		gridCopy![i][k] = 1;
	} else if (neighbors !== 2 && neighbors !== 3) {
		gridCopy![i][k] = 0;
	}
};

export const seeds = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (neighbors === 2) {
		gridCopy![i][k] = 1;
	} else {
		gridCopy![i][k] = 0;
	}
};

export const _2x2 = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (neighbors === 3 || neighbors === 6) {
		gridCopy![i][k] = 1;
	} else if (neighbors !== 1 && neighbors !== 2 && neighbors !== 5) {
		gridCopy![i][k] = 0;
	}
};

export const replicator = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (
		neighbors === 1 ||
		neighbors === 3 ||
		neighbors === 5 ||
		neighbors === 7
	) {
		gridCopy![i][k] = 1;
	} else if (
		neighbors !== 1 &&
		neighbors !== 3 &&
		neighbors !== 5 &&
		neighbors !== 7
	) {
		gridCopy![i][k] = 0;
	}
};

export const highlife = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (neighbors === 3 || neighbors === 6) {
		gridCopy![i][k] = 1;
	} else if (neighbors !== 2 && neighbors !== 3) {
		gridCopy![i][k] = 0;
	}
};

export const lifeWithoutDeath = ({
	i,
	k,
	numRows,
	grid,
	gridCopy,
}: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (neighbors === 3) {
		gridCopy![i][k] = 1;
	}
};

export const dayAndNight = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (
		neighbors === 3 ||
		neighbors === 6 ||
		neighbors === 7 ||
		neighbors === 8
	) {
		gridCopy![i][k] = 1;
	} else if (
		neighbors !== 3 &&
		neighbors !== 4 &&
		neighbors !== 6 &&
		neighbors !== 7 &&
		neighbors !== 8
	) {
		gridCopy![i][k] = 0;
	}
};

export const morley = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (neighbors === 3 || neighbors === 6 || neighbors === 8) {
		gridCopy![i][k] = 1;
	} else if (neighbors !== 2 && neighbors !== 4 && neighbors !== 5) {
		gridCopy![i][k] = 0;
	}
};

export const anneal = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (
		neighbors === 4 ||
		neighbors === 6 ||
		neighbors === 7 ||
		neighbors === 8
	) {
		gridCopy![i][k] = 1;
	} else if (
		neighbors !== 3 &&
		neighbors !== 5 &&
		neighbors !== 6 &&
		neighbors !== 7 &&
		neighbors !== 8
	) {
		gridCopy![i][k] = 0;
	}
};

export const diamoeba = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (
		neighbors === 3 ||
		neighbors === 5 ||
		neighbors === 6 ||
		neighbors === 7 ||
		neighbors === 8
	) {
		gridCopy![i][k] = 1;
	} else if (
		neighbors !== 5 &&
		neighbors !== 6 &&
		neighbors !== 7 &&
		neighbors !== 8
	) {
		gridCopy![i][k] = 0;
	}
};

export const _34Life = ({ i, k, numRows, grid, gridCopy }: argTypes) => {
	let neighbors = computeNeighbors({ i, k, numRows, grid });

	if (neighbors === 3 || neighbors === 4) {
		gridCopy![i][k] = 1;
	} else if (neighbors !== 3 && neighbors !== 4) {
		gridCopy![i][k] = 0;
	}
};

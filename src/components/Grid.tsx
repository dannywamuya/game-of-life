import produce from 'immer';
import { useCallback, useRef, useState } from 'react';
import {
	anneal,
	conways,
	dayAndNight,
	diamoeba,
	highlife,
	lifeWithoutDeath,
	morley,
	replicator,
	seeds,
	_2x2,
	_34Life,
} from '../algos/CA_algos';
import Cell from './Cell';
import GridSettings from './GridSettings';

const numRows = 45;
const numCols = numRows * 2;

interface GridProps {
	numRows: number;
	numCols: number;
}

const gridStyles = (numCols: number) => {
	return {
		display: 'grid',
		gridTemplateColumns: `repeat(${numCols}, 11px)`,
		margin: 20,
	};
};

const generateEmptyGrid = ({ numRows, numCols }: GridProps) => {
	const grid = [];
	for (let i = 0; i < numRows; i++) {
		grid.push(Array.from(Array(numCols), () => 0));
	}
	return grid;
};

const Grid = () => {
	const [drawing, setDrawing] = useState(false);
	const speedRef = useRef(0);
	const [running, setRunning] = useState(false);
	const runningRef = useRef(running);
	runningRef.current = running;
	const [algo, setAlgo] = useState(0);

	// Generate a random grid with a randomize factor x to determine grid population density
	const randomizeGrid = (x = 0.6) => {
		const grid: number[][] = [];
		for (let i = 0; i < numRows; i++) {
			grid.push(Array.from(Array(numCols), () => (Math.random() > x ? 1 : 0)));
		}
		return grid;
	};

	const [grid, setGrid] = useState(randomizeGrid());

	// Fill grid with empty cells
	const clearGrid = useCallback(() => {
		setGrid(generateEmptyGrid({ numRows, numCols }));
	}, []);

	// Randomize grid on factor change
	const onFactorChange = useCallback((factor: number) => {
		setGrid(randomizeGrid(factor));
	}, []);

	// Toggle a cell on click
	const handleCellClick = useCallback(
		(i: number, k: number) => {
			setRunning(false);
			const newGrid = produce(grid, (gridCopy) => {
				gridCopy[i][k] = grid[i][k] ? 0 : 1;
			});
			setGrid(newGrid);
		},
		[grid]
	);

	// Simulation
	const runSimulation = useCallback(() => {
		if (!runningRef.current) {
			return;
		}

		let algorithms: Function[] = [
			conways,
			replicator,
			seeds,
			_2x2,
			highlife,
			lifeWithoutDeath,
			dayAndNight,
			morley,
			anneal,
			diamoeba,
			_34Life,
		];

		setGrid((g) => {
			return produce(g, (gridCopy) => {
				for (let i = 0; i < numRows; i++) {
					for (let k = 0; k < numCols; k++) {
						algorithms[algo]({
							i,
							k,
							numRows,
							numCols,
							grid: g,
							gridCopy,
						});
					}
				}
			});
		});

		setTimeout(runSimulation, speedRef.current);
	}, [algo]);

	// Toggle running and start simulation
	const toggleRunning = useCallback(
		(simSpeed = 0) => {
			speedRef.current = simSpeed;
			setRunning(!running);
			if (!running) {
				runningRef.current = true;
				runSimulation();
			}
		},
		[runSimulation, running]
	);

	// Select algorithm to sim
	const onAlgoChange = useCallback((idx: number) => {
		setAlgo(idx);
	}, []);

	// Start simulation on 'SpaceBar' press
	window.onkeypress = (e) => {
		if (e.key === ' ' || e.code === 'Space') {
			e.preventDefault();
			toggleRunning();
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				gap: 25,
				alignItems: 'center',
			}}
			onMouseDown={() => setDrawing(!drawing)}
			onMouseUp={() => setDrawing(!drawing)}>
			<GridSettings
				running={running}
				toggleRunning={toggleRunning}
				clearGrid={clearGrid}
				onFactorChange={onFactorChange}
				onAlgoChange={onAlgoChange}
			/>
			<div style={gridStyles(numCols)}>
				{grid.map((rows, i) =>
					rows.map((col, k) => (
						<Cell
							key={`${i}~${k}`}
							k={k}
							i={i}
							handleCellClick={handleCellClick}
							value={grid[i][k]}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Grid;

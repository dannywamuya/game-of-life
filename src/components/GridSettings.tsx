import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Slider,
} from '@mui/material';
import React, { useState } from 'react';

interface GridSettingsProps {
	running: boolean;
	toggleRunning: (simSpeed: number) => void;
	clearGrid: () => void;
	onFactorChange: (factor: number) => void;
	onAlgoChange: (idx: number) => void;
}

const GridSettings = React.memo(
	({
		running,
		toggleRunning,
		clearGrid,
		onFactorChange,
		onAlgoChange,
	}: GridSettingsProps) => {
		const [factor, setFactor] = useState(0.6);
		const [simSpeed, setSimSpeed] = useState(0);
		const [algo, setAlgo] = useState(0);

		const speedMarks = [
			{ label: '🚀', value: 0 },
			{ label: '🐢', value: 1000 },
		];

		const factorMarks = [
			{ label: 'more', value: 0.1 },
			{ label: 'less', value: 0.9 },
		];

		function handleSlider(
			event: any | Event | React.SyntheticEvent<Element, Event>,
			value: number | number[]
		) {
			const name = event!.target.name;

			if (name === 'factor') {
				if (typeof value == 'number') {
					setFactor(value);
					return;
				}
				setFactor(value[0]);
			} else if (name === 'speed') {
				if (typeof value == 'number') {
					setSimSpeed(value);
					return;
				}
				setSimSpeed(value[0]);
			}
		}

		const handleAlgoChange = (e: any) => {
			const idx = Number(e.target.value);
			onAlgoChange(idx);
			setAlgo(idx);
		};

		return (
			<div
				style={{
					display: 'flex',
					gap: '25px',
					alignItems: 'center',
					flexDirection: 'column',
				}}>
				<Button
					fullWidth
					variant='outlined'
					onClick={() => toggleRunning(simSpeed)}>
					{running ? 'Stop' : 'Start'}
				</Button>
				<p style={{ marginTop: 30, marginBottom: 0 }}>Sim Speed</p>
				<Box width={100}>
					<Slider
						size='small'
						aria-label='Small'
						defaultValue={0}
						color='secondary'
						valueLabelDisplay='auto'
						step={100}
						max={1000}
						min={0}
						onChange={handleSlider}
						marks={speedMarks}
						disabled={running}
						name={'speed'}
					/>
				</Box>
				<Button
					fullWidth
					variant='outlined'
					disabled={running}
					onClick={clearGrid}>
					Clear
				</Button>
				<Button
					fullWidth
					variant='outlined'
					disabled={running}
					onClick={() => onFactorChange(factor)}>
					Spawn
				</Button>
				<p style={{ marginTop: 30, marginBottom: 0 }}>Spawn Factor</p>
				<Box width={100}>
					<Slider
						size='small'
						aria-label='Small'
						defaultValue={0.6}
						color='secondary'
						valueLabelDisplay='auto'
						step={0.1}
						max={0.9}
						min={0.1}
						onChange={handleSlider}
						marks={factorMarks}
						disabled={running}
						name={'factor'}
					/>
				</Box>
				<div style={{ width: '100%', textAlign: 'center' }}>
					<FormControl fullWidth disabled={running}>
						<InputLabel id='demo-simple-select-label'>Algorithm</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={algo}
							label='Algorithm'
							autoWidth
							onChange={handleAlgoChange}>
							<MenuItem value={0}>Conways GOL</MenuItem>
							<MenuItem value={1}>Replicator</MenuItem>
							<MenuItem value={2}>Seeds</MenuItem>
							<MenuItem value={3}>2X2</MenuItem>
							<MenuItem value={4}>Highlife</MenuItem>
							<MenuItem value={5}>Life Without Death</MenuItem>
							<MenuItem value={6}>Day 'n Night</MenuItem>
							<MenuItem value={7}>Morley</MenuItem>
							<MenuItem value={8}>Anneal</MenuItem>
							<MenuItem value={9}>Diamoeba</MenuItem>
							<MenuItem value={10}>34 Life</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
		);
	}
);

export default GridSettings;

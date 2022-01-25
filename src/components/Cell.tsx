interface CellProps {
	k: number;
	i: number;
	handleCellClick: (i: number, k: number) => void;
	value: number;
}

const Cell = ({ k, i, handleCellClick, value }: CellProps): any => {
	return (
		<div
			onClick={() => handleCellClick(i, k)}
			style={{
				width: 7.5,
				height: 7.5,
				backgroundColor: value ? '#2a9d8f' : undefined,
				border: 'solid 1px gray',
				marginBottom: '3px',
				borderRadius: '15px',
			}}></div>
	);
};

export default Cell;

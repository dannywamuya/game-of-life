import './App.css';
import Grid from '../src/components/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		secondary: {
			main: '#2a9d8f',
		},
		mode: 'dark',
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					height: '100vh',
				}}>
				<Grid />
			</div>
		</ThemeProvider>
	);
}

export default App;

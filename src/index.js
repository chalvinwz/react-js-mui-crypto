import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CryptoContext from './CryptoContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		text: {
			primary: '#f3f6f9',
		},
		background: {
			default: '#14161a',
		},
	},
	components: {
		MuiAppBar: {
			defaultProps: {
				enableColorOnDark: true,
			},
		},
	},
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<QueryClientProvider client={queryClient}>
				<CryptoContext>
					<CssBaseline />
					<App />
					<ReactQueryDevtools />
				</CryptoContext>
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

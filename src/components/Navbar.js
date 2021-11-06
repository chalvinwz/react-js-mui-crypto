import { useNavigate } from 'react-router-dom';
import { useCryptoState } from '../CryptoContext';

import {
	AppBar,
	Toolbar,
	Typography,
	FormControl,
	Select,
	MenuItem,
	Box,
} from '@mui/material';

const Navbar = () => {
	const { currency, setCurrency } = useCryptoState();

	const navigate = useNavigate();

	return (
		<AppBar
			position='sticky'
			color='inherit'
			sx={{ borderBottom: 0.5, borderColor: 'divider' }}
		>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography
					variant='h6'
					components='h1'
					sx={{ fontWeight: 'bold', cursor: 'pointer' }}
					onClick={() => navigate('/')}
				>
					Crypto Market
				</Typography>
				<Box sx={{ minWidth: 100 }}>
					<FormControl fullWidth size='small'>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={currency}
							onChange={(e) => setCurrency(e.target.value)}
						>
							<MenuItem value={'usd'}>USD</MenuItem>
							<MenuItem value={'idr'}>IDR</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

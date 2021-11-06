import { useState } from 'react';
import axios from 'axios';
import { useCryptoState } from '../../CryptoContext';
import { CoinList } from '../../utils/api';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils/helper';
import LoadingSkeleton from '../LoadingSkeleton';

import {
	Container,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	Chip,
	Pagination,
} from '@mui/material';

const CoinsTable = () => {
	const { currency, symbol } = useCryptoState();
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const fetchCoins = async (currency, page) => {
		try {
			const { data } = await axios.get(CoinList(currency, page));
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const { data, isLoading } = useQuery(
		['listCoins', currency, page],
		() => fetchCoins(currency, page),
		{ refetchInterval: 10000, staleTime: 3000 }
	);

	const searchResult = data?.filter((coin) => {
		return (
			coin.name.toLowerCase().includes(searchTerm) ||
			coin.symbol.toLowerCase().includes(searchTerm)
		);
	});

	return (
		<Container maxWidth='lg' sx={{ textAlign: 'center' }}>
			<Typography
				component='h1'
				gutterBottom
				mt={{ xs: 2, sm: 3 }}
				sx={{ fontWeight: 'bold', fontSize: { xs: 18, sm: 24 } }}
			>
				Crypto Currency Prices by Market Cap
			</Typography>

			<TextField
				placeholder='Search For a Crypto Currency...'
				variant='outlined'
				fullWidth
				size='small'
				sx={{ mb: 2 }}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{isLoading ? (
				<LoadingSkeleton />
			) : (
				<TableContainer>
					<Table>
						<TableHead sx={{ bgcolor: 'grey.A700' }}>
							<TableRow>
								<TableCell>Coin</TableCell>
								<TableCell align='right'>Price</TableCell>
								<TableCell align='right'>24h Change</TableCell>
								<TableCell align='right'>Market Cap</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{searchResult.map((coin) => {
								const profit = coin.price_change_percentage_24h > 0;

								return (
									<TableRow
										key={coin.id}
										onClick={() => navigate(`/coins/${coin.id}`)}
										hover={true}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell>
											<Stack direction='row' alignItems='center' spacing={2}>
												<img src={coin.image} alt={coin.name} height='50' />
												<Stack>
													<Chip
														label={coin.symbol}
														size='small'
														sx={{
															textTransform: 'uppercase',
														}}
													/>
													<Typography variant='subtitle2'>
														{coin.name}
													</Typography>
												</Stack>
											</Stack>
										</TableCell>
										<TableCell align='right'>
											{symbol}
											{convertPrice(coin.current_price.toFixed(2))}
										</TableCell>
										<TableCell
											align='right'
											sx={{ color: profit ? 'success.main' : 'error.main' }}
										>
											{profit && '+'}
											{coin.price_change_percentage_24h.toFixed(2)}%
										</TableCell>
										<TableCell align='right'>
											{symbol}
											{convertPrice(coin.market_cap.toString().slice(0, -6))}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<Pagination
				count={100}
				onChange={(_, value) => {
					setPage(value);
					window.scroll(0, 450);
				}}
				sx={{ display: 'flex', justifyContent: 'center', my: 3 }}
			/>
		</Container>
	);
};

export default CoinsTable;

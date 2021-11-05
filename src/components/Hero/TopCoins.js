import { useCryptoState } from '../../CryptoContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../utils/api';
import { convertPrice } from '../../utils/helper';

import LoadingSkeleton from '../LoadingSkeleton';

import { styled } from '@mui/material/styles';
import { Box, Chip, Stack, Typography } from '@mui/material';

const Image = styled(`img`)(({ theme }) => ({
	height: 70,
	marginLeft: theme.spacing(5),
	marginRight: theme.spacing(5),
}));

const Carousel = () => {
	const { currency, symbol } = useCryptoState();

	const fetchTrendingCoins = async (currency) => {
		try {
			const { data } = await axios.get(TrendingCoins(currency));
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const { data, isLoading } = useQuery(
		['trendingCoins', currency],
		() => fetchTrendingCoins(currency),
		{ refetchInterval: 10000, staleTime: 3000 }
	);

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	return (
		<Box
			sx={{
				height: '50%',
				display: { xs: 'none', md: 'flex' },
				alignItems: 'center',
			}}
		>
			{data?.map((coin) => {
				const profit = coin.price_change_percentage_24h > 0;

				return (
					<Link
						to={`/coins/${coin.id}`}
						key={coin.id}
						style={{ textDecoration: 'none', color: 'white' }}
					>
						<Stack alignItems='center'>
							<Image src={coin.image} alt={coin.name} />
							<Stack direction='row' alignItems='center' my={0.5}>
								<Chip
									label={coin.symbol}
									variant='filled'
									color='success'
									size='small'
									sx={{ textTransform: 'uppercase' }}
									component='span'
								/>
								<Typography
									variant='caption'
									component='span'
									ml={1}
									sx={{ color: profit ? 'success.main' : 'error.main' }}
								>
									{profit && '+'}
									{coin.price_change_percentage_24h.toFixed(2)}%
								</Typography>
							</Stack>
							<Typography variant='subtitle1' component='span' gutterBottom>
								{symbol}
								{convertPrice(coin.current_price.toFixed(2))}
							</Typography>
						</Stack>
					</Link>
				);
			})}
		</Box>
	);
};

export default Carousel;

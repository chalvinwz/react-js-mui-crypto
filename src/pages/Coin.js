import { useParams } from 'react-router-dom';
import { useCryptoState } from '../CryptoContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { SingleCoin } from '../utils/api';
import ReactHtmlParser from 'react-html-parser';

import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
import CoinInfo from '../components/CoinInfo';
import { convertPrice } from '../utils/helper';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Coin = () => {
	const { currency, symbol } = useCryptoState();

	const { id } = useParams();

	const fetchCoin = async (id) => {
		try {
			const { data } = await axios.get(SingleCoin(id));
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const { data, isLoading, isError } = useQuery(
		['singleCoin', id, currency],
		() => fetchCoin(id)
	);

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	if (isError) <div>Error</div>;

	return (
		<Container maxWidth='xl'>
			<Grid container direction={{ xs: 'column', md: 'row' }} spacing={4}>
				<Grid item xs={12} lg={4}>
					<Stack mt={4} spacing={1} alignItems='center'>
						<img src={data?.image.large} alt={data?.name} height={180} />
						<Typography
							variant='h4'
							component='h1'
							gutterBottom
							sx={{ fontWeight: 'bold' }}
						>
							{data?.name}
						</Typography>
						<Typography variant='subtitle1' gutterBottom>
							{ReactHtmlParser(data?.description.en.split('. ')[0])}
						</Typography>
						<Stack sx={{ width: '100%' }} spacing={2}>
							<Stack
								direction='row'
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography variant='h5' sx={{ fontWeight: 'bold' }}>
									Rank:
								</Typography>
								<Typography variant='h6'>{data?.market_cap_rank}</Typography>
							</Stack>
							<Divider />
							<Stack
								direction='row'
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography variant='h5' sx={{ fontWeight: 'bold' }}>
									Current price:
								</Typography>
								<Typography variant='h6'>
									{symbol}
									{convertPrice(
										data?.market_data.current_price[currency.toLowerCase()]
									)}
								</Typography>
							</Stack>
							<Divider />
							<Stack
								direction='row'
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography variant='h5' sx={{ fontWeight: 'bold' }}>
									Market Cap:
								</Typography>
								<Typography variant='h6'>
									{symbol}
									{convertPrice(
										data?.market_data.market_cap[currency.toLowerCase()]
									)}
								</Typography>
							</Stack>
							<Divider />
						</Stack>
					</Stack>
				</Grid>
				<Grid
					item
					xs={12}
					lg={8}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					<CoinInfo coin={data} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Coin;

import { useCryptoState } from '../CryptoContext';
import { useState } from 'react';
import axios from 'axios';
import { HistoricalChart } from '../utils/api';
import { useQuery } from 'react-query';
import LoadingSkeleton from './LoadingSkeleton';
import { Line } from 'react-chartjs-2';

import { Box } from '@mui/material';

const CoinInfo = ({ coin }) => {
	const { currency } = useCryptoState();
	const [days] = useState(1);

	const fetchHistoricalData = async (id, days, currency) => {
		try {
			const { data } = await axios.get(HistoricalChart(id, days, currency));
			return data.prices;
		} catch (err) {
			console.log(err);
		}
	};

	const {
		data: state,
		isLoading,
		isError,
	} = useQuery(['historicalChart', coin.id, currency], () =>
		fetchHistoricalData(coin.id, days, currency)
	);

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	if (isError) <div>Error</div>;

	return (
		<Box width='100%'>
			<Line
				data={{
					labels: state.map((coin) => {
						let date = new Date(coin[0]);
						let time =
							date.getHours() > 12
								? `${date.getHours() - 12} : ${date.getMinutes()} PM`
								: `${date.getHours()} : ${date.getMinutes()} AM`;
						return days === 1 ? time : date.toLocaleDateString();
					}),
					datasets: [
						{
							data: state?.map((coin) => coin[1]),
							label: `Price (Past ${days} Days) in ${currency.toUpperCase()}`,
							borderColor: 'white',
						},
					],
				}}
				options={{
					elements: {
						point: {
							radius: 1,
						},
					},
				}}
			/>
		</Box>
	);
};

export default CoinInfo;

import Carousel from './TopCoins';
import HeroImage from '../../assets/hero-image.jpeg';

import { Container, Box, Typography } from '@mui/material';

const Hero = () => {
	return (
		<Box
			sx={{
				backgroundImage: `url(${HeroImage})`,
				overflow: 'hidden',
				backgroundSize: 1920,
			}}
		>
			<Container
				maxWidth='lg'
				sx={{
					height: 400,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Box
					sx={{
						height: '40%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography
						component='h1'
						gutterBottom
						sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 'bold' }}
					>
						Crypto Market
					</Typography>
					<Typography
						component='h2'
						gutterBottom
						sx={{
							textTransform: 'capitalize',
							color: 'text.secondary',
							typography: { xs: 'caption', sm: 'subtitle2' },
						}}
					>
						Get all information about your favorite Crypto Currency
					</Typography>
				</Box>
				<Carousel />
			</Container>
		</Box>
	);
};

export default Hero;

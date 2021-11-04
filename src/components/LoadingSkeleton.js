import { Skeleton, Box } from '@mui/material';

const LoadingSkeleton = () => {
	return (
		<Box sx={{ width: '100%', display: { xs: 'none', md: 'inline-block' } }}>
			<Skeleton animation='wave' />
			<Skeleton animation='wave' />
			<Skeleton animation='wave' />
		</Box>
	);
};

export default LoadingSkeleton;

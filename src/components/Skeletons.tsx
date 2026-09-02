import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
interface SkeletonsProps {
    width: number | string;
    height: number | string;
}

function Skeletons({ width, height }: SkeletonsProps) {
    return (
        <Box
            sx={{
                width: width,
                height: height,
                overflow: 'hidden',
                position: 'relative',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.8s infinite',
                },
            }}
        >
            <Skeleton
                variant="rectangular"
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                    transform: 'none',
                }}
            />
        </Box>
    );
}

export default Skeletons;
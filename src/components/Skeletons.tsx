import Skeleton from '@mui/material/Skeleton';
interface SkeletonsProps {
    width: number | string;
    height: number | string;
}

function Skeletons({ width, height }: SkeletonsProps) {
    return (
        <Skeleton
            variant="rectangular"
            style={{
                width: width,
                height: height,
                padding: 0,
            }}
            sx={{
                bgcolor: 'rgba(255, 255, 255, 0.59)',
            }}
        />
    );
}

export default Skeletons;

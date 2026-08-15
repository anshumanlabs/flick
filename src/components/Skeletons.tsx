import Skeleton from '@mui/material/Skeleton';
interface SkeletonsProps {
    width: number | string;
    height: number | string;
}

function Skeletons({ config }: { config: SkeletonsProps }) {
    return (
        <Skeleton variant="rectangular"
            style={{ width: config.width, height: config.height }}
            sx={{
                bgcolor: "rgba(255, 255, 255, 0.59)"
            }} />
    )
}

export default Skeletons;
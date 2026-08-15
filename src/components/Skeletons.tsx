import Skeleton from '@mui/material/Skeleton';
interface SkeletonsProps{
    width:number,
    height:number,
    numberOfSkeletons:number
}

function Skeletons({ config }: { config: SkeletonsProps }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 justify-center">
            {Array.from({ length: config.numberOfSkeletons }).map((_, index) => (
                <Skeleton key={index} variant="rectangular"
                    style = {{width: config.width == 0 ? "100%" : config.width, height: config.height == 0 ? "100%" : config.height}}
                    sx={{
                        bgcolor: "rgba(255, 255, 255, 0.59)"
                    }} />
            ))}
        </div>
    )
}

export default Skeletons;
import Skeleton from '@mui/material/Skeleton';

function Skeletons({ numberOfSkeletons }: { numberOfSkeletons: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 justify-center">
            {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                <Skeleton key={index} variant="rectangular" width={210} height={250} className="bg-[#ffffff1f]" />
            ))}
        </div>
    )
}

export default Skeletons;
import type { PaginationData } from '../types/pagination';
import PaginationItem from '@mui/material/PaginationItem';

interface PaginationUIProps {
    paginationData: PaginationData;
    onPageChange: (page: number) => void;
}

function PaginationUI({ paginationData, onPageChange }: PaginationUIProps) {
    const { currentPage, totalPages } = paginationData;

    return (
        <div className="mt-3 mb-3 flex items-center justify-center">
            <PaginationItem
                type="previous"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                sx={{
                    color: '#a1a1aa',
                    borderColor: '#3f3f46',
                    backgroundColor: '#18181b',
                    minWidth: {
                        xs: '32px',
                        sm: '38px',
                        md: '44px',
                    },
                    height: {
                        xs: '32px',
                        sm: '38px',
                        md: '44px',
                    },
                    borderRadius: '10px',
                    margin: {
                        xs: '0 2px',
                        sm: '0 3px',
                        md: '0 4px',
                    },

                    '&:hover': {
                        backgroundColor: '#27272a',
                        color: '#fff',
                        borderColor: '#71717a',
                    },

                    '&.Mui-disabled': {
                        opacity: 0.4,
                    },
                }}
            />

            <PaginationItem
                type="page"
                page={currentPage}
                selected
                sx={{
                    color: '#fff',
                    borderColor: '#49c916',
                    backgroundColor: '#49c916',
                    minWidth: {
                        xs: '32px',
                        sm: '38px',
                        md: '44px',
                    },
                    height: {
                        xs: '32px',
                        sm: '38px',
                        md: '44px',
                    },
                    borderRadius: '10px',
                    margin: {
                        xs: '0 2px',
                        sm: '0 3px',
                        md: '0 4px',
                    },
                    fontSize: {
                        xs: '0.75rem',
                        sm: '0.875rem',
                        md: '1rem',
                    },
                    fontWeight: 600,
                }}
            />

            <PaginationItem
                type="next"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                sx={{
                    color: '#a1a1aa',
                    borderColor: '#3f3f46',
                    backgroundColor: '#18181b',
                    minWidth: {
                        xs: '32px',
                        sm: '38px',
                        md: '44px',
                    },
                    height: {
                        xs: '32px',
                        sm: '38px',
                        md: '44px',
                    },
                    borderRadius: '10px',
                    margin: {
                        xs: '0 2px',
                        sm: '0 3px',
                        md: '0 4px',
                    },

                    '&:hover': {
                        backgroundColor: '#27272a',
                        color: '#fff',
                        borderColor: '#71717a',
                    },

                    '&.Mui-disabled': {
                        opacity: 0.4,
                    },
                }}
            />
        </div>
    );
}

export default PaginationUI;

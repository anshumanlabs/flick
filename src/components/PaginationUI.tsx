import type { PaginationData } from '../types/pagination';
import PaginationItem from '@mui/material/PaginationItem';

interface PaginationUIProps {
    paginationData: PaginationData;
    onPageChange: (page: number) => void;
}

function PaginationUI({ paginationData, onPageChange }: PaginationUIProps) {
    const { currentPage, totalPages } = paginationData;

    const handlePageChange = (page: number) => {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-4 mb-4 flex items-center justify-center gap-1.5">
            <PaginationItem
                type="previous"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                sx={{
                    color: '#a1a1aa',
                    borderColor: '#3f3f46',
                    backgroundColor: '#18181b',
                    minWidth: {
                        xs: '42px',
                        sm: '48px',
                        md: '50px',
                    },
                    height: {
                        xs: '42px',
                        sm: '48px',
                        md: '50px',
                    },
                    borderRadius: '10px',
                    margin: {
                        xs: '0 2px',
                        sm: '0 3px',
                        md: '0 4px',
                    },
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',

                    '&:hover': {
                        backgroundColor: '#27272a',
                        color: '#fff',
                        borderColor: '#71717a',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    },

                    '&.Mui-disabled': {
                        opacity: 0.35,
                    },
                }}
            />

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                    pageNum = i + 1;
                } else if (currentPage <= 3) {
                    pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                } else {
                    pageNum = currentPage - 2 + i;
                }

                return (
                    <PaginationItem
                        key={pageNum}
                        type="page"
                        page={pageNum}
                        selected={pageNum === currentPage}
                        onClick={() => handlePageChange(pageNum)}
                        sx={{
                            color: pageNum === currentPage ? '#000' : '#a1a1aa',
                            borderColor: pageNum === currentPage ? '#49c916' : '#3f3f46',
                            backgroundColor: pageNum === currentPage ? '#49c916' : '#18181b',
                            minWidth: {
                                xs: '36px',
                                sm: '40px',
                                md: '44px',
                            },
                            height: {
                                xs: '36px',
                                sm: '40px',
                                md: '44px',
                            },
                            borderRadius: '10px',
                            margin: {
                                xs: '0 2px',
                                sm: '0 3px',
                                md: '0 4px',
                            },
                            fontSize: {
                                xs: '0.95rem',
                                sm: '1.05rem',
                                md: '1.15rem',
                            },
                            fontWeight: 600,
                            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',

                            '&:hover': {
                                backgroundColor: pageNum === currentPage ? '#55df1c' : '#27272a',
                                color: pageNum === currentPage ? '#000' : '#fff',
                                borderColor: pageNum === currentPage ? '#55df1c' : '#71717a',
                                transform: 'translateY(-1px)',
                                boxShadow: pageNum === currentPage
                                    ? '0 4px 14px rgba(73, 201, 22, 0.35)'
                                    : '0 4px 12px rgba(0,0,0,0.3)',
                            },
                        }}
                    />
                );
            })}

            <PaginationItem
                type="next"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                sx={{
                    color: '#a1a1aa',
                    borderColor: '#3f3f46',
                    backgroundColor: '#18181b',
                    minWidth: {
                        xs: '42px',
                        sm: '48px',
                        md: '50px',
                    },
                    height: {
                        xs: '42px',
                        sm: '48px',
                        md: '50px',
                    },
                    borderRadius: '10px',
                    margin: {
                        xs: '0 2px',
                        sm: '0 3px',
                        md: '0 4px',
                    },
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',

                    '&:hover': {
                        backgroundColor: '#27272a',
                        color: '#fff',
                        borderColor: '#71717a',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    },

                    '&.Mui-disabled': {
                        opacity: 0.35,
                    },
                }}
            />
        </div>
    );
}

export default PaginationUI;

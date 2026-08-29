import {
    Box,
    Button,
    Drawer,
    MenuItem,
    Select,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { genreOptions, resolutionOption, sortByOption } from '../types/filterOptions';

export default function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilter, setShowFilter] = useState<boolean | null>(false);
    const [resolution, setResolution] = useState<string | null>(searchParams.get('quality') ?? '');
    const [genre, setGenre] = useState<string | null>(searchParams.get('genre') ?? '');
    const [orderBy, setOrderBy] = useState<string | null>(searchParams.get('order_by') ?? '');
    const [minimumRating, setMinimumRating] = useState<number | undefined>(
        Number(searchParams.get('minimum_rating') ?? ''),
    );
    const [sortBy, setSortBy] = useState<string | null>(searchParams.get('sort_by'));

    function applyFilter(): void {
        setSearchParams({
            page: '1',
            ...(resolution && {
                quality: resolution,
            }),
            ...(minimumRating !== undefined && {
                minimum_rating: String(minimumRating),
            }),
            ...(genre && {
                genre,
            }),
            ...(orderBy && {
                order_by: orderBy,
            }),
            ...(sortBy && {
                sort_by: sortBy,
            }),
        });
        setShowFilter(false);
    }

    function clearFilter(): void {
        setSearchParams({
            page: '1',
        });
        setResolution('');
        setGenre('');
        setOrderBy('');
        setMinimumRating(undefined);
        setSortBy('');
    }

    return (
        <>
            {!showFilter && (
                <Button
                    sx={{
                        color: '#a1a1aa',
                        border: '1px solid #3f3f46',
                        borderRadius: 2,
                        px: 2.5,
                        py: 1,
                        fontSize: 14,
                        fontWeight: 500,
                        transition: 'all 0.25s ease',
                        '&:hover': {
                            backgroundColor: '#1a1a1c',
                            color: '#fff',
                            borderColor: '#52525b',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        },
                    }}
                    onClick={() => setShowFilter(true)}
                >
                    Filter
                </Button>
            )}
            {showFilter && (
                <Drawer
                    anchor="right"
                    open={showFilter}
                    onClose={() => setShowFilter(false)}
                    slotProps={{
                        paper: {
                            sx: {
                                height: '100vh',
                                width: 380,
                                top: 0,
                                transform: 'none',
                                background: '#0c0c0d',
                                borderLeft: '1px solid #292929',
                                animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 380,
                            height: '100vh',
                            padding: 3,
                            background: 'linear-gradient(180deg, #0c0c0d 0%, #111112 100%)',
                            color: 'white',
                            overflowY: 'auto',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em' }}>
                                Filters
                            </Typography>
                            <Button
                                onClick={() => setShowFilter(false)}
                                sx={{
                                    color: '#71717a',
                                    minWidth: 'auto',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 2,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: '#fff',
                                        backgroundColor: 'rgba(255,255,255,0.06)',
                                    },
                                }}
                            >
                                ESC
                            </Button>
                        </Box>

                        <Typography variant="subtitle2" sx={{ color: '#71717a', mb: 1.5, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Genre
                        </Typography>
                        <Select
                            sx={{
                                width: '100%',
                                mb: 3,
                                color: '#f1f1f3',
                                backgroundColor: '#151516',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3f3f46',
                                    borderRadius: 2,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#52525b',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#49c916',
                                    boxShadow: '0 0 0 2px rgba(73, 201, 22, 0.12)',
                                },
                                '& .MuiSelect-icon': {
                                    color: '#71717a',
                                },
                            }}
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            {genreOptions.map((genre) => (
                                <MenuItem key={genre.value} value={genre.value} sx={{ fontSize: 14 }}>
                                    {genre.display}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography variant="subtitle2" sx={{ color: '#71717a', mb: 1.5, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Resolution
                        </Typography>
                        <Select
                            sx={{
                                width: '100%',
                                mb: 3,
                                color: '#f1f1f3',
                                backgroundColor: '#151516',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3f3f46',
                                    borderRadius: 2,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#52525b',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#49c916',
                                    boxShadow: '0 0 0 2px rgba(73, 201, 22, 0.12)',
                                },
                                '& .MuiSelect-icon': {
                                    color: '#71717a',
                                },
                            }}
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value)}
                        >
                            {resolutionOption.map((resolution) => (
                                <MenuItem key={resolution.value} value={resolution.value} sx={{ fontSize: 14 }}>
                                    {resolution.display}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography variant="subtitle2" sx={{ color: '#71717a', mb: 1.5, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Sort By
                        </Typography>
                        <Select
                            sx={{
                                width: '100%',
                                mb: 3,
                                color: '#f1f1f3',
                                backgroundColor: '#151516',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3f3f46',
                                    borderRadius: 2,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#52525b',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#49c916',
                                    boxShadow: '0 0 0 2px rgba(73, 201, 22, 0.12)',
                                },
                                '& .MuiSelect-icon': {
                                    color: '#71717a',
                                },
                            }}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            {sortByOption.map((sort) => (
                                <MenuItem key={sort.value} value={sort.value} sx={{ fontSize: 14 }}>
                                    {sort.display}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography variant="subtitle2" sx={{ color: '#71717a', mb: 1.5, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            IMDB Rating
                        </Typography>
                        <Slider
                            sx={{
                                width: '100%',
                                mb: 3,
                                color: '#49c916',
                                '& .MuiSlider-thumb': {
                                    backgroundColor: '#49c916',
                                    border: '2px solid #fff',
                                    boxShadow: '0 0 0 4px rgba(73, 201, 22, 0.2)',
                                    transition: 'box-shadow 0.2s ease',
                                    '&:hover': {
                                        boxShadow: '0 0 0 8px rgba(73, 201, 22, 0.25)',
                                    },
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: '#49c916',
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#3f3f46',
                                },
                                '& .MuiSlider-mark': {
                                    backgroundColor: '#52525b',
                                },
                                '& .MuiSlider-markLabel': {
                                    color: '#71717a',
                                },
                                '& .MuiSlider-valueLabel': {
                                    backgroundColor: '#49c916',
                                    color: '#000',
                                    fontWeight: 700,
                                },
                            }}
                            aria-label="Rating"
                            value={minimumRating}
                            onChange={(_, value) => setMinimumRating(value as number)}
                            valueLabelDisplay="auto"
                            shiftStep={1}
                            step={1}
                            marks
                            min={1}
                            max={9}
                        />

                        <Typography variant="subtitle2" sx={{ color: '#71717a', mb: 1.5, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Order
                        </Typography>
                        <ToggleButtonGroup
                            value={orderBy}
                            exclusive
                            onChange={(_, value) => setOrderBy(value)}
                            size="small"
                            sx={{
                                mb: 4,
                                '& .MuiToggleButton-root': {
                                    color: '#a1a1aa',
                                    borderColor: '#3f3f46',
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: '#fff',
                                        backgroundColor: 'rgba(255,255,255,0.04)',
                                    },
                                },
                                '& .MuiToggleButton-root.Mui-selected': {
                                    backgroundColor: '#49c916',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: '#55df1c',
                                    },
                                },
                            }}
                        >
                            <ToggleButton value="asc">ASC</ToggleButton>
                            <ToggleButton value="desc">DESC</ToggleButton>
                        </ToggleButtonGroup>

                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    color: '#a1a1aa',
                                    border: '1px solid #3f3f46',
                                    borderRadius: 2,
                                    py: 1.2,
                                    fontWeight: 600,
                                    fontSize: 14,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: '#52525b',
                                        color: '#fff',
                                        backgroundColor: 'rgba(255,255,255,0.04)',
                                    },
                                }}
                                onClick={() => setShowFilter(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    color: '#f87171',
                                    border: '1px solid rgba(248, 113, 113, 0.3)',
                                    borderRadius: 2,
                                    py: 1.2,
                                    fontWeight: 600,
                                    fontSize: 14,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: '#f87171',
                                        backgroundColor: 'rgba(248, 113, 113, 0.08)',
                                    },
                                }}
                                onClick={clearFilter}
                            >
                                Clear
                            </Button>

                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: '#49c916',
                                    color: '#000',
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    py: 1.2,
                                    fontSize: 14,
                                    boxShadow: '0 4px 14px rgba(73, 201, 22, 0.3)',
                                    transition: 'all 0.25s ease',
                                    '&:hover': {
                                        backgroundColor: '#55df1c',
                                        boxShadow: '0 6px 20px rgba(73, 201, 22, 0.4)',
                                        transform: 'translateY(-1px)',
                                    },
                                }}
                                onClick={applyFilter}
                            >
                                Apply
                            </Button>
                        </Box>
                    </Box>
                </Drawer>
            )}
        </>
    );
}

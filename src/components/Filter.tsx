import {
    Box,
    Button,
    Drawer,
    MenuItem,
    Select,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { genreOptions, resolutionOption, sortByOption } from '../types/filterOptions';

export default function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilter, setShowFilter] = useState<boolean | null>(false);
    const [resolution, setResolution] = useState<string | null>(searchParams.get('quality'));
    const [genre, setGenre] = useState<string | null>(searchParams.get('genre'));
    const [orderBy, setOrderBy] = useState<string | null>(searchParams.get('order_by'));
    const [minimumRating, setMinimumRating] = useState<number | undefined>(
        Number(searchParams.get('minimum_rating')),
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
                        color: '#aaa',
                        border: '1px solid #555',
                        '&:hover': {
                            backgroundColor: '#333',
                            color: '#fff',
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
                                height: 650,
                                width: 350,
                                top: '50%',
                                transform: 'translateY(-50%)',
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 350,
                            height: '650px !important',
                            padding: 2,
                            background: 'black',
                            color: 'white',
                            fontWeight: 700,
                            paddingX: 5,
                            paddingY: 5,
                        }}
                    >
                        <h3 className="mt-3 mb-2 text-center text-2xl">Select Filters</h3>
                        <form>
                            <h3 className="mt-3 mb-2">Genre</h3>
                            <Select
                                sx={{
                                    width: '100%',
                                    color: '#fff',
                                    backgroundColor: '#111',

                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#777',
                                    },

                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#49c916',
                                    },

                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#49c916',
                                    },

                                    '& .MuiSelect-icon': {
                                        color: '#fff',
                                    },
                                }}
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            >
                                {genreOptions.map((genre) => (
                                    <MenuItem key={genre.value} value={genre.value}>
                                        {genre.display}
                                    </MenuItem>
                                ))}
                            </Select>

                            <h3 className="mt-3 mb-2">Resolution</h3>
                            <Select
                                sx={{
                                    width: '100%',
                                    color: '#fff',
                                    backgroundColor: '#111',

                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#777',
                                    },

                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#49c916',
                                    },

                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#49c916',
                                    },

                                    '& .MuiSelect-icon': {
                                        color: '#fff',
                                    },
                                }}
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                            >
                                {resolutionOption.map((resolution) => (
                                    <MenuItem key={resolution.value} value={resolution.value}>
                                        {resolution.display}
                                    </MenuItem>
                                ))}
                            </Select>

                            <h3 className="mt-3 mb-2">Sort By</h3>
                            <Select
                                sx={{
                                    width: '100%',
                                    color: '#fff',
                                    backgroundColor: '#111',

                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#777',
                                    },

                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#49c916',
                                    },

                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#49c916',
                                    },

                                    '& .MuiSelect-icon': {
                                        color: '#fff',
                                    },
                                }}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {sortByOption.map((sort) => (
                                    <MenuItem key={sort.value} value={sort.value}>
                                        {sort.display}
                                    </MenuItem>
                                ))}
                            </Select>

                            <h3 className="mt-3 mb-2">IMDB Rating</h3>
                            <Slider
                                sx={{
                                    width: '100%',
                                    color: '#49c916',

                                    '& .MuiSlider-thumb': {
                                        backgroundColor: '#49c916',
                                        border: '2px solid #fff',
                                    },

                                    '& .MuiSlider-track': {
                                        backgroundColor: '#49c916',
                                    },

                                    '& .MuiSlider-rail': {
                                        backgroundColor: '#555',
                                    },

                                    '& .MuiSlider-mark': {
                                        backgroundColor: '#aaa',
                                    },

                                    '& .MuiSlider-markLabel': {
                                        color: '#aaa',
                                    },
                                    '& .MuiSlider-valueLabel': {
                                        backgroundColor: '#49c916',
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

                            <h3 className="mt-3 mb-2">Order</h3>
                            <ToggleButtonGroup
                                value={orderBy}
                                exclusive
                                onChange={(_, value) => setOrderBy(value)}
                                size="small"
                                sx={{
                                    '& .MuiToggleButton-root': {
                                        color: '#aaa',
                                        borderColor: '#555',
                                    },
                                    '& .MuiToggleButton-root.Mui-selected': {
                                        backgroundColor: '#49c916',
                                        color: '#fff',
                                    },
                                    '& .MuiToggleButton-root.Mui-selected:hover': {
                                        backgroundColor: '#3da912',
                                    },
                                }}
                            >
                                <ToggleButton value="asc">ASC</ToggleButton>
                                <ToggleButton value="desc">DESC</ToggleButton>
                            </ToggleButtonGroup>
                            <div className="mt-5 flex gap-2 justify-evenly">
                                <Button
                                    sx={{
                                        color: '#aaa',
                                        border: '1px solid #555',
                                        '&:hover': {
                                            backgroundColor: '#333',
                                            color: '#fff',
                                        },
                                    }}
                                    onClick={() => setShowFilter(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    sx={{
                                        color: '#ff4d4d',
                                        border: '1px solid #ff4d4d',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 77, 77, 0.1)',
                                        },
                                    }}
                                    onClick={() => clearFilter()}
                                >
                                    Clear
                                </Button>

                                <Button
                                    sx={{
                                        backgroundColor: '#49c916',
                                        color: '#fff',
                                        fontWeight: 600,
                                        '&:hover': {
                                            backgroundColor: '#3da912',
                                        },
                                    }}
                                    onClick={applyFilter}
                                >
                                    Apply
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Drawer>
            )}
        </>
    );
}

import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Skeletons from './Skeletons';

interface PopupProps {
    open: boolean;
    imageUrl: string | undefined;
    onClose: () => void;
}

const Popup = ({ open, imageUrl, onClose }: PopupProps) => {
    const [loadedUrl, setLoadedUrl] = useState<string | undefined>();

    const imageLoaded = loadedUrl === imageUrl;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    zIndex: 10,
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#49c916',
                    },
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent
                sx={{
                    p: 0,
                    backgroundColor: '#000',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div className="relative h-[30vh] sm:h-[50vh] md:h-[70vh] lg:h-[90vh]">
                    {!imageLoaded && (
                        <div className="absolute inset-0 z-10">
                            <Skeletons width="100%" height="100%" />
                        </div>
                    )}

                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Screenshot"
                            onLoad={() => setLoadedUrl(imageUrl)}
                            onError={(e) => {
                                e.currentTarget.src =
                                    'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                            }}
                            className="contrast-120 saturate-120 w-full h-full"
                            style={{
                                borderRadius: '8px',
                                backdropFilter: 'blur(15px)',
                            }}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Popup;

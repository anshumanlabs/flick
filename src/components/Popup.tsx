import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Skeletons from "./Skeletons";
interface PopupProps {
  open: boolean;
  imageUrl: string | undefined;
  onClose: () => void;
}

const Popup = ({ open, imageUrl, onClose }: PopupProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 1,
          color: "white",
          "&:hover": {
            backgroundColor: "#49c916",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        key={imageUrl}
        sx={{
          p: 0,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#000"
        }}
      >
        {!imageLoaded && <Skeletons config={{ width: 1200, height: 500 }} />}
        <img
          className="contrast-120 saturate-120"
          src={imageUrl}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD";
          }}
          alt="Screenshot"
          onLoad={() => setImageLoaded(true)}
          style={{
            display: imageLoaded ? "block" : "none",
            maxWidth: "100%",
            maxHeight: "100%",
            borderRadius: "8px",
            backdropFilter: "blur(15px)",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Popup;

import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PopupProps {
  open: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

const Popup = ({ open, imageUrl, onClose }: PopupProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 1,
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#000",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Screenshot"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "8px",
              backdropFilter: "blur(15px)",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;

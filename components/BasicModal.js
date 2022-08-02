import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 800,
  height: "85%",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 5,
  p: 4,
};

export default function BasicModal({ open, handleClose, children, title }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <Typography
            id="modal-modal-title"
            variant="h2"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="p"
            component="div"
            sx={{ mt: 2 }}
          >
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

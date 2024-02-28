import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ResolvedIssueDetailModel( {handleCloseResolved, data}) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseResolved}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            width: "90%",
            height: "90%",
            border: "none",
            borderRadius: "30px",
            flexDirection: "column",
            padding: "0px",
          }}
        >
          <Box
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              overflowY: "scroll",
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              textAlign: "center",
              padding: "20px",
              borderRadius: "30px",
              backgroundColor: "#1e1d1d",
              color: "white",
              height: "100%",
            }}
          >
            <AssuredWorkloadIcon style={{ fontSize: "5rem" }} />
            <Typography
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: "1.45",
                letterSpacing: "0.008em",
                textAlign: "center",
                marginBottom: "20px",
              }}
              variant="h4"
            >
              {data[1]}
            </Typography>
            <Typography
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: "1.45",
                letterSpacing: "0.008em",
                textAlign: "center",
                marginBottom: "15px",
              }}
              variant="h4"
            >
              {data[0]}
            </Typography>
            
          </Box>
        </Box>
      </Modal>
      ;
    </>
  );
}

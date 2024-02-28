import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CreateIssue() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const duetId = sessionStorage.getItem("duetId");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      creatorid: duetId,
      title: data.get("title"),
      description: data.get("description"),
      category: data.get("category"),
    };
    try {
      const dataResponse = await axios.post(
        `http://${import.meta.env.VITE_REACT_APP_URL}:2000/api/students/createIssue`,
        formData
      );
      console.log(dataResponse);
      if (dataResponse.data.success) {
        handleOpen();
        setTimeout(handleClose, 4000);
        event.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          style={{ textAlign: "center" }}
        >
          <Fade in={open}>
            <Box
              sx={style}
              style={{
                width: "90%",
                border: "none",
                borderRadius: "2%",
              }}
            >
              <CheckCircleOutlineIcon
                style={{ fontSize: "10rem", color: "#0d8322" }}
              />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Issue Successfully Created
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Your issue have been rejistered and sended to the relevent
                minister once approved it will become part of the system you can
                check it in create issue
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
      <Box
        style={{ textAlign: "center" }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <Diversity3Icon style={{ fontSize: "100px", color: "#a30606" }} />
        <Typography
          style={{
            fontWeight: "600",
            fontSize: "1.35rem",
            lineHeight: "1.45",
            letterSpacing: "0.008em",
            textAlign: "center",
            marginBottom: "20px",
            color: "#4b4949",
          }}
          variant="h6"
        >
          If you change Nothing <br></br> Nothing will Change
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title of the Issue"
          name="title"
          autoComplete="email"
          autoFocus
          multiline
          maxRows={10}
          minRows={3}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Description of the Issue"
          id="description"
          autoComplete="current-password"
          multiline
          maxRows={10}
          minRows={5}
        />
        <FormControl
          variant="standard"
          style={{ width: "100%" }}
          sx={{ m: 1, minWidth: 120 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Select Category of the Issue
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="category"
            label="Age"
          >
            <MenuItem value={"Education"}>Education</MenuItem>
            <MenuItem value={"Admisions"}>Admisions</MenuItem>
            <MenuItem value={"Examinations"}>Examinations</MenuItem>
            <MenuItem value={"ICT"}>ICT</MenuItem>
            <MenuItem value={"Financial Assistance"}>
              Financial Assistance
            </MenuItem>
            <MenuItem value={"Sport"}>Sport</MenuItem>
            <MenuItem value={"Student Affairs"}>Student Affairs</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: "rgb(163, 6, 6)" }}
        >
          Submit Issues
        </Button>
      </Box>
    </div>
  );
}

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display:"flex",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ResolveIssueModal = ({ handleClose, data }) => {
  const handleSubmit = async (event) => {
    const resolveby = sessionStorage.getItem("name");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      id: data.get("id"),
      description: data.get("resolveIssue"),
      resolveBy: resolveby,
    };
    try {
      const dataResponse = await axios.post(
        "http://localhost:2000/api/issue/issueResolve",
        formData
      );
      if (dataResponse.status === 200) {
        console.log("a")
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    axios
      .post("http://localhost:2000/api/issue/topIssuesWindow", {
        category: categoryRequired,
      })
      .then((response) => {
        setIssues(response.data);
      });
  };


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography  id="modal-modal-title" variant="h6" component="h2">
            {data[1]}
          </Typography>
          <Typography id="modal-modal-description">{data[2]}</Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="resolveIssue"
              label="Resolve Issue Description"
              name="resolveIssue"
              autoComplete="resolveIssue"
              autoFocus
            />
            <TextField
              type="hidden" // Assuming 'id' should be hidden
              name="id"
              value={data[0]} // Assuming data[0] contains the issue ID
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Resolve Issue
            </Button>
          </Box>
        </Box>

      </Modal>
      ;
    </>
  );
};

export default ResolveIssueModal;

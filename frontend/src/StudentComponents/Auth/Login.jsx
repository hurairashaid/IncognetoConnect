import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      duetid: data.get("duetid"),
      password: data.get("password"),
    };
    try {
      const dataResponse = await axios.post(
        `http://${import.meta.env.VITE_REACT_APP_URL}:2000/api/authentication/studentSignIn`,
        formData
      );
      console.log(dataResponse.data.response.length);
      if (dataResponse.data.response.length !== 0) {
        sessionStorage.setItem("name" , dataResponse.data.response[0].name)
        sessionStorage.setItem("department" , dataResponse.data.response[0].department)
        sessionStorage.setItem("status" , dataResponse.data.response[0].status)
        sessionStorage.setItem("duetId" , dataResponse.data.response[0].duetId)
        sessionStorage.setItem("role" , dataResponse.data.response[0].Role)
        if(dataResponse.data.response[0].Role === "Student"){
        navigate("../StudentDashboard");
        }else{
          console.log(dataResponse.data.response[0].Role)
          navigate("../ControllerDashboard");
        }
      } else {
        setError("Credential not matched");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography component="h1" variant="h5">
          {error}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="duetid"
            label="Email Address"
            name="duetid"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

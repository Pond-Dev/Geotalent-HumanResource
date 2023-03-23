import * as React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Api from "../common/Api";
import { useAppDispatch } from "../common/Hook";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Login() {
  const initialData = {
    username: "",
    password: "",
  };
  type Data = {
    username: string;
    password: string;
  };
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [data, getData] = useState<Data>(initialData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${Api.api}/auth/signin`, data)
      .then((response) => {
        // console.log(response.data);
        dispatch({
          type: "GET_TOKEN",
          payloadToken: response.data.accessToken,
          payloadUser: data.username,
        });
        history.push("/tasks");
      })
      .catch(() => {
        // console.log(error.response);
        confirmAlert({
          customUI: () => {
            return (
              <div className="custom-ui">
                <h2>login fail pls try again !!</h2>
              </div>
            );
          },
        });
      });
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Human - Resource
            </Typography>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="text"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
              />
              {/* <Grid container>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button fullWidth onClick={() => history.push("/register")}>
                Don't have an account? Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

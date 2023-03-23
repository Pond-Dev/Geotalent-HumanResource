import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Api from "../common/Api";
import Button from "@mui/material/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../common/Hook";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
export default function User() {
  type Data = {
    id: string;
    username: string;
    password: string;
  };
  type User = {
    username: string;
  };
  const initialData = {
    id: "",
    username: "",
    password: "",
  };
  const [username, getUsername] = useState<User>();
  const [data, getData] = useState<Data>(initialData);
  const auth = useAppSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    axios
      .get<Data>(`${Api.api}/auth/user/${username}`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        getData(response.data);
      })
      .catch(() => {
        console.log("User not Found");
      });
  }, [username, auth.token]);

  const onChange = (e: any) => {
    // console.log(e.target.value);
    getUsername(e.target.value);
  };
  const conFirmDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete User {username} ? </p>
            <button
              className="confirm-button"
              onClick={() => {
                onDelete();
                onClose();
              }}
            >
              Yes
            </button>
            <button className="confirm-button" onClick={onClose}>
              No
            </button>
          </div>
        );
      },
    });
  };
  const onDelete = () => {
    axios
      .delete(`${Api.api}/auth/user/${username}`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
      .then(() => {
        console.log(`delete username ${username} success`);
        history.push("/user");
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="header">Find Username</h2>

      <Grid item key={data.id} xs={12} sm={6} md={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center">
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
            </Typography>
            <Typography variant="h5" align="center">
              User ID
            </Typography>
            <Typography variant="subtitle1" align="center">
              {data.id}
            </Typography>
            <Typography variant="h5" align="center">
              UserName
            </Typography>
            <Typography variant="subtitle1" align="center">
              {data.username}
            </Typography>
            <Typography variant="h5" align="center">
              Password
            </Typography>
            <Typography variant="subtitle1" align="center">
              {data.password}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="error"
              onClick={conFirmDelete}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}

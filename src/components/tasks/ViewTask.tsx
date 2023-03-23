import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Api from "../common/Api";
import { useAppSelector } from "../common/Hook";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
export default function ViewTask() {
  type Data = {
    id: string;
    title: string;
    description: string;
    status: string;
  };
  type Params = {
    id: string;
  };

  const initialTask = {
    id: "",
    title: "",
    description: "",
    status: "",
  };
  const { id } = useParams<Params>();
  const [task, setTask] = useState<Data>(initialTask);
  const auth = useAppSelector((state) => state);
  useEffect(() => {
    axios
      .get<Data>(`${Api.api}/tasks/${id}`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTask(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, auth.token]);

  const confirmUpdate = (e: any) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to Update Status Task to {e.target.value} ?</p>
            <button
              className="confirm-button"
              onClick={() => {
                onUpdate(e);
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
  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    // console.log(e.target.id);
    axios
      .put(
        `${Api.api}/tasks/${e.target.id}/status`,
        { status: e.target.value },
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      )
      .then(() => {
        console.log(`update to status ${e.target.value} Success`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const confirmDelete = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete Task ID</p>
            <p>{id}</p>
            <button
              className="confirm-button"
              onClick={() => {
                onDelete(id);
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

  const onDelete = (id: string) => {
    axios
      .delete(`${Api.api}/tasks/${id}`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
      .then(() => {
        console.log(`delete tasks id ${id} Success`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Grid item key={task.id} xs={12} sm={6} md={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center">
              Title
            </Typography>
            <Typography variant="subtitle1" align="center">
              {task.title}
            </Typography>
            <Typography variant="h5" align="center">
              Description
            </Typography>
            <Typography variant="subtitle1" align="center">
              {task.description}
            </Typography>
          </CardContent>
          <CardActions>
            <FormControl fullWidth>
              <InputLabel>Update Status</InputLabel>
              <Select
                value={task.status || ""}
                onChange={confirmUpdate}
                id={task.id}
              >
                <MenuItem value="OPEN">OPEN</MenuItem>
                <MenuItem value="DONE">DONE</MenuItem>
              </Select>
            </FormControl>
          </CardActions>
          <CardActions>
            <Button
              startIcon={<DeleteIcon />}
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => confirmDelete(task.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Task Description</TableCell>
              <TableCell align="center">{task.description}</TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell align="center">Task Status</TableCell>
              <TableCell align="center">{task.status}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer> */}
    </div>
  );
}

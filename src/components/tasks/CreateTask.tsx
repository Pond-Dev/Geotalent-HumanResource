import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Api from "../common/Api";
import { useAppSelector } from "../common/Hook";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CreateTask() {
  type Task = {
    title: string;
    description: string;
  };
  const history = useHistory();
  const [dataTask, getDataTask] = useState<Task[]>([]);
  const auth = useAppSelector((state) => state);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDataTask({
      ...dataTask,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post<Task>(`${Api.api}/tasks`, dataTask, {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
      .then(() => {
        console.log("Create Success");
        history.push("/tasks");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 className="header">Create Task</h2>
      <form className="input-form-create-task" onSubmit={onSubmit}>
        <TextField
          required
          className="input-field"
          label="Title"
          variant="outlined"
          type="text"
          name="title"
          onChange={onChange}
        />
        <TextField
          required
          className="input-field"
          label="Description"
          variant="outlined"
          type="text"
          name="description"
          onChange={onChange}
        />
        <Button variant="outlined" className="input-field-button" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}

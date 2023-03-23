import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Api from "../common/Api";
import { useAppSelector } from "../common/Hook";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Tasks() {
  type Data = {
    id: string;
    title: string;
    description: string;
    status: string;
  };

  const [allData, setAllData] = useState<Data[]>([]);
  const auth = useAppSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    axios
      .get<Data[]>(`${Api.api}/tasks`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
      });
  }, [auth.token]);
  const onCreate = () => {
    history.push(`/createTask`);
  };
  const onView = (id: string) => {
    history.push(`/tasks/${id}`);
  };

  return (
    <div>
      <h2 className="header">All Tasks</h2>

      <Container maxWidth="md" component="main">
        <Button variant="contained" className="create-task" onClick={onCreate}>
          Create Task
        </Button>
        <Grid container spacing={5} alignItems="flex-end">
          {allData.map((data) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={data.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h5" color="text.primary">
                      {data.title}
                    </Typography>
                  </Box>
                  <p>
                    <Typography variant="subtitle1" align="center">
                      {data.description}
                    </Typography>
                  </p>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={"outlined"}
                    onClick={() => {
                      onView(data.id);
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

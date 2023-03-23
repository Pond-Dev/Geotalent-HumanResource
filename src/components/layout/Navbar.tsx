import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../common/Hook";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const history = useHistory();
  const auth = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch({ type: "REMOVE_TOKEN" });
    history.push("/login");
  };
  const authLinks = (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit">Welcome {auth.user}</Typography>
          <Typography
            className="link"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => history.push("/tasks")}
          >
            Tasks
          </Typography>
          <Typography
            className="link"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => history.push("/user")}
          >
            User
          </Typography>
          <Typography className="link" color="inherit" onClick={onLogout}>
            Logout
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );

  const guestLinks = <div></div>;
  return <div>{auth.isAuthenticated ? authLinks : guestLinks}</div>;
};

export default Navbar;

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Error from "./components/common/Error";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Tasks from "./components/tasks/Tasks";
import ViewTask from "./components/tasks/ViewTask";
import CreateTask from "./components/tasks/CreateTask";
import User from "./components/users/User";
import { useAppSelector, useAppDispatch } from "./components/common/Hook";
export default function App() {
  const auth = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    function getLocalData() {
      const localData = JSON.parse(localStorage.getItem("auth") || "");
      if (localData !== "") {
        dispatch({
          type: "RE_RENDER",
          payloadIsAuthenticated: localData.isAuthenticated,
          payloadToken: localData.token,
          payloadUser: localData.user,
        });
      }
    }
    getLocalData();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute
            exact
            path="/user"
            isAuthenticated={auth.isAuthenticated}
            component={User}
          />
          <PrivateRoute
            exact
            path="/tasks"
            isAuthenticated={auth.isAuthenticated}
            component={Tasks}
          />
          <PrivateRoute
            exact
            path="/tasks/:id"
            isAuthenticated={auth.isAuthenticated}
            component={ViewTask}
          />
          <PrivateRoute
            exact
            path="/createTask"
            isAuthenticated={auth.isAuthenticated}
            component={CreateTask}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

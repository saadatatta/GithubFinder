import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = props => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_FINDER_CLIENTID}&client_secret=${process.env.REACT_APP_GITHUB_FINDER_CLIENTSECRET}`
      );
      setUsers(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Github"></Navbar>
            <div className="container">
              <Alert></Alert>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Fragment>
                      <Search></Search>
                      <Users />
                    </Fragment>
                  )}
                ></Route>
                <Route exact path="/about" component={About}></Route>
                <Route
                  exact
                  path="/users/:username"
                  render={props => <User {...props}></User>}
                ></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;

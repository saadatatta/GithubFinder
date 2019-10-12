import React, { useReducer } from "react";
import axios from "axios";
import GithubReducer from "./githubReducer";
import { SEARCH_USERS, SET_LOADING, GET_USER } from "../types";
import githubContext from "./githubContext";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_FINDER_CLIENTID}&client_secret=${process.env.REACT_APP_GITHUB_FINDER_CLIENTSECRET}`
    );
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  const getUser = async username => {
    dispatch({type:SET_LOADING});
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_FINDER_CLIENTID}&client_secret=${process.env.REACT_APP_GITHUB_FINDER_CLIENTSECRET}`
    );
    dispatch({type:GET_USER,payload:res.data});
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        getUser
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;

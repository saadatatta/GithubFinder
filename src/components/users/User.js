import React, { useEffect,useContext } from "react";
import Spinner from "../layouts/Spinner";
import GithubContext from '../../context/github/githubContext';

const User = ({match}) => {
  const githubContext = useContext(GithubContext);
  const {getUser,loading,user} = githubContext;
  useEffect(() => {
    getUser(match.params.username);
    //eslint-disable-next-line
  }, []);

  const { login, avatar_url, html_url } = user;
  if (loading) return <Spinner></Spinner>;
  else
    return (
      <div>
        <h1>{login}</h1>
      </div>
    );
};

export default User;

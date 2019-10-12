import React, { useState,useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from '../../context/github/githubContext';
import AlertContext from "../../context/alert/alertContext";
const Search = props => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { setAlertMessage } = alertContext;
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlertMessage({
        message: "Search field cannot be empty.",
        type: "danger"
      });
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search User"
          value={text}
          onChange={onChange}
        ></input>
        <button type="submit" className="btn btn-dark btn-block">
          Search
        </button>
      </form>
    </div>
  );
};

Search.propTypes = {
  
};

export default Search;

import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = props => {

  const { setAlertMessage, searchUsers } = props;
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
      searchUsers(text);
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
  searchUsers: PropTypes.func.isRequired
};

export default Search;

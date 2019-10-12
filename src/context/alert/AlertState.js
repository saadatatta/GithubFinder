import React, { useReducer } from "react";
import AlertContext from "../alert/alertContext";
import AlertReducer from "../alert/alertReducer";
import { SET_ALERT } from "../types";

const AlertState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set Alert
  const setAlertMessage = alert => {
    dispatch({ type: SET_ALERT, payload: alert });
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlertMessage
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

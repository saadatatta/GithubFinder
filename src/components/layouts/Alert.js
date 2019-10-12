import React,{useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';

function Alert() {
    const alertContext = useContext(AlertContext);
    const {alert} = alertContext;

    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="far fa-info"></i> {alert.message}
            </div>
        )
    )
}

export default Alert

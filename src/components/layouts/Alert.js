import React from 'react'

function Alert({alert}) {
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="far fa-info"></i> {alert.message}
            </div>
        )
    )
}

export default Alert

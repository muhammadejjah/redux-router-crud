import React, { Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
const Loading = ({ loading, error, children }) => {
    return (
        <Fragment>
            {loading ? (
                <div>
                <Spinner animation="border" role="status">
                <span className="visually-hidden" >Loading...</span>
              </Spinner>
                </div>
            ) : error ? (
                <h2 style={{ color: "red" }}>Error From Server</h2>
            ) : (
                children
            )}
        </Fragment>
    )
}

export default Loading

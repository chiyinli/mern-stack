import React from 'react'

const Leader = (props) => {
    return (
        <div>
            <h1>Top Scorers</h1>
            {props.grabUsers}
        </div>
    )
}

export default Leader

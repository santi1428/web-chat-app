import React from 'react';


const MyNotification = props => {
    const { backgroundColor, title, body } = props;
    return (
        <div className={backgroundColor}>
            <p>{title}</p>
            <hr/>
            <p>{body}</p>
        </div>
    )
}

export default MyNotification;
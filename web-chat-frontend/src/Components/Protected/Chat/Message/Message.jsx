import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';

import './Message.css';

const Message = props => {
    const { alignDirection, message, name} = props;

    return (
        <div className={alignDirection == "right" ? "row justify-content-end mt-2 animated fadeInRight": "row justify-content-start mt-2 animated fadeInLeft"} > 
            <div className="col-6">
                <div className={alignDirection == "right" ? "row justify-content-end": "row justify-content-start"}>
                    <div className={alignDirection == "right" ? "col-auto pl-3 pr-3 message" : "col-auto pl-3 pr-3 message bg-dark text-white"}>
                        <div className={alignDirection == "right" ? "row justify-content-end mt-2": "row justify-content-start mt-2"}>
                            <div className="col-auto mr-2">
                                <p className="message-text"> 
                                    <strong>{name + ": "} </strong>{message.message}
                                </p>
                                <div className={alignDirection == "right" ? "row justify-content-end": "row justify-content-start"}>
                                    <div className="col-auto">
                                        <small>{format(new Date(message.sentAt), 'dd/MM/yy p')}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Message;
import React from 'react';
import { useEffect, useState } from 'react';

const MessageLabel = ({type = '', message = '', timeout = 3000}) => {
    
    const [messageText, setMessageText] = useState(message);

    let className;
    switch (type) {
        case 'danger':
        className = 'text-danger';
        break;
        case 'warning':
        className = 'text-warning';
        break;
        case 'info':
        className = 'text-info';
        break;
        case 'success':
        className = 'text-success';
        break;
        default:
        className = 'text-muted';
        break;
    }

    const label = (
        <span className={`badge ${className}`}>
        {message}
        </span>
    );

    useEffect(() => {
        setMessageText(message);
      }, [message]);
    
      useEffect(() => {
        let timeoutId;
        if (messageText) {
          timeoutId = setTimeout(() => {
            setMessageText('');
          }, timeout);
        }
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, [messageText, timeout]);
    
      return messageText ? label : null;
}

export default MessageLabel;
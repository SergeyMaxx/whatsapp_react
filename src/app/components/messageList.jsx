import React from 'react'

function MessageList({messages}) {
  return (
    <ul className="message-list">
      {messages.map(message => (
        <li key={message.id} className="message">
          <div className="message-text">
            {message.text}
            <span className="message-timestamp">
              {message.timestamp}
            </span>
          </div>

        </li>
      ))}
    </ul>
  )
}

export default MessageList
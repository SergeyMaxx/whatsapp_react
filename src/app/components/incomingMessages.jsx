import React from 'react'

const IncomingMessages = ({messages}) => {
  return (
    <ul className="message-list">
      {messages.map(message => (
        <li key={message.id} className="message">
          <div className="message-text inc">
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

export default IncomingMessages
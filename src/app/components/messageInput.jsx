import React, {useState} from 'react'

function MessageInput({onSend}) {
  const [text, setText] = useState('')

  const handleSendClick = e => {
    e.preventDefault()
    if (text.trim()) {
      onSend(text)
      setText('')
    }
  }

  return (
    <form className="message-input" onSubmit={handleSendClick}>
      <input
        className="in"
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  )
}

export default MessageInput
import React, {useEffect, useState} from 'react'
import MessageInput from './messageInput'
import MessageList from './messageList'
import {useAuth} from './useAuth'
import {useHistory} from 'react-router-dom'

function Chat() {
  const {
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    userNumber,
    setUserNumber
  } = useAuth()
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [])
  const history = useHistory()
  const BASE_URL = 'https://api.green-api.com/'

  useEffect(() => {
    localStorage.setItem('id', idInstance)
    localStorage.setItem('api', apiTokenInstance)
    localStorage.setItem('number', userNumber)
  }, [idInstance, apiTokenInstance, userNumber])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  const sendMessage = content => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      chatId: `${userNumber}@c.us`,
      message: content
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch(`${BASE_URL}waInstance${idInstance}/sendMessage/${apiTokenInstance}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }


  const addMessage = text => {
    const newMessage = {
      id: Math.random().toString(36).slice(2),
      text,
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages([...messages, newMessage])
    sendMessage(text)
  }

  const logout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('api')
    localStorage.removeItem('number')
    localStorage.removeItem('messages')
    setIdInstance('')
    setApiTokenInstance('')
    setUserNumber('')
    history.replace('/')
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <h1 className="chat-title">
          WhatsApp Chat
        </h1>
        <button className="logout" onClick={logout}>
          logout
        </button>
      </div>
      <div className="chat-body">
        <MessageInput onSend={addMessage}/>
        <MessageList messages={messages}/>
      </div>
    </div>
  )
}

export default Chat
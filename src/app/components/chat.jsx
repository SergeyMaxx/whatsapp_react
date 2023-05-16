import React, {useEffect, useState} from 'react'
import MessageInput from './messageInput'
import MessageList from './messageList'
import {useAuth} from './useAuth'
import {useHistory} from 'react-router-dom'
import IncomingMessages from './incomingMessages'

function Chat() {
  const {
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    userNumber,
    setUserNumber
  } = useAuth()

  const get = key => JSON.parse(localStorage.getItem(key))
  const set = (key, val) => localStorage.setItem(key, val)
  const remove = key => localStorage.removeItem(key)

  const [messages, setMessages] = useState(get('messages') || [])
  const [incomingMessages, setIncomingMessages] = useState(get('incomingMessages') || [])
  const history = useHistory()
  const BASE_URL = 'https://api.green-api.com/'

  useEffect(() => {
    set('id', idInstance)
    set('api', apiTokenInstance)
    set('number', userNumber)
  }, [idInstance, apiTokenInstance, userNumber])

  useEffect(() => {
    set('messages', JSON.stringify(messages))
    set('incomingMessages', JSON.stringify(incomingMessages))
  }, [messages, incomingMessages])

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

  useEffect(() => {
    fetchMessages()
  }, [])

  function fetchMessages() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(`${BASE_URL}waInstance${idInstance}/receiveNotification/${apiTokenInstance}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        fetch(`${BASE_URL}waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`, requestOptions)
          .then(response => response.json())
          .then(resultMessage => {
            console.log(resultMessage)
            const message = resultMessage[0]

            const newMessage = {
              id: Math.random().toString(36).slice(2),
              text: message.textMessage,
              timestamp: new Date().toLocaleTimeString()
            }
            setIncomingMessages([...incomingMessages, newMessage])

            const requestOptions = {
              method: 'DELETE',
              redirect: 'follow'
            }

            fetch(`${BASE_URL}waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${result.receiptId}`, requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error))
          })
          .catch(error => console.log('error', error))
      })
      .catch(error => console.log('error', error))
  }

  const logout = () => {
    remove('id')
    remove('api')
    remove('number')
    remove('messages')
    remove('incomingMessages')
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
        <IncomingMessages messages={incomingMessages}/>
      </div>
    </div>
  )
}

export default Chat
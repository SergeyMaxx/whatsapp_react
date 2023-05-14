import React from 'react'
import {useAuth} from './useAuth'
import {useHistory} from 'react-router-dom'

const Login = () => {
  const {
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    userNumber,
    setUserNumber
  } = useAuth()

  const history = useHistory()
  const isValid = idInstance.trim() && apiTokenInstance.trim() && userNumber.trim()

  const handleSubmit = e => {
    e.preventDefault()
    if (isValid) {
      history.replace('/chat')
    }
  }

  return (
    <div className="login">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1 className="login-form__header register__header">
            Create chat
          </h1>
          <input
            name="idInstance"
            type="text"
            value={idInstance}
            onChange={e => setIdInstance(e.target.value)}
            placeholder="Id instance"
            className="login-form__input name-register"
          />
          <input
            name="apiTokenInstance"
            type="text"
            value={apiTokenInstance}
            onChange={e => setApiTokenInstance(e.target.value)}
            placeholder="Api token instance"
            className="login-form__input name-register"
          />
          <input
            name="userNumber"
            type="text"
            value={userNumber}
            onChange={e => setUserNumber(e.target.value)}
            placeholder="Recipient's phone number"
            className="login-form__input name-register"
          />
          <button
            className={!isValid ? 'btn-disabled btn-reg' : 'btn btn-reg'}
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
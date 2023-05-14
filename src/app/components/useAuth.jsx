import React, {useContext, useState} from 'react'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [idInstance, setIdInstance] = useState(localStorage.getItem('id') || '')
  const [apiTokenInstance, setApiTokenInstance] = useState(localStorage.getItem('api') || '')
  const [userNumber, setUserNumber] = useState(localStorage.getItem('number') || '')

  return (
    <AuthContext.Provider value={{
      idInstance,
      setIdInstance,
      apiTokenInstance,
      setApiTokenInstance,
      userNumber,
      setUserNumber
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
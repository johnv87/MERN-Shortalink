import { createContext } from 'react'

function dummy() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: dummy,
  logout: dummy,
  isAuthenticated: false,
})

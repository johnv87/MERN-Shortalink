import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

function AuthPage() {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    // console.log(error)
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = evt => {
    setForm({ ...form, [evt.target.name]: evt.target.value })
  }

  //  Registration handler
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })

      console.log(data)
      message(data.message)
    } catch (e) {}
  }

  //  Login handler
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      return auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h2>Short Link App</h2>
        {/*Authorization card*/}
        <div className='card-wrapper'>
          <div className='card blue darken-1'>
            <div className='card-content white-text'>
              <span className='card-title'>Authorization</span>
              {/*Email Input*/}
              <div className='card-input-wrapper'>
                <label htmlFor='email'>Email</label>
                <input
                  placeholder='Enter Email'
                  id='email'
                  type='text'
                  name='email'
                  value={form.email}
                  className='yellow-input'
                  onChange={changeHandler}
                />
              </div>
              {/*Password input*/}
              <div className='card-input-wrapper'>
                <label htmlFor='password'>Password</label>
                <input
                  placeholder='Enter Password'
                  id='password'
                  type='password'
                  name='password'
                  value={form.password}
                  className='yellow-input'
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          {/*Button group*/}
          <div className='card-action'>
            <button
              className='btn yellow darken-4 btn-login'
              disabled={loading}
              onClick={loginHandler}
            >
              Log In
            </button>
            <button
              id='register'
              className='btn grey lighten-1'
              disabled={loading}
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage

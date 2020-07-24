import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  return (
    <nav className='pink'>
      <div className='nav-wrapper'>
        <ul id='nav-mobile' className='right'>
          <li>
            <NavLink to='/create' className='nav-link'>
              Create
            </NavLink>
          </li>
          <li>
            <NavLink to='/links' className='nav-link'>
              Links
            </NavLink>
          </li>
          <li>
            <a href='/' onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

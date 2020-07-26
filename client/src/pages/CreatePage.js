import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

function CreatePage() {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          './api/link/generate',
          'POST',
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )
        console.log(auth.token)
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ padding: '2rem' }}>
        <h2>Create your short link</h2>
        <div>
          <label htmlFor='link'>Type your link</label>
          <input
            placeholder='Enter link'
            id='link'
            type='text'
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
        </div>
        <span>
          <small>Press 'Enter' to create link</small>
        </span>
      </div>
    </div>
  )
}

export default CreatePage

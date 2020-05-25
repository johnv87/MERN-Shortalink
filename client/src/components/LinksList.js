import React from 'react'
import { Link } from 'react-router-dom'

function LinksList(props) {
  if (!props.links.length) {
    return <p>No links available</p>
  }
  return (
    <div className='Links-list'>
      {' '}
      <table>
        <thead>
          <tr>
            <th>Original</th>
            <th>Short</th>
            <th>Clicks</th>
            <th>Created</th>
            <th>Info</th>
          </tr>
        </thead>

        <tbody>
          {props.links.map(e => {
            return (
              <tr key={e._id}>
                <td style={{ maxWidth: '25vw', overflow: 'hidden' }}>
                  <a href={e.from} target='_blank' rel='noreferrer noopener'>
                    {e.from}
                  </a>
                </td>
                <td>
                  {' '}
                  <a
                    href={e.to}
                    target='_blank'
                    rel='noreferrer noopener'
                    style={{ maxWidth: '25vw', overflow: 'hidden' }}
                  >
                    {e.to}
                  </a>
                </td>
                <td>{e.clicks}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/detail/${e._id}`}>Details</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LinksList

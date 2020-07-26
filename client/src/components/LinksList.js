import React from 'react'
import { Link } from 'react-router-dom'

function LinksList(props) {
  if (!props.links.length) {
    return <h3>You haven't created any links yet...</h3>
  }
  return (
    <div className='links-list'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Original</th>
            <th>Short</th>
            <th>Clicks</th>
            <th>Created</th>
            <th>Info</th>
          </tr>
        </thead>

        <tbody>
          {props.links.map((e, id) => {
            console.log(id)

            return (
              <tr key={e._id}>
                <td>{id + 1}</td>
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

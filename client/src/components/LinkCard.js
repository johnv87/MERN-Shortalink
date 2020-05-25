import React from 'react'

function LinkCard(props) {
  return (
    <div>
      <h2>Link:</h2>
      <p>
        Your link:
        <a href={props.link.to} target='_blank' rel='noreferrer noopener'>
          {props.link.to}
          {console.log(props.link)}
        </a>
      </p>
      <p>
        From:
        <a href={props.link.from} rel='noreferrer noopener'>
          {props.link.from}
        </a>
      </p>
      <p>
        Number of clicks: <strong>{props.link.clicks}</strong>
      </p>
      <p>
        Date created:{' '}
        <strong>{new Date(props.link.date).toLocaleDateString()}</strong>
      </p>
    </div>
  )
}

export default LinkCard

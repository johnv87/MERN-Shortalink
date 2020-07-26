import React from 'react'

function LinkCard(props) {
  return (
    <div>
      <h2>Link</h2>
      <p>
        <span>Short link:</span>
        <a href={props.link.to} target='_blank' rel='noreferrer noopener'>
          {props.link.to}
          {console.log(props.link)}
        </a>
      </p>
      <p>
        <span>Default rom:</span>
        <a href={props.link.from} rel='noreferrer noopener'>
          {props.link.from}
        </a>
      </p>
      <p>
        <span>Number of clicks: </span>
        <strong>{props.link.clicks}</strong>
      </p>
      <p>
        <span>Date created: </span>
        <strong>{new Date(props.link.date).toLocaleDateString()}</strong>
      </p>
    </div>
  )
}

export default LinkCard

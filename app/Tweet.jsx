const React = require('react')

const Tweet = props => {
  return (
    <div className="tweet">
      <p>
        <b>
          <a href={'https://twitter.com/' + props.authorScreenName}>{props.author}</a>
        </b>{' '}
        @{props.authorScreenName} | {props.date}
      </p>
      <p>{props.tweet}</p>
      <p>
        <b>Likes:</b> {props.likes} | <b>Retweets:</b> {props.retweets}
      </p>
    </div>
  )
}

module.exports = Tweet

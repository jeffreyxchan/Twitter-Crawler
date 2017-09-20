const React = require('react')
const Tweet = require('./Tweet.jsx')

const TweetList = props => {
  return (
    <div className="tweetList">
      {props.tweets.map(function(tweet) {
        return (
          <Tweet
            author={tweet.user.name}
            authorScreenName={tweet.user.screen_name}
            key={tweet.id}
            tweet={tweet.text}
            date={tweet.created_at.slice(0, 10)}
            likes={tweet.favorite_count}
            retweets={tweet.retweet_count}
          />
        )
      })}
    </div>
  )
}

module.exports = TweetList

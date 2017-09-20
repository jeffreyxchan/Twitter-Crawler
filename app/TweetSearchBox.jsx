const React = require('react')
const ReactDOM = require('react-dom')
const TweetSearchForm = require('./TweetSearchForm.jsx')
const TweetList = require('./TweetList.jsx')
const axios = require('axios')
require('./style.css')

class TweetSearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tweets: []
    }

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchSubmit(username) {
    axios
      .get('https://jeffrey-twitter-crawler.herokuapp.com' + this.props.url + '/' + username)
      .then(tweets => {
        this.setState({ tweets: tweets.data })
      })
      .catch(err => {
        console.log('Error in grabbing tweets for: ', username)
        this.setState({ tweets: [] })
      })
  }

  render() {
    return (
      <div className="tweetSearchBox">
        <h1>
          <a id="header" href="http://jeffreyxchan.github.io/Twitter-Crawler/">
            Twitter Crawler
          </a>
        </h1>
        <TweetSearchForm onSearchSubmit={this.handleSearchSubmit} />
        <TweetList tweets={this.state.tweets} />
      </div>
    )
  }
}

ReactDOM.render(<TweetSearchBox url="/search" />, document.getElementById('app'))

var Tweet = React.createClass({
    render: function () {
        return (
            <div class="tweet">
                <p><b>{this.props.author}:</b> {this.props.tweet}</p>
                <p><b>Date Posted:</b> {this.props.date}</p>
                <p><b>Likes:</b> {this.props.likes}, <b>Retweets:</b> {this.props.retweets}</p>
                <br />
            </div>
        )
    } 
});

var TweetList = React.createClass({
    render: function () {
        var tweetNodes = this.props.tweets.map(function (tweet) {
            return (
                <Tweet author={tweet.user.name} key={tweet.id} 
                tweet={tweet.text} date={tweet.created_at} likes={tweet.favorite_count} 
                retweets={tweet.retweet_count} />
            )
        });
        
        return(
            <div class="tweetList">
                {tweetNodes}
            </div>
        )
    }
});

var TweetSearchForm = React.createClass({
    getInitialState: function () {
       return {username: ''};
    }, 
    
    handleUsernameChange: function (e) {
        this.setState({username: e.target.value});
    },
    
    handleSubmit: function (e) {
        e.preventDefault();
        var username = this.state.username.trim();
        if (!username) { console.log('NOT A USERNAME'); return; }
        this.props.onSearchSubmit({username: username});
        this.setState({username: ''});
    },
    
    render: function () {
        return (
            <form class="searchForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="@username"value={this.state.username} 
                    onChange={this.handleUsernameChange}/>
                <input type="submit" value="Get Tweets!" />
            </form>
        );
    }
});

var TweetSearchBox = React.createClass({
    getInitialState: function () {
        return {tweets: []};
    },
    
    handleSearchSubmit: function(username) {    
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      cache: false,
      data: username,
      success: function(data, status, xhr) {
        this.setState({tweets: data});
      }.bind(this),
      error: function(xhr, status, err) {
        // restore if we get an error
        this.setState({tweets: []});
        console.error(this.props.url, status. err.toString());
      }.bind(this)
    });
  },
    
    render: function() {
        return (
            <div class="tweetSearchBox">
                <h1>Twitter Crawler</h1>
                <TweetSearchForm onSearchSubmit={this.handleSearchSubmit} />
                <TweetList tweets={this.state.tweets} />
            </div>
        );
    }
});

ReactDOM.render(
    <TweetSearchBox url="/search" />,
    document.getElementById('app')
);
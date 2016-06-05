var Tweet = React.createClass({
    render: function () {
        return (
            <div className="tweet">
                <p><b><a href={"https://twitter.com/" + this.props.authorScreenName}>{this.props.author}</a></b> @{this.props.authorScreenName} | {this.props.date}</p>
                <p>{this.props.tweet}</p>
                <p><b>Likes:</b> {this.props.likes} | <b>Retweets:</b> {this.props.retweets}</p>
            </div>
        )
    } 
});

var TweetList = React.createClass({
    render: function () {
        var tweetNodes = this.props.tweets.map(function (tweet) {
            var datePosted = "";
            for (var k = 0; k < 10; k++) {
                datePosted = datePosted + tweet.created_at[k];
            }
            
            return (
                <Tweet author={tweet.user.name} authorScreenName={tweet.user.screen_name} key={tweet.id} 
                tweet={tweet.text} date={datePosted} likes={tweet.favorite_count} 
                retweets={tweet.retweet_count} />
            )
        });
        
        return(
            <div className="tweetList">
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
            <form className="searchForm" onSubmit={this.handleSubmit}>
                <label for="inputField">@</label>
                <input className="inputField" type="text" placeholder="username"value={this.state.username} 
                    onChange={this.handleUsernameChange}/>
                <input className="button" type="submit" value="Crawl" />
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
            <div className="tweetSearchBox">
                <h1><a id="header" href="http://young-river-92178.herokuapp.com/">Twitter Crawler</a></h1>
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
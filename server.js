var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var Twitter = require('twitter')

var app = express()
var client = new Twitter({
  consumer_key: 'HoaLEJX66CUZJb3skPd39wgL2',
  consumer_secret: '38kaEN96UmaRG30mIn3EvLgx0NaK2viyv2eJ4l7MpAj8oqJgjI',
  access_token_key: '3262596740-JdwC4xCV7oXBvkPlxC4SSubpnSBI472Zfu4LZwb',
  access_token_secret: 'nZplw9SlfH3LZEYKcoBCUq6XEJexfRyh0HFUra3mSHhz2'
})

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('/search/:username', function(req, res) {
  client.get('statuses/user_timeline', { screen_name: req.params.username, count: 25 }, function(
    error,
    tweets,
    response
  ) {
    if (error) console.error(error)
    res.json(tweets)
  })
})

app.listen(app.get('port'), () => {
  console.log('Server started at port: ', app.get('port'))
})

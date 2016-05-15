/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Twitter = require('twitter');

var app = express();
var client = new Twitter({
  consumer_key: 'HoaLEJX66CUZJb3skPd39wgL2',
  consumer_secret: '38kaEN96UmaRG30mIn3EvLgx0NaK2viyv2eJ4l7MpAj8oqJgjI',
  access_token_key: '3262596740-JdwC4xCV7oXBvkPlxC4SSubpnSBI472Zfu4LZwb',
  access_token_secret: 'nZplw9SlfH3LZEYKcoBCUq6XEJexfRyh0HFUra3mSHhz2'
});

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(path.join(__dirname, 'app/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/search', function(req, res) {
  console.log("Searching for: " + req.query.username);
  client.get('statuses/user_timeline', {screen_name: req.query.username, count: 30}, function(error, tweets, response) {
      if (error) {
        console.error(error);
        process.exit(1);
      } else {
        console.log(tweets);
      }
      res.json(tweets);
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
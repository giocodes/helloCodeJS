var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var buildRepoObject = require('./server/buildRepoObject');
var parser = require('./parser/parser.js');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/api/repo', (req, res, next)=>{
  buildRepoObject(req.query.url, (code)=> {
    //the data should be passed to the parser here
    var nodes = parser(code);
    res.json({nodes, code});
  })
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(7770, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});

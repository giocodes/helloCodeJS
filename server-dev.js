const path = require('path');
const express = require('express');
const webpack = require('webpack');
const logger = require('morgan');
const parser = require('./server/parser/parser.js');
const config = require('./webpack.config.dev');
const buildRepoObject = require('./server/buildRepoObject');
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(logger('dev'));

app.get('/api/repo', (req, res, next)=>{
  buildRepoObject(req.query.url, (code)=> {
    //the data should be passed to the parser here
    var parserData = parser(code);
    res.json(parserData);
  })
})

// Serve Bootsrap, jQuery and favicon
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(7770, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});

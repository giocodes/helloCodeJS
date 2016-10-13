const fs = require('fs');
const Git = require("nodegit");
const rmrf = require("rimraf");
const filewalker = require('filewalker');
const temp = require('temp');

function buildRepoObject(directory, cb){

  let finalObj, repoObj = {};

  temp.track();
  let tempPath = temp.path();

  console.log('Temp dir will be: ', tempPath);

  Git.Clone(directory, tempPath)
  .then(function(repository) {

    filewalker(tempPath)
    .on('file', function(path, s) {
      if(path.endsWith('.js')){
        repoObj[path] = fs.readFileSync(tempPath + '/' + path, 'utf-8');
      }
    })
    .on('error', function(err) {
      console.error(err);
    })
    .on('done', function() {
      cb(repoObj);
      cleanup(tempPath);
    })
    .walk();

  })
  .catch(function(){
    cleanup(tempPath);
  });
}

function cleanup(path) {
  rmrf(path, {}, function(err){
    console.log(err);
  });
}

module.exports = buildRepoObject;

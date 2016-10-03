const fs = require('fs');
const Git = require("nodegit");
const rmrf = require("rimraf");
const filewalker = require('filewalker');


function buildRepoObject(directory, cb){

  let finalObj, repoObj = {};

  Git.Clone(directory, "./temp")
  .then(function(repository) {

    filewalker('./temp')
    .on('file', function(path, s) {
      if(path.substr(path.length-3) === '.js'){
        repoObj[path] = fs.readFileSync('./temp/'+ path, 'utf-8');
      }
    })
    .on('error', function(err) {
      console.error(err);
    })
    .on('done', function() {
      cb(repoObj);
      rmrf("./temp", {}, function(err){
        console.log(err);
      });
    })
    .walk();

  });
}

module.exports = buildRepoObject;

/*let myData;

buildRepoObject('https://github.com/kphurley/league-manager.git', function(data){
  myData = data;

});*/



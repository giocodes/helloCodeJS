//code.js
const code = [
  {
    "index.js": `var letsDoIt = function(){
  console.log("Go!");
}

var doIt = function(){
  console.log("Doing it!");
  letsDoIt();
};

doIt();`
  }
]

export default code;

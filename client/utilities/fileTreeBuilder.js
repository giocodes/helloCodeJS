//fileTreeBuilder.js

function fileTreeBuilder(repoContentObj){

  if(repoContentObj === {}) return;

  const obj = repoContentObj;
  const keys = Object.keys(obj);
  let fileStruct = keys.map(key=> key.split('/'));
  let data = [];

  for(let i = 0 ; i< fileStruct.length; i++)
  {
     buildTree(fileStruct[i], data);
  }

  removeEmptyArrays(data);

  return data;

}


function buildTree(parts,treeNode) {
  if(parts.length === 0)
  {
    return;
  }

  for(let i = 0 ; i < treeNode.length; i++)
  {
    if(parts[0] == treeNode[i].text)
    {
      buildTree(parts.splice(1,parts.length),treeNode[i].nodes);
      return;
    }
  }

  let newNode = {text: parts[0] ,nodes:[]};
  treeNode.push(newNode);
  buildTree(parts.splice(1,parts.length),newNode.nodes);
}

function removeEmptyArrays(trees){
  trees.forEach(tree => {
    if(tree.text.substr(tree.text.length-3) === '.js'){
      delete tree.nodes;
    }
    else{
      removeEmptyArrays(tree.nodes);
    }
  })
}

export default fileTreeBuilder;

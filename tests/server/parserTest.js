var expect = require('chai').expect;
var parser = require('../../server/parser/parser.js');
var fs = require('fs');
var testCommonJSModules = ['/parserTestData/server-side/testFile1.js', '/parserTestData/server-side/testFile2.js', '/parserTestData/server-side/testFile3.js', '/parserTestData/server-side/testFile4.js', '/parserTestData/server-side/testFile5.js', '/parserTestData/server-side/subfolderToTestRelativePaths/testFile6.js'];
var testCommonJSCode = {};
testCommonJSModules.forEach(function(path){
	testCommonJSCode[path] = fs.readFileSync(__dirname + path).toString();
})

var testES6Modules = ['/parserTestData/esModules/testFile6.js', '/parserTestData/esModules/testFile7.js', '/parserTestData/esModules/testFile8.js', '/parserTestData/esModules/testFile9.js']
var testES6Code = {};
testES6Modules.forEach(function(path){
	testES6Code[path] = fs.readFileSync(__dirname + path).toString();
})

var parserOutput = parser(testCommonJSCode);


describe('Parser', function () {

    describe('has correct format of input and output', function () {

        it('is a function', function () {
            expect(parser).to.be.a('function');
        });

        it('returns an object containing \'code\' and \'nodes\' keys', function () {
            var keys = Object.keys(parserOutput);
            expect(parserOutput).to.be.a('object');
            expect(keys.length).to.equal(2);
            expect(keys.includes('code')).to.equal(true);
            expect(keys.includes('nodes')).to.equal(true);
        }); 

    })   

    describe('returned code object', function(){

        it('\'code\' key in returned object points to an object', function(){
            expect(parserOutput.code).to.be.a('object');
        });

        it('returned code should be the same as input code for javascript inputs', function(){
            expect(JSON.stringify(parserOutput.code)).to.equal(JSON.stringify(testCommonJSCode));
        });

        it('returned code should be different for code containing JSX', function(){
            var exampleCode = {'samplepath': '<ThisIsAJSXElement />'};
            var parsedExample = parser(exampleCode);
            expect(JSON.stringify(parsedExample.code)).to.not.equal(JSON.stringify(exampleCode));
        });

    });

    describe('returned nodes array', function(){

        it('\'nodes\' key in returned object points to an array', function(){
            expect(Array.isArray(parserOutput.nodes)).to.equal(true);
        });

        it('returns a node for each function definition and invocation', function(){
            
            var exampleCode = {'samplepath': 'var a = function(){}; a();'};
            var parsedExample = parser(exampleCode);
            expect(parsedExample.nodes.length).to.equal(2);

            // from testCommonJSCode
            expect(parserOutput.nodes.length).to.equal(36);
        });

        describe('returns a node for different forms of function definitions', function(){

            it('assignment of function to variable', function(){
                var exampleCode = {'samplepath': 'a = function(){};'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(1);
            });

            it('declaration of variable and immediate assignment of function', function(){
                var exampleCode = {'samplepath': 'var a = function(){};'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(1);
            });
            
            it('named function declaration', function(){
                var exampleCode = {'samplepath': 'function a(){};'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(1);
            });
            
            it('definition of function as a callback', function(){
                var exampleCode = {'samplepath': 'a(function(){});'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(2);
            });

            it('assignment of arrow function to a variable', function(){
                var exampleCode = {'samplepath': 'a = ()=>{};'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(1);
            });

            it('definition of arrow function as a callback', function(){
                var exampleCode = {'samplepath': 'a(()=>{});'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(2);
            });

            it('definition of function as a property in an object literal definition', function(){
                var exampleCode = {'samplepath': 'obj = {a: function(){}};'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(1);
            });

            it('definition of function as an object\'s method', function(){
                var exampleCode = {'samplepath': 'obj.a = function(){};'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(1);
            });

            it('definition of function as return value of another function', function(){
                var exampleCode = {'samplepath': 'var a = function(){return function(){}};'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(2);
            });

        });

        describe('returns a node for different forms of function invocations', function(){

            it('invocation of variable representing function', function(){
                var exampleCode = {'samplepath': 'a();'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(1);
            });

            it('invocation of object\'s method', function(){
                var exampleCode = {'samplepath': 'obj.a();'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(1);
            });

            it('immediate invocation of function returned from function invocation', function(){
                var exampleCode = {'samplepath': 'a()();'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(2);
            });

            it('immediate invocation of function returned from object\'s method', function(){
                var exampleCode = {'samplepath': 'obj.a()();'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(2);
            });

            it('chained function invocations', function(){
                var exampleCode = {'samplepath': 'a().b();'};
                var parsedExample = parser(exampleCode);
                expect(parsedExample.nodes.length).to.equal(2);
            });


        });

    });

    describe('individual returned nodes', function(){

        it('each node contains a set of required properties', function(){
            var filteredNodes = parserOutput.nodes.filter(function(node){
                if (node.id && node.name && node.type && node.filePath && node.start && node.end && node.scope && node.incomingEdges && node.outgoingEdges) {
                    return true;
                }
            });
            expect(parserOutput.nodes.length).to.equal(filteredNodes.length);
        });

        describe('individual nodes contain an array of incoming edges', function(){

            it('definition nodes contain an incoming edge from every time the function is invoked', function(){
                var exampleCode = {'samplepath': 'function a(){}; a(); a(); b();'};
                var parsedExample = parser(exampleCode);
                var definitionNode = parsedExample.nodes[0];
                expect(definitionNode.incomingDefinition.length).to.equal(2);
                expect(definitionNode.incomingDefinition.includes(2)).to.equal(true);
                expect(definitionNode.incomingDefinition.includes(3)).to.equal(true);
            });

            it('determination of incoming edges between invocations and definitions respects scope', function(){
                var exampleCode = {'samplepath': 'function a(){ function b(){} b()}; function b(){}; b();'};
                var parsedExample = parser(exampleCode);
                
                var innerDefinition = parsedExample.nodes[1];
                expect(innerDefinition.incomingDefinition.length).to.equal(1);
                expect(innerDefinition.incomingDefinition.includes(3)).to.equal(true);
                
                var outerDefinition = parsedExample.nodes[3];
                expect(outerDefinition.incomingDefinition.length).to.equal(1);
                expect(outerDefinition.incomingDefinition.includes(5)).to.equal(true);
            });

            it('if function is defined within another function, it has an incoming edge from that function', function(){
                var exampleCode = {'samplepath': 'function a(){ function b(){}};'};
                var parsedExample = parser(exampleCode);
                var definitionNode = parsedExample.nodes[1];
                expect(definitionNode.incomingBody.length).to.equal(1);
                expect(definitionNode.incomingBody.includes(1)).to.equal(true);
            });

            it('if function is invoked within another function, it has an incoming edge from that function', function(){
                var exampleCode = {'samplepath': 'function a(){ b()};'};
                var parsedExample = parser(exampleCode);
                var invocationNode = parsedExample.nodes[1];
                expect(invocationNode.incomingBody.length).to.equal(1);
                expect(invocationNode.incomingBody.includes(1)).to.equal(true);
            });

        })

        describe('individual nodes contain an array of outgoing edges', function(){
            
            it('invocation nodes contain an outgoing edge to the corresponding function definition', function(){
                var exampleCode = {'samplepath': 'function a(){}; a();'};
                var parsedExample = parser(exampleCode);
                var invocationNode = parsedExample.nodes[1];
                expect(invocationNode.outgoingDefinition.length).to.equal(1);
                expect(invocationNode.outgoingDefinition.includes(1)).to.equal(true);
            });

            it('determination of outgoing edges between invocations and definitions respects scope', function(){
                var exampleCode = {'samplepath': 'function a(){ function b(){} b()}; function b(){}; b();'};
                var parsedExample = parser(exampleCode);
                
                var innerInvocation = parsedExample.nodes[2];
                expect(innerInvocation.outgoingDefinition.length).to.equal(1);
                expect(innerInvocation.outgoingDefinition.includes(2)).to.equal(true);
                
                var outerInvocation = parsedExample.nodes[4];
                expect(outerInvocation.outgoingDefinition.length).to.equal(1);
                expect(outerInvocation.outgoingDefinition.includes(4)).to.equal(true);
            });

            it('if function is defined within another function definition, the outer function has an outgoing edge to the inner function', function(){
                var exampleCode = {'samplepath': 'function a(){ function b(){}};'};
                var parsedExample = parser(exampleCode);
                var definitionNode = parsedExample.nodes[0];
                expect(definitionNode.outgoingBody.length).to.equal(1);
                expect(definitionNode.outgoingBody.includes(2)).to.equal(true);
            });

            it('if function is invoked within a function definition, the definition has an outgoing edge to the invocation', function(){
                var exampleCode = {'samplepath': 'function a(){ b()};'};
                var parsedExample = parser(exampleCode);
                var definitionNode = parsedExample.nodes[0];
                expect(definitionNode.outgoingBody.length).to.equal(1);
                expect(definitionNode.outgoingBody.includes(2)).to.equal(true);
            });

        });

        describe('edges can be built between nodes in different files', function(){
            
            it('cross-file edges can be found when the CommonJS module pattern is used', function(){
                var exampleCode = {'folder/samplepath1': 'var a = require("./samplepath2"); a();', 'folder/samplepath2': 'var a  = function(){}; module.exports = a;'};
                var parsedExample = parser(exampleCode);
                var invocationNode = parsedExample.nodes[1];
                expect(invocationNode.outgoingDefinition.length).to.equal(1);
                expect(invocationNode.outgoingDefinition.includes(3)).to.equal(true);
            });

            it('cross-file edges can be found when the ES6 named export module pattern is used', function(){
                var exampleCode = {'folder/samplepath1': 'import {a} from "./samplepath2"; a();', 'folder/samplepath2': 'var a  = function(){}; export {a};'};
                var parsedExample = parser(exampleCode);
                var invocationNode = parsedExample.nodes[0];
                expect(invocationNode.outgoingDefinition.length).to.equal(1);
                expect(invocationNode.outgoingDefinition.includes(2)).to.equal(true);
            });

            it('cross-file edges can be found when the ES6 default export module pattern is used', function(){
                var exampleCode = {'folder/samplepath1': 'import importedFunc from "./samplepath2"; importedFunc();', 'folder/samplepath2': 'export default function(){};'};
                var parsedExample = parser(exampleCode);
                var invocationNode = parsedExample.nodes[0];
                expect(invocationNode.outgoingDefinition.length).to.equal(1);
                expect(invocationNode.outgoingDefinition.includes(2)).to.equal(true);
            });

        });

    });

}); 


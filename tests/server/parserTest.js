var expect = require('chai').expect;
var parser = require('../../server/parser/parser.js');
var fs = require('fs');
var testCommonJSModules = ['/parserTestData/server-side/testFile1.js', '/parserTestData/server-side/testFile2.js', '/parserTestData/server-side/testFile3.js', '/parserTestData/server-side/testFile4.js', '/parserTestData/server-side/testFile5.js'];
var testCommonJSCode = {};
testCommonJSModules.forEach(function(path){
	testCommonJSCode[path] = fs.readFileSync(__dirname + path).toString();
})

var testES6Modules = ['/parserTestData/esModules/testFile6.js', '/parserTestData/esModules/testFile7.js', '/parserTestData/esModules/testFile8.js', '/parserTestData/esModules/testFile9.js']
var testES6Code = {};
testES6Modules.forEach(function(path){
	testES6Code[path] = fs.readFileSync(__dirname + path).toString();
})


describe('Parser', function () {

    describe('has correct format of input and output', function () {

        it('is a function', function () {
            expect(parser).to.be.a('function');
        });

        it('returns an object', function () {
            expect(parser()).to.be.a('object');
        });

    });

});
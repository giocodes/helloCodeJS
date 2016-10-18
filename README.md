# HelloCodeJS

### What is it?

Ever gotten frustrated with trying to figure out what a function did in an unfamiliar github repository? HelloCodeJS was built to solve that problem. It statically analyzes all of the function calls and declarations in a repo and visualizes them as a graph.
Written by Chris Cook, Sergio "Gio" Gomez, Kevin Hurley, and Yi Chao from Fullstack Academy Chicago.

### Documentation
1. Enter github repository url into the URL bar on the top middle. __(make sure it's a valid URL)__
2. When the file tree appears, navigate to any javascript file of interest from the project. A code window will appear with your selected javascript file.
3. Click on any function invocation or definition and a visualization will appear with your selected function in the middle of the display.
4. Using the graph:
      - Double-clicking a node will make it the new active node and center it on the display. The visualization and active code window will rerender with the new selection.
      - Single-click a node to open a secondary code window and examine the code context of the new secondary node. The secondary node will be highlighted to show its association with the secondary code window.

### Installation
- Git fork or clone the repository into your desired folder
```bash
$ cd hellocodebase
$ npm install
$ npm start
```
- Go to http://localhost:7770/ in your browser

### Testing

Enter __npm test__ on your command line to run the tests for this application.

### Technology
HelloCodeJS uses a number of open source projects to work properly:

* [React] - Awesome Javascript-powered library for building UIs
* [Redux] - Tool for managing state in our application
* [Esprima] - for all your Javascript parsing needs
* [CodeMirror] - code editor for the browser
* [Paper] - graphics framework used to build visualization
* [Twitter Bootstrap] - great UI
* [Express] - for easy backend routing
* [Webpack] - module bundler
* And more

### Todos

 - Write More Tests
 - Update Documentation
 
License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [React]: <https://facebook.github.io/react/>
   [Redux]: <http://redux.js.org/>
   [Esprima]: <http://esprima.org/>
   [CodeMirror]: <https://codemirror.net/>
   [Paper]: <http://paperjs.org/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [Webpack]: <https://webpack.github.io/docs/>
   [express]: <http://expressjs.com>

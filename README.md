# HelloCodeJS

### What is it?

Ever gotten frustrated with trying to figure out what a function did in an unfamiliar github repository? HelloCodeJS was built to solve that problem. It statically analyzes all of the function calls and declarations in a repo and visualizes them as a graph.
Written by Chris Cook, Sergio "Gio" Gomez, Kevin Hurley, and Yi Chao from Fullstack Academy Chicago.

### The Latest Version
To do later

### Documentation
1. Enter github repository url into the URL bar on the top middle. __(make sure it's a valid URL)__
2. A File Tree will appear, __double click__ the javascript file of interest or the folder icon containing your file of interest. The Active Node code window will appear with your selected javascript file.
3. Double click the function invocation or function declaration of interest. The web graph will appear with your selected function in the middle.
4. Using the graph
      - Double-clicking a node will make it the new active node. The web graph and active code window will rerender with the new selection.
      - Single-click a node to open a secondary code window and examine the associated code with that node. The secondary node will be highlighted to show its association with the secondary code window.

### Installation
- Git fork or clone the repository into your desired folder
```sh
$ cd hellocodebase
$ npm install
$ npm start
```
- Go to http://localhost:7770/ in your browser

### Technology
HelloCodeJS uses a number of open source projects to work properly:

* [React] - Awesome Javascript-powered library for building UIs
* [Redux] - Tool for managing state in our application
* [Esprima] - for all your Javascript parsing needs
* [CodeMirror] - code editor for the browser
* [Paper] - cool library we used to build our visualization
* [Twitter Bootstrap] - great UI boilerplate
* [Express] - for easy backend routing
* [Webpack] - module bundler
* And more

### Todos

 - Write Tests
 - Update Documentation
 - Plus a bunch of other things

License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [React]: <https://facebook.github.io/react/>
   [Redux]: <http://redux.js.org/>
   [Esprima]: <http://esprima.org/>
   [CodeMirror]: <https://codemirror.net/>
   [Paper]: <http://paperjs.org/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [Webpack]: <https://webpack.github.io/docs/>
   [express]: <http://expressjs.com>

//Welcome.js
import React from 'react';

const Welcome = React.createClass({
	componentDidMount(){ 
	console.log('did')
	window.setTimeout(this.setClassName, 500);
  	},
  	setClassName(){
    this.fontMain = 'font-main';
    this.fontActive = 'font-active';
    this.fontHighlight = 'font-highlight';
    this.forceUpdate();
	console.log('change');
	},
	componentDidUpdate(){
		if(this.props.isLoading){
	    	this.welcomeClass = 'no-display';
	    }
	},
	render() {
		return(
		<div id="welcome" className={this.welcomeClass + ' col-xs-6 col-xs-offset-3 col-md-8 col-md-offset-2'}>
			<h1 className={this.fontMain}>Hello!</h1>
			<h2>let´s take a <span className={this.fontActive}>better</span> look at <span className={this.fontHighlight}>your code</span></h2>
			<p>analyze your software <br/>
			and generate a <span className={this.fontActive}>user-friendly map</span> <br/>
			displaying the <span className={this.fontMain}>interaction</span> <br/>
			between different parts of <br/>
			your <span className={this.fontHighlight}>javascript</span> program<br/>
			</p>
			<h3>works with <span className={this.fontMain}>ES6</span>, Angular, React and 
			<a href="https://github.com/giocodes/helloCodeJS/"> more...</a></h3>
		</div>
		)
	}
})

export default Welcome;
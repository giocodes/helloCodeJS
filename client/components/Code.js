//Code.js
import React from 'react';
import Codemirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');

const Code = React.createClass({
  getInitialState: function() {
    return {
      code: this.props.code[0]['index.js']
    };
  },
  updateCode: function(newCode) {
    this.setState({
      code: newCode
    });
  },
  render: function() {
    const options = {
      lineNumbers: true,
      readOnly: true,
      mode: 'javascript'
    };

    return (
        <div className="col-md-12">
        <strong>index.js</strong>

        <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
        </div>
    )
  }
});

export default Code;

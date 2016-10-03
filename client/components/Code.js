//Code.js
import React from 'react';
import Codemirror from 'react-codemirror';
// Is this no longer needed? - Gio
// require('codemirror/mode/javascript/javascript');

const Code = React.createClass({
  getInitialState: function() {
    return {
      code: this.props.activeFileContent
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
      mode: 'javascript',
      theme: 'blackboard'
    };

    return (
        <div className="col-md-11">
        <strong>{this.props.activeFile}</strong>

        <Codemirror {...this.props} value={this.props.activeFileContent} options={options} />
        </div>
    )
  }
});

export default Code;

//Code.js
import React from 'react';

//import CodeMirror from 'codemirror';

import Codemirror from 'react-codemirror';

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
            theme: 'monokai'
        };

        return (
          <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
                  )
    }
});


export default Code;

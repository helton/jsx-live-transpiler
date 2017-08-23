import React, { Component } from 'react'
import ReactAutoBinder from 'react-auto-binder'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: `/* type your JSX here (supports React and ES2015) */`,
      err: '',
      output: ''
    }
  }

  update(event) {
    const code = event.target.value
    try {
      const transpiledCode = window.Babel.transform(code, { presets: ['es2015', 'react'] }).code
      this.setState({
        output: transpiledCode,
        err: ''
      })
    } catch (ex) {
      this.setState({ 
        err: ex.message,
        output: '',
      })
    }
  }

  render() {
    return (
      <div>
        <header>{this.state.err}</header>
        <div className="container">
          <textarea
            className="code"
            onChange={this.update}
            defaultValue={this.state.input}/>
          <SyntaxHighlighter
            className="code highlighting"
            showLineNumbers={true}
            language='javascript'
            style={tomorrowNightEighties}>
            {this.state.output}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
}

export default ReactAutoBinder(App)
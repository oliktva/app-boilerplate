import React, { Component } from 'react';

type AppProps = {
  children: React.ReactNode
}

class App extends Component<AppProps, {}> {
  render() {
    const {
      children
    } = this.props;

    return (
      <div>
        <h1>App boilerplate</h1>
        {children}
      </div>
    );
  }
}

export default App;
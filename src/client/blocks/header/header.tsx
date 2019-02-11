import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './header.styl';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
      </header>
    );
  }
}

export default Header;
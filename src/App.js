import React from 'react';
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

function Index() {
  return <h2>Home</h2>;
}

function Files() {
  return <h2>Files</h2>;
}

function App() {
  return (
    <Router>
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Blueprint</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal">
            <Link
                to="/"
                className="bp3-button bp3-minimal bp3-icon-home"
            >Home</Link>
          </Button>
          <Button className="bp3-minimal">
            <Link
                to="/files/"
                className="bp3-button bp3-minimal bp3-icon-document"
            >Files</Link>
          </Button>
        </Navbar.Group>
      </Navbar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Route path="/" exact component={Index} />
          <Route path="/files/" component={Files} />
        <h1>React Electron</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Router>
  );
}

export default App;

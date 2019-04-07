import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import routes from './routes';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/layout/Header";
import {Switch} from "react-router";
import Footer from "./components/layout/Footer";
import {Container} from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Container style={{ marginTop: '6em' }}>
            <Switch>
              {routes}
            </Switch>
          </Container>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

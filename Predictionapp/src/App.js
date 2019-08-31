import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Axios from "axios";
import styled from "styled-components";

import theme from "./theme";
import PredictEmployeeAnalysis from "./components/PredictEmployeeAnalysis";
import HackAppBar from "./components/SLAppBar";
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  setUserAuthenticationDetails = () => {};
  render() {
    return (
      <div>
        <div className="App">
          {/* <GlobalStyle /> */}
          <React.Fragment>
            <CssBaseline>
              <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                  {/* <Switch>
                    <Route
                      exact
                      path={["*"]}
                      render={renderProps => <PredictEmployeeAnalysis />}
                    />
                  </Switch> */}
                  <Route path={["*"]} render={renderProps => <HackAppBar />} />
                </MuiThemeProvider>
              </JssProvider>
            </CssBaseline>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default withRouter(App);

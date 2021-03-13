import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { configureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import Fulllayout from "./layouts/fulllayout.jsx";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";

import "./assets/scss/style.css";

const { persistor, store } = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HashRouter>
            <Switch>
              <Route exact path="/login" name="Login" component={Login} />
              <Route
                exact
                path="/register"
                name="Register"
                component={Register}
              />
              <Route path="/" name="Home" component={Fulllayout} />
            </Switch>
          </HashRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

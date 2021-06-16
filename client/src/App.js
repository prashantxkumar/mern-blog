import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Navbar from "./components/Navbar";
import Store from "./store/index";
import "./main.scss";

function App() {
  return (
    <Provider store = {Store}>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

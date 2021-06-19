import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Navbar from "./components/Navbar";
import Store from "./store/index";
import Dashboard from "./components/Dashboard";
import "./main.scss";
import PrivateRoute from "./private/PrivateRoute";
import RouteLinks from "./private/RouteLinks";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Provider store = {Store}>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <RouteLinks exact path="/register" component={Register} />
          <RouteLinks exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

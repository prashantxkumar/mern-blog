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
import Create from "./components/Create";
import Edit from "./components/Edit";
import EditImage from "./components/EditImage";
function App() {
  return (
    <Provider store = {Store}>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact  component={Home} />
          <RouteLinks exact path="/register" component={Register} />
          <RouteLinks exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard/:page?" component={Dashboard} />
          <PrivateRoute exact path="/create" component={Create} />
          <PrivateRoute exact path="/edit/:id" component={Edit} />
          <PrivateRoute exact path="/updateImage/:id" component={EditImage} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

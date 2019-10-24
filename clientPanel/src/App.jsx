import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import AppNavBar from "./component/layout/AppNavbar"
import Dashboard from "./component/pages/Dashboard"
import Landing from "./component/pages/Landing"
import "./App.css"
import {Provider} from "react-redux"
import store from "./store"
import ClientDetails from './component/clients/ClientsDetail';
import AddClient from './component/clients/AddClient';
import EditClient from './component/clients/EditClient';
import Register from './component/auth/Register';

import Login from './component/auth/Login';
import Alert from "./component/layout/Alert"
import setAuthToken from "./utils/setAuthToken"
import {loadUser} from "./component/actions/authAction"
import PrivateRoute from "./component/routes/privateRoute"

if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  



class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser())
      }
    
    render() { 

       
          
        return (
            <Provider store={store}>
            <Router>
             <div className="App">  
                    <AppNavBar/>   
                    <Route exact path="/" component ={Landing}/>   
                <div className="container">
                    <div style={{margin:"100px"}}><Alert/></div>
                    
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                        <PrivateRoute exact path="/client/add" component={AddClient}/>
                        <PrivateRoute exact path="/client/edit/:id" component={EditClient}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <PrivateRoute exact path="/client/:id" component={ClientDetails}/>
                        
                    </Switch>
                </div>
            </div>
            </Router>
            </Provider>
         );
    }
}
 
export default App;

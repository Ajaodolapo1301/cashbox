import React, { Component } from 'react';
import LoginForm from "./LoginForm"
import {connect} from "react-redux"
import {login} from "../actions/authAction"

class Login extends Component {
    state = {  }
    render() { 
        const {login, isAuthenticated} = this.props
        return ( 
                <LoginForm  login={login}   isAuthenticated={isAuthenticated}/>         
         );
    }
}
 

const mapStateToProps =(state)=>({
isAuthenticated: state.auth.isAuthenticated
}) 


export default connect(mapStateToProps, {login}) (Login);

import React, { Component } from 'react';
import RegisterForm from "./RegisterForm"
import {connect} from "react-redux"
import {setAlert} from "../actions/alertAction"
import {register} from "../actions/authAction"

class Register extends Component {
    state = {  }
    render() { 
        const {setAlert, isAuthenticated ,register} = this.props   
        return ( 
                <RegisterForm setAlert= {setAlert} register={register} isAuthenticated={isAuthenticated}/>         
         );
    }
}


const mapStateToProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated 
})


export default connect(mapStateToProps,{setAlert, register}) (Register);

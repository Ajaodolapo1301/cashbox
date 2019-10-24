import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import {logout} from "../actions/authAction"

class AppNavBar extends Component {
    state = {  }
    render() { 
     
        const {logout} = this.props
    const {loading, isAuthenticated} = this.props.auth

const authLink=(
    <div>
                                
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link to="/dashboard" className="nav-link">
                                Dashboard
                                </Link>
                            </li>       
                </ul>
                          <a onClick={logout} href="#!">
      <i className="fas fa-sign-out-alt" ></i>{""}
    <span className="hide-sm"></span>logout</a>
  

                
                </div>
                </div>
)

const guestLink =(
    <ul>
    <li><Link to="/register">Register</Link></li>
<li><Link to="/login">Login</Link></li>
</ul>
)

// navbar navbar-expand-md navbar-dark bg-black"
        return ( 
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
             
            <Link to="/" className="navbar-brand pa-3"> Cashbox
                    <button className="navbar-toggler"
                         type="button" data-toggle="collapse" 
                         data-target="#navbarTogglerDemo01">
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    </Link>   
            {!loading && <div>{isAuthenticated? authLink : guestLink}</div>}                
                
            
        </nav>
        
         );
    }
}
const mapStateToProps = (state) =>({
auth: state.auth
}) 


export default connect(mapStateToProps, {logout}) (AppNavBar);

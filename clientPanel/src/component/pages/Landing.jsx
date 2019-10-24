import React, { Component } from 'react';
import {Link,Redirect} from "react-router-dom"
import {connect} from "react-redux"



class Landing extends Component {
    state = {  }
    render() { 
      const {isAuthenticated}= this.props
      if (isAuthenticated) {
   return     <Redirect to="/dashboard"/>
      }

        return ( 
            <section className="landing">
            <div className="dark-overlay">
        <div className="landing-inner" >
          <div style={{margin: "300px auto"}}>
          <h1 className="x-large"> The List</h1>
          <p className="lead">
            Create a listand display information
          </p>
          <div className="buttons" >
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
          </div>
        </div>
      </div>
           </section>
            );
    }
}

const mapStateToProps = (state )=>({
  isAuthenticated: state.auth.isAuthenticated
})

 
export default connect(mapStateToProps)(Landing);
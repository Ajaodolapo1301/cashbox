import React, { Component } from 'react';
import { Redirect} from "react-router-dom"


class LoginForm extends Component {
    
        state = {  
            email: " ",
            password:"",
        }
    
        onSubmit = e =>{
          e.preventDefault()
          const {email, password} = this.state
          // const {login} = this.props
  
          const newUser= {
              email, 
              password
          }
        this.props.login(newUser)
        } 
  
          
      
         
      // onchange handler
      onChange=(e)=>this.setState(
          {[e.target.name]:e.target.value})
  

    render() { 
      if (this.props.isAuthenticated) {
        return <Redirect to="/dashboard" />
}
        const { email, password,} = this.state
        return ( 
            <div className="row" style={{margin: "100px"}}>
                <div className="col-md-6 mx-auto">
                       <div className="card">
                            <div className="card-body">
                                <h1 className="text-center pb-4 pt-3">Login</h1>   
            
                <hr/>
            <form onSubmit= {this.onSubmit}> 
        <div className="form-group">
        <label htmlFor="email"> Email</label>
          <input type="email"
           className="form-control" 
           placeholder="Email Address"
            name="email"
            value={email} 
            onChange={this.onChange}
            required
            />
          <small className="form-text"
            >This site uses Gravatar so if you want Link profile image, use Link
            Gravatar email</small
          >
        </div>
        <div className="form-group">
        <label htmlFor="password"> Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-control" 
            name="password"
            minLength="6"
            value={password} 
            onChange={this.onChange}
            required
          />
        </div>
    
        <input type="submit" className="btn btn-primary btn-block" value="Login" />
      </form>

                            </div>   
                        </div> 
                </div>
            </div>
         );
    }
}
 
export default LoginForm;

import React, { Component } from 'react';
import { Redirect} from "react-router-dom"



class RegisterForm extends Component {
    
        state = {  
            Fname:" ",
            Lname:" ",
            email: " ",
            password:"",
            password2:" "
        }
    
        onSubmit = e =>{
          e.preventDefault()
          const {f_name, l_name,email,password, password2} = this.state
          if (password !== password2) {
          
            this.props.setAlert("password does not match", "danger")
         
          }else{
              const newUser= {
                  f_name,
                  l_name,
                  email, 
                  password
              }
              this.props.register(newUser)        
          }
      } 
    
      // onchange handler
      onChange=(e)=>this.setState(
          {[e.target.name]:e.target.value})

    render() { 
      if (this.props.isAuthenticated) {
        return <Redirect to="/dashboard" />
}
        const {l_name,f_name, email, password,password2} = this.state
        return ( 
            <div className="row" style={{margin: "100px"}}>
                <div className="col-md-6 mx-auto">
                       <div className="card">
                            <div className="card-body">
                                <h1 className="text-center pb-4 pt-3">Register</h1>  
                                <hr/> 
            
            <form onSubmit= {this.onSubmit}> 
            <div className="form-group">
            <label htmlFor="password2">First Name</label>
          <input type="text"
          className="form-control" 
          placeholder="First Name" 
          value={f_name}
          name="f_name" 
          onChange={this.onChange}
          required />
        </div>

        <div className="form-group">
            <label htmlFor="password2">Last Name</label>
          <input type="text"
          className="form-control" 
          placeholder="First Name" 
          value={l_name}
          name="l_name" 
          onChange={this.onChange}
          required />
        </div>

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
        <div className="form-group">
            <label htmlFor="password2"> confirmation password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            className="form-control" 
            value={password2} 
            required
            onChange={this.onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary btn-block" value="Register" />
      </form>

                            </div>   
                        </div> 
                </div>
            </div>
         );
    }
}
 
export default RegisterForm;

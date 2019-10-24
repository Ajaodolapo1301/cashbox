import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom"
import { getUser} from "../actions/clientsAction"
import { updateUser} from "../actions/clientsAction"
import {connect} from "react-redux"


class EditClient extends Component {

    componentDidMount(){
        const {id} = this.props.match.params
        this.props.getUser(id)
    }


    componentWillReceiveProps(nextProps, nextState){
        const {f_name,l_name,email,hair_color,height, 
            weight ,dob,linkedin,
            facebook,twitter }=  nextProps.client
            this.setState({
                f_name,l_name,email,hair_color,height, 
            weight ,dob,linkedin,
            facebook,twitter
            })
    }


    state = { 
        f_name: " ",
        l_name: " ",
        email:  " ", 
        hair_color: " ",
        height: " ",
        weight: " ",
        dob: " ",
        linkedin: " ",
        facebook: " ",
        twitter: " ",
        showSocial: false
     }



       // onchange handler
  onChange=(e)=>this.setState(
    {[e.target.name]:e.target.value})


    // onsubmit handler
    onSubmit =(e) =>{
        e.preventDefault()
        const {f_name,l_name,email,hair_color,height, 
            weight ,dob,linkedin,
            facebook,twitter }= this.state
       

            const {id} = this.props.match.params

       const update={
       id, f_name,l_name,email,hair_color,height, 
        weight ,dob,linkedin,
        facebook,twitter
       }

        this.props.updateUser(update)

        this.setState({
            f_Name: " ",
            l_Name: " ",
            email:  " ", 
            hair_color: " ",
            height: " ",
            weight: " ",
            dob: " ",
            linkedin: " ",
            facebook: " ",
            twitter: " ",
        })

        this.props.history.push("/dashboard")

    }

  

    render() { 
        const { f_name,l_name,email,hair_color,height, weight 
            ,dob,linkedin,facebook,twitter, showSocial} =this.state

        return ( 
            <div>
            <div className="row">
                <div className="col-md-6">
                    <Link to="/" className="btn btn-link">
                        <i className="fas fa-arrow-circle-left">Back to dashboard</i>
                    </Link>
                </div>
            </div>

                <div className="card">
                    <div className="card-header">Edit List</div>
                    <div className="card-body">
                        <form action="" onSubmit={this.onSubmit}>
                        <label htmlFor="">First Name</label>
                        <div className="form-group">
                            <input type="text"
                            className="form-control" 
                            placeholder="First Name" 
                            name="f_name" 
                            value={f_name}
                            onChange={this.onChange}
                            required />
                            </div>
                            <label htmlFor="">last Name</label>
                        <div className="form-group">
                            <input type="text"
                            className="form-control" 
                            placeholder="last Name" 
                            name="l_name" 
                            value={l_name}
                            onChange={this.onChange}
                            required />
                            </div>

                            <label htmlFor="">Email</label>
                        <div className="form-group">
                            <input type="Email"
                            className="form-control" 
                            placeholder="Email" 
                            value={email}
                            name="email" 
                            onChange={this.onChange}
                            required />
                            </div>

                            <label htmlFor="">Hair color</label>
                        <div className="form-group">
                            <input type="text"
                            className="form-control" 
                            placeholder="Hair color" 
                            value={hair_color}
                            name="hair_color" 
                            onChange={this.onChange}
                            required />
                            </div>

                            <label htmlFor="">Height</label>
                        <div className="form-group">
                            <input type="text"
                            className="form-control" 
                            placeholder="height" 
                            value={height}
                            name="height" 
                            onChange={this.onChange}
                            required />
                            </div>

                            <label htmlFor="">Weight</label>
                        <div className="form-group">
                            <input type="text"
                            className="form-control" 
                            placeholder="weight" 
                            value={weight}
                            name="weight" 
                            onChange={this.onChange}
                            required />
                            </div>
                            
                            <label htmlFor="">Date of birth</label>
                        <div className="form-group">
                            <input type="text"
                            className="form-control" 
                            placeholder="weight" 
                            value={dob}
                            name="dob" 
                            onChange={this.onChange}
                            required />
                            </div>

                            <div className="my-2">
          <button  onClick={() =>this.setState({showSocial: !this.state.showSocial})}
          type="button" className="btn btn-light">
            Edit Social Network Links
          </button >
          <span>Optional</span>
        </div>

    {showSocial && <Fragment>

        <label htmlFor="">Twitter</label>
                        <div className="form-group">
          <i className="fab fa-youtube fa-2x"></i>
                            <input type="text"
                            className="form-control" 
                            placeholder="Twitter" 
                            value={twitter}
                            name="twitter" 
                            onChange={this.onChange}
                            required />
                            </div>
 
                            <label htmlFor="">facebook</label>
                        <div className="form-group">
                    <i className="fab fa-facebok fa-2x"></i>
                            <input type="text"
                            className="form-control" 
                            placeholder="facebbok" 
                            value={facebook}
                            name="facebook" 
                            onChange={this.onChange}
                            required />
                            </div>
                            <label htmlFor="">linkedin</label>
                        <div className="form-group">
                    <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text"
                            className="form-control" 
                            placeholder="linkedin" 
                            value={linkedin}
                            name="linkedin" 
                            onChange={this.onChange}
                            required />
                            </div>                        
        
                         </Fragment>}
                         <input type="submit" className="btn btn-primary my-1" />

                        </form>
                    </div>
                </div>

                
                
                </div>
         );
    }
}
 
const mapStateToProps = (state) =>({
    client: state.client.client
})
 

export default  connect(mapStateToProps, {getUser, updateUser})(EditClient);
import React, { Component } from 'react';
import {connect} from  "react-redux"
import {getUser} from "../actions/clientsAction"
import {Link} from "react-router-dom"
import {deleteUser} from "../actions/clientsAction" 


class ClientDetails extends Component {
    componentDidMount(){
        const {id} = this.props.match.params
        this.props.getUser(id)
    }

onDeleteClick =(id)=>{
    this.props.deleteUser(id)
    .then(this.props.history.push('/dashboard'))
} 

    
    render() { 

        const {client}= this.props  
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i>back to dashboard
                        </Link>
                    </div>  
                        <div className="col-md-6">
                            <div className="btn-group float-right">
                                <Link to={`edit/${client._id}`} className="btn btn-dark">
                                Edit
                                </Link>
                                <div onClick={this.onDeleteClick.bind(this, client._id)} className="button btn btn-danger">delete</div>    
                            </div>  
                        </div>
                    <hr/>
                   
                </div>
                <div className="card">
                        <h3 className="card-header">
                            {client.f_name} {client.l_name}
                        </h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                  <h4> email : <span>{client.email}</span></h4>   
                                </div>
                                <div className="col-md-4 col-sm-6">
                                  
                                </div>
                            </div>
                        <hr/>
                        <ul className="list-group">
                            <li className="list-group-item text-uppercase" >weight: {client.weight}</li>
                            <li className="list-group-item">height: {client.height}</li>
                            <li className="list-group-item">date of birth: {client.dob}</li>
                            <li className="list-group-item">hair color: {client.hair_color}</li>
                            
                        </ul>
                        <hr/>

                      <h4>social medias</h4>  
                        <ul className="list-group">
                            <li className="list-group-item text-uppercase">facebook: <span className="text-lowercase">{client.facebook}</span></li>
                            <li className="list-group-item">twitter: {client.twitter}</li>
                            <li className="list-group-item">linkedin: {client.linkedin}</li>
                            
                        </ul>
                        </div>
                    </div>

            </div>
        );
    }
}
const mapStateToProps = (state) =>({
    client: state.client.client
})
 
export default connect(mapStateToProps,{getUser, deleteUser})(ClientDetails)

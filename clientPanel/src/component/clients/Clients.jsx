import React, { Component } from 'react';
import {Link} from "react-router-dom"
import  {getLists} from "../actions/clientsAction"
import {connect} from "react-redux"



class Clients extends Component {

    componentDidMount(){
        this.props.getLists()
    }

    render() { 
    const {clients} = this.props
     
    if (clients) {
        return ( 
            <div>
                <div className="row">
                    <div className="col-md-6"> 
                         <h2>
                             {" "}
                             <i className="fas fa-users"></i>clients {" "}
                             </h2>
                    </div>
                    <div className="col-md-6">

                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                        <th scope="col">Age</th>
                        <th/>
                        </tr>
                    </thead>
                    <tbody>
                    {clients.map(client =>(
                        <tr key= {client.id}>
                        
                        <td> {client.f_name} {client.l_name}</td>
                        <td>{client.email}</td>
                        <td>{client.age}</td>
                        <td>
                            <Link to={`/client/${client._id}`} className="btn btn-secondary btn-sm"><i className="fas fa-arrow-circle-right"></i>Details
                            
                            </Link>
                        </td>
                        </tr>
                        ))}    
                    </tbody> 
            </table>
            </div>
         );
    }else{
        return <h1>loading...</h1>
    }
        
    }
}

const mapStateToProps = (state )=>({
    clients: state.client.clients
})


 
export default  connect (mapStateToProps, {getLists})(Clients);

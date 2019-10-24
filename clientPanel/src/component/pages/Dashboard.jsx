import React, { Component } from 'react';
import Clients from "../clients/Clients"
import SideBar from "../layout/Sidebar"
 
class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
         <div className="row">
           <div className="col-md-10" >
                <Clients/>
           </div>
            <div className="col-md-2">
                <SideBar/>  
                          </div>
        </div>
         );
    }
}
 
export default Dashboard;
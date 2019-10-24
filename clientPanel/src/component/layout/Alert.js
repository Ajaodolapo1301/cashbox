import React, { Component } from 'react';
import {connect} from "react-redux"


class Alert extends Component {
    state = {  }
    render() { 
        const {alerts} = this.props
        return ( 
            <div>
                {alerts !==null && alerts.length > 0 && alerts.map(alert=>(
                    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                          {alert.msg}  
                      </div>  
                ))}
            </div>
         );
    }
}
 
const mapStateToProps= (state)=>({
    alerts: state.alert
})


export default connect(mapStateToProps) (Alert);
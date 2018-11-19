import React, { Component } from 'react';

class Alert extends Component {
    render() {
        if(this.props.showAlert.showAlert) {
            return (
                <div class="alert alert-danger" role="alert" style={{"width": "50%", "margin": "0 auto"}}>
                    Please insert input with correction form
                </div>
            )
        } else {
            return (
                ""
            )
        }
    }
}

export default Alert
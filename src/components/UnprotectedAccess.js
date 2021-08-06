import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';

class Protected extends Component {

    render() {
        const { children } = this.props;
        if (sessionStorage.getItem('email')) {
            return (
                <Redirect to='/todolists'/>
            );
        }
        return (
            <div>
                {children}
            </div>
        );
    }
}

export default withRouter(Protected);
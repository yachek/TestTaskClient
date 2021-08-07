import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import {baseURL} from "../config";
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            email: '',
            password: '',
            hashedPassword: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        /*for (let i = 0; i < 5; i++) {
            const passwd = CryptoAES.encrypt(this.state.password, this.state.email).toString()
            alert(passwd);
            alert(CryptoAES.decrypt(passwd, this.state.email).toString(CryptoENC))
        }*/
        const passwd = CryptoAES.encrypt(this.state.password, this.state.email).toString();
        this.setState({hashedPassword: passwd}, () => {
            alert("Current State is: " + JSON.stringify(this.state))
            console.log("Current State is: " + JSON.stringify(this.state));

            fetch(baseURL + 'users/auth', {
                method: 'POST',
                headers: {
                    email: this.state.email,
                    password: this.state.hashedPassword
                }
            })
                .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        else {
                            const error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                        }
                    },
                    error => {
                        throw new Error(error.message);
                    })
                .then(data => {
                    sessionStorage.setItem('email', data.email);
                    sessionStorage.setItem('password', data.password)
                    sessionStorage.setItem('isAdmin', data.isAdmin)
                    window.location.reload()
                })
        })

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <Form className='col-6' onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email"
                                   value={this.state.email}
                                   onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handleInputChange}/>
                        </FormGroup>
                        <Link to='/signup'>Sign up</Link>
                        <Button type='submit' value="submit" color='primary'>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }


}

export default Auth;
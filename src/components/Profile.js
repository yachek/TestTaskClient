import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {baseURL} from "../config";
import CryptoAES from "crypto-js/aes";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            oldHashedPassword: '',
            newHashedPassword: '',
            firstName: '',
            lastName: ''
        }
        this.handleSubmitName = this.handleSubmitName.bind(this)
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        fetch(baseURL + 'profile', {
            method: 'GET',
            headers: {
                email: sessionStorage.getItem('email'),
                password: sessionStorage.getItem('password')
            }
        })
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
            })
            .then(data => {
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                })
            })
    }

    handleSubmitName(e) {
        e.preventDefault();

        fetch(baseURL + 'profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                email: sessionStorage.getItem('email'),
                password: sessionStorage.getItem('password')
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
        })
            .then(r  => {
                if (r.ok) {
                    return r.json();
                }
            })
            .then(data => {
                alert('Saved!')
            })
    }

    handleSubmitPassword(e) {
        e.preventDefault();
        if (this.state.newPassword === this.state.confirmPassword) {
            const oldPasswd = CryptoAES.encrypt(this.state.oldPassword, this.state.email).toString();
            const newPasswd = CryptoAES.encrypt(this.state.newPassword, this.state.email).toString();
            this.setState({oldHashedPassword: oldPasswd,
                                newHashedPassword: newPasswd}, () => {
                alert("Current State is: " + JSON.stringify(this.state))
                console.log("Current State is: " + JSON.stringify(this.state));

                fetch(baseURL + 'profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        email: sessionStorage.getItem('email'),
                        password: this.state.oldHashedPassword
                    },
                    body: JSON.stringify({
                        password: this.state.newHashedPassword,
                    })
                })
                    .then(r  => {
                        if (r.ok) {
                            return r.json();
                        }
                    })
                    .then(data => {
                        alert('Password has changed')
                        sessionStorage.setItem('password', this.state.newHashedPassword)
                    })
            })
        } else {
            alert('newPassword !== confirmPassword')
        }
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
                <div className='row'>
                    <div className='col-12'>
                        <br/>
                        <h2>My profile</h2>
                        <hr/>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <Form className='col-6' onSubmit={this.handleSubmitName}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email"
                                   value={this.state.email}
                                   onChange={this.handleInputChange} disabled/>
                            <br/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" id="firstName" placeholder="First Name"
                                   value={this.state.firstName}
                                   onChange={this.handleInputChange}/>
                            <br/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                   value={this.state.lastName}
                                   onChange={this.handleInputChange}/>
                            <br/>
                        </FormGroup>
                        <Button type='submit' value="submit" color='primary'>Save Changes</Button>
                        <br/>
                    </Form>
                </div>
                <div className='row justify-content-center'>
                    <Form className='col-6' onSubmit={this.handleSubmitPassword}>
                        <h2>Change password</h2>
                        <FormGroup>
                            <Label for="oldPassword">Password</Label>
                            <Input type="password" name="oldPassword" id="oldPassword" placeholder="Old password"
                                   value={this.state.oldPassword}
                                   onChange={this.handleInputChange}/>
                            <br/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword"> New password</Label>
                            <Input type="password" name="newPassword" id="newPassword" placeholder="New password"
                                   value={this.state.newPassword}
                                   onChange={this.handleInputChange}/>
                            <br/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm password</Label>
                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password"
                                   value={this.state.confirmPassword}
                                   onChange={this.handleInputChange}/>
                            <br/>
                        </FormGroup>
                        <Button type='submit' value="submit" color='primary'>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }


}

export default SignUp;
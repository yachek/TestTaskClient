import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import {baseURL} from "../config";
import CryptoAES from "crypto-js/aes";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            email: '',
            password: '',
            hashedPassword: '',
            firstName: '',
            lastName: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const passwd = CryptoAES.encrypt(this.state.password, this.state.email).toString();
        this.setState({hashedPassword: passwd}, () => {
            alert("Current State is: " + JSON.stringify(this.state))
            console.log("Current State is: " + JSON.stringify(this.state));
            alert(JSON.stringify(this.state))

            fetch(baseURL + 'users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.hashedPassword,
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
                    alert('RESPONSE DATA')
                    sessionStorage.setItem('email', this.state.email);
                    sessionStorage.setItem('password', this.state.hashedPassword)
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

    /*const menu = props.dishes.map((dish) => {
        return (
            <div  className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish}/>
            </div>
        );
    });*/

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
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" id="firstName" placeholder="First Name"
                                   value={this.state.firstName}
                                   onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                   value={this.state.lastName}
                                   onChange={this.handleInputChange}/>
                        </FormGroup>
                        <Link to='/'>Sign in</Link>
                        <Button type='submit' value="submit" color='primary'>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }


}

export default withRouter(SignUp);
import React, {Component} from 'react';
import {
    Card,
    CardTitle,
    Modal,
    CardText,
    CardHeader,
    CardBody,
    Button,
    ModalHeader,
    ModalBody,
    Form,
    Row,
    Col, Label, FormGroup, Input
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {baseURL} from "../config";

function RenderMenuItem({list}) {
    return (
        <Card>
            <Link to={`/todolists/${list._id}`}>
                <CardHeader>{list.name}</CardHeader>
            </Link>
                <CardBody>
                    <CardText>{list.description}</CardText>
                    <Button color='primary'>Delete</Button>
                    <Button color='primary'>Edit</Button>
                </CardBody>
                <ListForm list={list}/>
        </Card>
    );
}

class ListForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.comment);
    }

    render() {
        return(
            <div>
                <Button color='primary' onClick={this.toggleModal}>Add new To Do List</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(values) => this.handleSubmit(values)}>
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
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

class Lists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listsData: []
        }
    }

    componentDidMount() {
        fetch(baseURL + 'todolists', {
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
                console.dir(data)
                this.setState({
                    listsData: data
                })
            })
    }

    render() {
        if(this.state.listsData.length !== 0) {
            const lists = this.state.listsData.map((list) => {
                console.dir(list)
                return (
                    <div  className="col-12 col-md-5 m-1">
                        <RenderMenuItem list={list}/>
                    </div>
                );
            });
            return (
                <div className="container">
                    <div className='row'>
                        <div className='col-12'>
                            <br/>
                            <h2>My Lists</h2>
                            <ListForm/>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        {lists}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container justify-content-center">
                    <div className='row'>
                        <div className='col-6'>
                            <br/>
                            <h2>My Lists</h2>
                        </div>
                        <div className='col-6'>
                            <br/>
                            <Button color='primary'>Add new list</Button>
                        </div>
                        <hr/>
                    </div>
                    <div className="row justify-content-center">
                        <h2>You have no lists!</h2>
                    </div>
                </div>
            );
        }
    }
}

export default Lists;
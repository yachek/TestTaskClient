import React, {Component} from 'react';
import {
    Card,
    Modal,
    CardText,
    CardHeader,
    CardBody,
    Button,
    ModalHeader,
    ModalBody,
    Form, Label, FormGroup, Input
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {baseURL} from "../config";

function RenderMenuItem({list}) {
    function handleSubmit(e) {
        e.preventDefault();
        fetch(baseURL + 'todolists/' + list._id, {
            method: 'DELETE',
            headers: {
                email: sessionStorage.getItem('email'),
                password: sessionStorage.getItem('password')
            }
        })
            .then(resp => {
                if (resp.ok) {
                    alert('Deleted successfully!')
                    window.location.reload()
                }
            })
    }
    return (
        <Card>
            <Link to={`/todolists/${list._id}`}>
                <CardHeader>{list.name}</CardHeader>
            </Link>
                <CardBody>
                    <CardText>{list.description}</CardText>
                    <form onSubmit={handleSubmit}>
                        <Button color='primary' type='submit'>Delete</Button>
                    </form>
                    <ListForm list={list}/>
                </CardBody>
        </Card>
    );
}

class ListForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            isModalOpen: false,
            name: '',
            description: '',
            expiresAt: null
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            name: '',
            description: '',
            expiresAt: null
        }, () => {
            if (this.props.list && this.state.isModalOpen) {
                fetch(baseURL + 'todolists/' + this.props.list._id, {
                    method: 'GET',
                    headers: {
                        email: sessionStorage.getItem('email'),
                        password: sessionStorage.getItem('password')
                    }
                })
                    .then(resp => {
                        if (resp.ok) {
                            return resp.json();
                        }
                    })
                    .then(data => {
                        this.setState({
                            name: data.name,
                            description: data.description,
                            expiresAt: data.expiresAt
                        })
                    })
            }
        });
    }

    handleSubmitEdit(values) {
        this.toggleModal();
        fetch(baseURL + 'todolists/' + this.props.list._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                email: sessionStorage.getItem('email'),
                password: sessionStorage.getItem('password')
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                expiresAt: this.state.expiresAt
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
            })
            .then(data => {
                this.setState({
                    name: data.name,
                    description: data.description,
                    expiresAt: data.expiresAt
                })
            })
    }

    handleSubmitAdd(values) {
        this.toggleModal();
        fetch(baseURL + 'todolists/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    email: sessionStorage.getItem('email'),
                    password: sessionStorage.getItem('password')
                },
                body: JSON.stringify(this.state)
            }
        )
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
            })
            .then(data => {
                alert('Successfully added!')
                window.location.reload()
            })
            .catch((err) => {
                alert(err.toString())
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
        if (this.props.list) {
            return(
                <div>
                    <Button color='primary' onClick={this.toggleModal}>Edit</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Edit To Do List</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={(values) => this.handleSubmitEdit(values)}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" placeholder="Name"
                                           value={this.state.name}
                                           onChange={this.handleInputChange}/>
                                    <br/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input name="description" id="description" placeholder="Description"
                                           value={this.state.description}
                                           onChange={this.handleInputChange}/>
                                    <br/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="expiresAt">Expires date</Label>
                                    <Input type='datetime-local' name="expiresAt" id="expiresAt" placeholder="Expires At"
                                           value={this.state.expiresAt}
                                           onChange={this.handleInputChange}/>
                                    <br/>
                                </FormGroup>
                                <Button type='submit' value="submit" color='primary'>Edit</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            );
        } else {
            return(
                <div>
                    <Button color='primary' onClick={this.toggleModal}>Add new To Do List</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Add new To Do List</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={(values) => this.handleSubmitAdd(values)}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" placeholder="Name"
                                           value={this.state.name}
                                           onChange={this.handleInputChange}/>
                                    <br/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input type='text' name="description" id="description" placeholder="Description"
                                           value={this.state.description}
                                           onChange={this.handleInputChange}/>
                                    <br/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="expiresAt">Expires date</Label>
                                    <Input type='datetime-local' name="expiresAt" id="expiresAt" placeholder="Expires At"
                                           value={this.state.expiresAt}
                                           onChange={this.handleInputChange}/>
                                    <br/>
                                </FormGroup>
                                <Button type='submit' value="submit" color='primary'>Add</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
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
                        <div className='col-6'>
                            <br/>
                            <h2>My Lists</h2>
                        </div>
                        <div className='col-6 justify-content-center'>
                            <br/>
                            <ListForm/>
                        </div>
                        <hr/>
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
                            <ListForm/>
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
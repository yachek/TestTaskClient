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
    Form, Label, FormGroup, Input, CardTitle
} from 'reactstrap';
import {withRouter} from 'react-router';
import {baseURL} from "../config";

function RenderMenuItem({item, listId}) {
    function handleSubmit(e) {
        e.preventDefault();
        fetch(baseURL + 'todolists/' + listId + '/' + item._id, {
            method: 'DELETE',
            headers: {
                email: sessionStorage.getItem('email'),
                password: sessionStorage.getItem('password')
            }
        })
            .then(resp => {
                if (resp.ok) {
                    alert('Deleted successfully!')
                    window.location.reload();
                }
            })
    }
    return (
        <Card>
            {item.done ? <CardHeader className='bg-success text-white'>{item.name}</CardHeader> : <CardHeader className='bg-danger text-white'>{item.name}</CardHeader>}
            <CardBody>
                {item.time ? <CardTitle>Time: {item.time}</CardTitle> : <div/>}
                <CardText>{item.description}</CardText>
                <form onSubmit={handleSubmit}>
                    <Button className='bg-danger' type='submit'>Delete</Button>
                </form>
                <ListForm item={item} listId={listId}/>
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
            expiresAt: null,
            done: null
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
                fetch(baseURL + 'todolists/' + this.props.listId, {
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
                            expiresAt: data.expiresAt.substring(0, data.expiresAt.length - 1)
                        })
                    })
            } else if (this.state.isModalOpen && this.props.item) {
                fetch(baseURL + 'todolists/' + this.props.listId + '/' + this.props.item._id, {
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
                            expiresAt: data.time,
                            done: data.done
                        })
                    })
            }
        });
    }

    handleSubmitEdit(e) {
        e.preventDefault();
        this.toggleModal();
        if (this.props.list) {
            fetch(baseURL + 'todolists/' + this.props.listId, {
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
                    }, () => {
                        window.location.reload()
                    })
                })
        } else {
            console.dir(this.state)
            fetch(baseURL + 'todolists/' + this.props.listId + '/' + this.props.item._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    email: sessionStorage.getItem('email'),
                    password: sessionStorage.getItem('password')
                },
                body: JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    time: this.state.expiresAt,
                    done: this.state.done
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
                        expiresAt: data.time,
                        done: data.done
                    }, () => {
                        window.location.reload()
                    })
                })
        }
    }

    handleSubmitAdd(e) {
        e.preventDefault();
        this.toggleModal();
        fetch(baseURL + 'todolists/' + this.props.listId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    email: sessionStorage.getItem('email'),
                    password: sessionStorage.getItem('password')
                },
                body: JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    time: this.state.expiresAt
                })
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
        const value = target.type === 'checkbox' ? target.checked : target.value;
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
        } else if(this.props.item) {
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
                                    <Label for="expiresAt">Time</Label>
                                    <Input type='datetime-local' name="expiresAt" id="expiresAt" placeholder="Time"
                                           value={this.state.expiresAt}
                                           onChange={this.handleInputChange}/>
                                    <br/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="done">Done</Label>
                                    <Input type='checkbox' name="done" id="done" placeholder="Done"
                                           checked={this.state.done}
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
                    <Button color='primary' onClick={this.toggleModal}>Add new item to To Do List</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Add new item to To Do List</ModalHeader>
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
                                    <Label for="expiresAt">Time</Label>
                                    <Input type='datetime-local' name="expiresAt" id="expiresAt" placeholder="Date"
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

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            itemsArr: [],
            expiresAt: null
        }
    }

    componentDidMount() {
        const listId = this.props.match.params.listId;
        fetch(baseURL + 'todolists/' + listId, {
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
                    name: data.name,
                    description: data.description,
                    itemsArr: data.itemsArr,
                    expiresAt: data.expiresAt
                }, () => {
                    console.dir(this.state)

                })
            })
    }

    render() {
        if(this.state.itemsArr.length !== 0) {
            console.dir()
            const lists = this.state.itemsArr.map((item) => {
                console.dir(item)
                return (
                    <div  className="col-12 col-md-5 m-1">
                        <RenderMenuItem item={item} listId={this.props.match.params.listId}/>
                    </div>
                );
            });
            return (
                <div className="container">
                    <div className='row'>
                        <div className='col-6'>
                            <br/>
                            <div className='col-6'>
                                <h2>{this.state.name}</h2>
                                {this.state.expiresAt ? <h5>Expires at: {this.state.expiresAt}</h5> : <div/>}
                            </div>
                            <div className='col-6'>
                                <h5>{this.state.description}</h5>
                            </div>
                        </div>
                        <div className='col-3'>
                            <br/>
                            <ListForm list={this.state} listId={this.props.match.params.listId}/>
                        </div>
                        <div className='col-3'>
                            <br/>
                            <ListForm listId={this.props.match.params.listId}/>
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
                            <div className='col-12'>
                                <h2>{this.state.name}</h2>
                                {this.state.expiresAt ? <h5>Expires at: {this.state.expiresAt}</h5> : <div/>}
                            </div>
                            <div className='col-12'>
                                <h5>{this.state.description}</h5>
                            </div>
                        </div>
                        <div className='col-3'>
                            <br/>
                            <ListForm list={this.state} listId={this.props.match.params.listId}/>
                        </div>
                        <div className='col-3'>
                            <br/>
                            <ListForm listId={this.props.match.params.listId}/>
                        </div>
                        <hr/>
                    </div>
                    <div className="row justify-content-center">
                        <h2>{this.props.match.params.userId ? 'User haven`t items in list!' : 'You have no items in list!'}</h2>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(List);
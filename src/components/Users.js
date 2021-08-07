import React, {Component} from 'react';
import {
    Card,
    Modal,
    CardText,
    CardHeader,
    CardBody,
    Button,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {baseURL} from "../config";
import SignUpComponent from "./SignUpComponent";

function RenderUser({user}) {
    function handleSubmitDelete(e) {
        e.preventDefault();
        fetch(baseURL + 'users/' + user._id, {
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
    const location = '/users/' + user._id + '/lists'
    return (
        <Card>
            <Link to={`/users/${user._id}`}>
                <CardHeader>{user.firstName} {user.lastName}</CardHeader>
            </Link>
            <CardBody>
                <CardText>{user.email}</CardText>
                <form onSubmit={handleSubmitDelete}>
                    <Button className='bg-danger' type='submit'>Delete</Button>
                </form>
                <a href={location}>
                    <Button className='bg-primary' type='submit'>User Lists</Button>
                </a>
            </CardBody>
        </Card>
    );
}

class UsersForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return(
            <div>
                <Button color='primary' onClick={this.toggleModal}>Add new User</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add new User</ModalHeader>
                    <ModalBody>
                        <SignUpComponent users={true}/>
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
        fetch(baseURL + 'users', {
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
            const users = this.state.listsData.map((user) => {
                console.dir(user)
                return (
                    <div  className="col-12 col-md-5 m-1">
                        <RenderUser user={user}/>
                    </div>
                );
            });
            return (
                <div className="container">
                    <div className='row'>
                        <div className='col-6'>
                            <br/>
                            <h2>Users</h2>
                        </div>
                        <div className='col-6 justify-content-center'>
                            <br/>
                            <UsersForm/>
                        </div>
                        <hr/>
                    </div>
                    <div className="row">
                        {users}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container justify-content-center">
                    <div className='row'>
                        <div className='col-6'>
                            <br/>
                            <h2>Users</h2>
                        </div>
                        <div className='col-6'>
                            <br/>
                            <UsersForm/>
                        </div>
                        <hr/>
                    </div>
                    <div className="row justify-content-center">
                        <h2>There are no users!</h2>
                    </div>
                </div>
            );
        }
    }
}

export default Lists;
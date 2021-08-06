import React, { Component } from 'react';
import Profile from './Profile';
import ToDoList from './toDoList';
import Footer from './FooterComponent';
import ToDoListItem from './toDoListItem';
import {Switch, Route} from "react-router-dom";
import ToDoLists from './toDoLists';
import Users from './Users';
import Header from './HeaderComponent';
import AuthComponent from './AuthComponent'
import SignUpComponent from './SignUpComponent'
import ProtectedAccess from "./ProtectedAccess";
import UnprotectedAccess from "./UnprotectedAccess";

const phantom = {
    display: 'block',
    padding: '100px',
    height: '60px',
    width: '100%',
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        /*const HomePage =() => {
            return (
                <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
                      promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}
                      leader={this.state.leaders.filter((lea)=>lea.featured)[0]}
                />
            );
        };

        const DishWithId = ({match}) => {
            return (
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}/>
            );
        };*/

        return (
            <div>
                    <Header/>
                    <Switch className='content'>
                        <Route exact path ='/' render={props => <UnprotectedAccess>
                            <AuthComponent {...props}/>
                        </UnprotectedAccess>}/>
                        <Route path = '/signup' render={props => <UnprotectedAccess>
                            <SignUpComponent {...props}/>
                        </UnprotectedAccess>}/>
                        <Route exact path ='/todolists' render={props => <ProtectedAccess>
                            <ToDoLists {...props}/>
                        </ProtectedAccess>}/>
                        <Route exact path ='/todolists/:listId' render={props => <ProtectedAccess>
                            <ToDoList {...props}/>
                        </ProtectedAccess>}/>
                        <Route exact path ='/todolists/:listId/:itemId' render={props => <ProtectedAccess>
                            <ToDoListItem {...props}/>
                        </ProtectedAccess>}/>
                        <Route exact path ='/profile' render={props => <ProtectedAccess>
                            <Profile {...props}/>
                        </ProtectedAccess>}/>
                        <Route exact path ='/users' render={props => <ProtectedAccess>
                            <Users {...props}/>
                        </ProtectedAccess>}/>
                        <Route exact path = '/users/:userId' render={props => <ProtectedAccess>
                            <Profile {...props}/>
                        </ProtectedAccess>}/>
                        <Route exact path ='/users/:userId/lists' render={props => <ProtectedAccess>
                            <ToDoLists {...props}/>
                        </ProtectedAccess>}/>
                        <Route exact path ='/users/:userId/lists/:listId' render={props => <ProtectedAccess>
                            <ToDoList {...props}/>
                        </ProtectedAccess>}/>
                        <Route path ='/users/:userId/lists/:listId/:itemId' render={props => <ProtectedAccess>
                            <ToDoListItem {...props}/>
                        </ProtectedAccess>}/>
                    </Switch>
                <div style={phantom}/>
                <Footer/>
            </div>
        );
    }
}

export default Main;
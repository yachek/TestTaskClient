import React, { Component } from 'react';
import Profile from './Profile';
import ToDoList from './toDoList';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ToDoListItem from './toDoListItem';
import {Switch, Route, Redirect} from "react-router-dom";
import ToDoLists from './toDoLists';
import Users from './Users';

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
                <Switch>
                    <Route exact path ='/todolists' component={ToDoLists}/>
                    <Route exact path ='/todolists/:listId' component={ToDoList}/>
                    <Route exact path ='/todolists/:listId/:itemId' component={ToDoListItem}/>
                    <Route exact path ='/profile' component={Profile}/>
                    <Route exact path ='/users' component={Users}/>
                    <Route exact path = '/users/:userId' component={Profile}/>
                    <Route exact path ='/users/:userId/lists' component={ToDoLists}/>
                    <Route exact path ='/users/:userId/lists/:listId' component={ToDoList}/>
                    <Route path ='/users/:userId/lists/:listId/:itemId' component={ToDoListItem}/>
                </Switch>
            </div>
        );
    }
}

export default Main;
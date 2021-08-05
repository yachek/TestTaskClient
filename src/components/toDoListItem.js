import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link, useParams} from 'react-router-dom';

function RenderMenuItem({dish, onClick}) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}
const Menu = (props) => {

    let menu;

    if (useParams().userId) {
        menu = (
            <div>
                TODOLISTITEMWITHUSERID
            </div>
        )
    } else {
        menu = (
            <div>
                TODOLISTITEMWITHOUTSERID
            </div>
        )
    }

    /*const menu = props.dishes.map((dish) => {
        return (
            <div  className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish}/>
            </div>
        );
    });*/

    return (
        <div className="container">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/todolists'/>Home</BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>Menu</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <h2>{menu}</h2>
            </div>
        </div>
    );
};

export default Menu;
import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props) {
    return(
        <footer className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5 className='text-white'>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link className='text-white' to='/todolists'>My Lists</Link></li>
                            <li><Link className='text-white' to='/profile'>Profile</Link></li>
                            {sessionStorage.getItem('isAdmin') === 'true' ? <li><Link className='text-white' to='/users'>Users</Link></li> : <div/>}
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p className='text-white'>© Copyright 2021 Yaroslav Chekotun</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
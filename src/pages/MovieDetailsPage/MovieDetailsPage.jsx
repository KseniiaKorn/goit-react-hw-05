import React from 'react'
import { NavLink } from 'react-router-dom';

const MovieDetailsPage = () => {
    return (
        <>
            <div>MovieDetailsPage
                <ul>
                    <li>
                        <NavLink to='cast'>Cast</NavLink>
                    </li>
                    <li>
                        <NavLink to='reviews'>
                            Reviews
                        </NavLink>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    );
};

export default MovieDetailsPage;

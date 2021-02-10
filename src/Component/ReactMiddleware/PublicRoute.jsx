import React from 'react';
import { Route} from 'react-router-dom';
import {isLogin} from "./reactAuth";
import { Redirect } from 'react-router'

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
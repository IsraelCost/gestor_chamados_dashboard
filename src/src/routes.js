import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
    { ...rest }
    render={ 
        props => {
            return isAuthenticated() ? (
            <Component { ...props } />
            ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        }
    }
    />
);

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <PrivateRoute path="/dashboard" component={() => <Dashboard isPersonalizatePage={false} />} exact={true} />
                <PrivateRoute path="/personalizar" component={() => <Dashboard isPersonalizatePage={true} />} exact={true} />
            </Switch>
        </BrowserRouter>
    );
}
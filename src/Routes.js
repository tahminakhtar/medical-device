import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/auth/Login';
import Index from './pages/admin/Index';
export default class Routes extends Component {
   render() {
      return (
         <>
            <Switch>
               <Route path="/dashboard" component={Index} />
               <Route path="/" component={Login} />
               <Redirect from="/" to="/" />
            </Switch>
         </>
      )
   }
}

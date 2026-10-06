import React, { useState } from 'react';
import { AuthContext } from './contexts/Contexts';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { CheckoutForm, Return, SuccessMessage } from "./components/stripe/CheckoutForm";

  const App  = () => {
    const [authToken, setAuthToken] = useState(null);

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
            <Router>
                <Switch>
                    <Route path={`/auth`} component={AuthLayout} />
                    <Route path={`/admin`} component={AdminLayout} />
                    <Route path={"/checkout"} component={CheckoutForm} />
                    <Route path={"/return"} component={Return} />
                    <Route path={"/successmessage"} component={SuccessMessage} />
                    <Redirect from='/' to='/admin/dashboards/roof-analysis' />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};
export default App;
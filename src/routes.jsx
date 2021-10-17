import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from 'domains/auth';

import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { Marketplace } from './pages/marketplace';

const Routes = () => {
    const { status } = useAuth();

    return (
        <Switch>
            {status !== 'authenticated' && (
                <>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                </>
            )}
            {status === 'authenticated' && (
                <Route path="/marketplace">
                    <Marketplace />
                </Route>
            )}

            <Route path="/" exact>
                <Redirect
                    to={status !== 'authenticated' ? '/login' : '/marketplace'}
                />
            </Route>
            <Route path="*">
                <Redirect
                    to={status !== 'authenticated' ? '/login' : '/marketplace'}
                />
            </Route>
        </Switch>
    );
};

export default Routes;

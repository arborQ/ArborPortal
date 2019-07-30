import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

function recipaCardIndex ({ match }: RouteComponentProps): JSX.Element {
    return (
        <div>
            <Route path={`${match.path}/list`} component={React.lazy(() => import('./recipe.list'))} />
            <Route path={`${match.path}/details/:id`} exact component={React.lazy(() => import('./recipe.details'))} />
            <Route path={`${match.path}/add`} exact component={React.lazy(() => import('./recipe.add'))} />
        </div>
    );
}

export default recipaCardIndex;
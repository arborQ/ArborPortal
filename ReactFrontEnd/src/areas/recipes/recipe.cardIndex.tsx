import * as React from 'react';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';

function recipaCardIndex ({ match }: RouteComponentProps): JSX.Element {
    return (
        <div>
            <div>Recipes :)</div>
            <Route path={`${match.path}/list`} component={React.lazy(() => import('./recipe.list'))} />
            <Route path={`${match.path}/details/:id`} exact component={React.lazy(() => import('./recipe.details'))} />
            <Route path={`${match.path}/add`} exact component={React.lazy(() => import('./recipe.add'))} />
        </div>
    );
}

export default recipaCardIndex;
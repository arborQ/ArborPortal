import * as React from 'react';
import StateComponent from '../stateComponent';

interface IsAuthorizedProps {

}

export function ensureIsAuthorized<P extends IsAuthorizedProps = {}> (Component:  React.ComponentClass<P>): any {
    return class EnsureIsAuthorizedClass extends React.Component<P> {
        public render(): JSX.Element {
            return <Component {...this.props} />;
        }
    }
}

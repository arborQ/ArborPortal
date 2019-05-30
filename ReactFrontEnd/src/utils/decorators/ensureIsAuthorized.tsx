import * as React from 'react';
import StateComponent from '../stateComponent';

export function ensureIsAuthorized<P>() {
    return (Component: React.ComponentType<P>): Utils.Types.PassThruReactComponentType<P, {}> => {
        return class EnsureIsAuthorizedClass extends StateComponent<P, {}> {
            public render(): JSX.Element {
                return (
                    <Component {...this.props} />
                );
            }
        };
    };
}

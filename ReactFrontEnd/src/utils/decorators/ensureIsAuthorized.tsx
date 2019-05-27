import * as React from 'react';
import StateComponent from '../stateComponent';

export function ensureIsAuthorized() {
    return (Component: React.ComponentType<any>) => {
        return class NewerClass extends StateComponent<any, any> {
            public render(): JSX.Element {
                return (
                    <div>
                        <div>
                            Not authorized :(
                        </div>
                        <Component {...this.props} />
                    </div>
                );
            }
        };
    };
}
import * as React from 'react';

export function ensureIsAuthorized() {
    return (Component: React.ComponentType<any>) => {
        return class NewerClass extends React.Component<any, any> {
            public render(): JSX.Element {
                return (
                    <div>
                        <div>
                            Not authorized :(
                        </div>
                        <Component />
                    </div>
                );
            }
        };
    };
}
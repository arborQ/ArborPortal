import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import StateComponent from '../stateComponent';

export interface IDrawerProps {
    close: () => void;
}

export function drawerDecorator<P extends IDrawerProps>(): any {
    return (Component : React.ComponentClass<P>): any => {
        return class DialogComponentClass extends StateComponent<P, { isOpen: boolean }> {
            public componentWillMount(): void {
                this.UpdateState({ isOpen: true });
            }
    
            public render(): JSX.Element {
                const { isOpen } = this.state;
    
                return (
                    <Drawer anchor="right" open={isOpen} onClose={() => {}} aria-labelledby="simple-dialog-title">
                        {isOpen ? <Component {...this.props} close={() => { this.UpdateState({ isOpen: false }); }} /> : null}
                    </Drawer>
                );
            }
        }
    };
}
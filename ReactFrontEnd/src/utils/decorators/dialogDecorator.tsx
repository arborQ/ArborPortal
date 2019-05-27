import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import StateComponent from '../stateComponent';

export interface IDialogProps {
    close: () => void;
}

export function dialogDecorator<T extends IDialogProps>(title: string, onClose: () => void) {
    return (Component: React.ComponentType<T>) => {
        return class NewClass extends StateComponent<T, { isOpen: boolean }> {
            public componentWillMount(): void {
                this.UpdateState({ isOpen: true });
            }

            public render(): JSX.Element {
                const { isOpen } = this.state;

                return (
                    <Dialog open={isOpen} onClose={() => onClose()} aria-labelledby="simple-dialog-title">
                        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
                        {isOpen ? <Component {...this.props} close={() => { this.UpdateState({ isOpen: false }); }} /> : null}
                    </Dialog>
                );
            }
        }
    };
}
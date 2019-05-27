import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export interface IDialogProps {
    close: () => void;
}

export function dialogDecorator<T extends IDialogProps>(title: string, onClose: () => void) {
    return (Component: React.ComponentType<T>) => {
        return class NewClass extends React.Component<T, { isOpen: boolean }> {
            public componentWillMount(): void {
                this.setState({ isOpen: true });
            }

            public render(): JSX.Element {
                const { isOpen } = this.state;

                return (
                    <Dialog open={isOpen} onClose={() => onClose()} aria-labelledby="simple-dialog-title">
                        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
                        {isOpen ? <Component {...this.props} close={() => { this.setState({ isOpen: false }); }} /> : null}
                    </Dialog>
                );
            }
        }
    };
}
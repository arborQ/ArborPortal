import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export interface IDialogProps {
    close: () => void;
}

export function dialogDecorator(title: string, onClose: () => void) {
    return (Component: React.ComponentType<IDialogProps>) => {
        return () => {
            const [isOpen, setOpen] = React.useState(true);

            return (
                <Dialog open={isOpen} onClose={() => onClose()} aria-labelledby="simple-dialog-title">
                    <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
                    {isOpen ? <Component {...this.props} close={() => { setOpen(false); }} /> : null}
                </Dialog>
            );
        };
    };
}
import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import StateComponent from '../stateComponent';
import { ITranslationsProps } from '@bx-utils/decorators/translateDecorator';

export interface IDialogProps extends Partial<ITranslationsProps> {
    close: () => void;
}

export function dialogDecorator<P extends IDialogProps>(title: string): any {
    return (Component : React.ComponentClass<P>): any => {
        return class DialogComponentClass extends StateComponent<P, { isOpen: boolean }> {
            public componentWillMount(): void {
                this.UpdateState({ isOpen: true });
            }
    
            public render(): JSX.Element {
                const { isOpen } = this.state;
                const titleToDisplay = !!this.props.translate 
                    ? this.props.translate(title)
                    : title;

                return (
                    <Dialog open={isOpen} onClose={() => {}} aria-labelledby="simple-dialog-title">
                        <DialogTitle id="simple-dialog-title">{titleToDisplay}</DialogTitle>
                        {isOpen ? <Component {...this.props} close={() => { this.UpdateState({ isOpen: false }); }} /> : null}
                    </Dialog>
                );
            }
        }
    };
}
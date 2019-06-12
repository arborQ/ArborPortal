import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import StateComponent from '../stateComponent';
import { RouteComponentProps } from "react-router-dom";
import { History } from 'history';
import styled from 'styled-components';

const Container = styled.div`
    padding: 10px;
`;
export interface IDrawerProps extends Partial<RouteComponentProps> {
}

export function drawerDecorator<P extends IDrawerProps>(position: 'left' | 'top' | 'right' | 'bottom' = 'right'): any {
    return (Component: React.ComponentClass<P>): any => {
        return class DialogComponentClass extends StateComponent<P, { isOpen: boolean }> {
            public componentWillMount(): void {
                this.UpdateState({ isOpen: true });
            }

            public render(): JSX.Element {
                const { isOpen } = this.state;

                return (
                    <Drawer anchor={position} open={isOpen} onClose={this.closeDrawer.bind(this)} aria-labelledby="simple-dialog-title">
                        {isOpen ? <Container><Component {...this.props} /></Container> : null}
                    </Drawer>
                );
            }

            private async closeDrawer(): Promise<void> {
                await this.UpdateState({ isOpen: false });
            }
        }
    };
}
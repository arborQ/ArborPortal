import { Component } from 'react';

export default class StateComponent<P, S> extends Component<P, S> {
    private isCancelabled: boolean = false;

    public componentWillUnmount(): void {
        this.isCancelabled = true;
    }

    protected async UpdateState(partialState: Partial<S>) : Promise<S> {
        if (this.isCancelabled) {
            return Promise.reject();
        }

        return new Promise<S>((resolve) => {
            this.setState({...this.state, ...partialState}, () => {
                resolve(this.state);
            });
        })
    }
}
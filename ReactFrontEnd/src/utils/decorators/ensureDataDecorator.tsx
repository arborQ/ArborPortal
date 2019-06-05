import * as React from 'react';
import StateComponent from '../stateComponent';
import { INavigationProps } from './ensureNavigationDecorator';

export function ensureDataDecorator<P>(loadData: () => Promise<P> | P): any {
    return (Component: React.ComponentClass<Utils.Decorators.ILoadDataProps<P>>): any => {
        return class EnsureDataClass extends StateComponent<P | Partial<INavigationProps>, { loadedData?: P }> {

            public async componentWillMount() {
                await this.UpdateState({ loadedData: undefined });
                const loadedData = await loadData();
                await this.UpdateState({ loadedData });
            }

            public async componentWillReceiveProps(nextProps: P & Partial<INavigationProps>) {
                if(!!nextProps.search) {
                    const loadedData = await loadData();
                    await this.UpdateState({ loadedData });
                    console.log('ensureDataDecorator', nextProps)
                }
            }

            public render(): JSX.Element {
                return this.state.loadedData === undefined
                    ? <div>Loading data...</div>
                    : <Component {...this.props} data={this.state.loadedData} />;
            }
        };
    };
}

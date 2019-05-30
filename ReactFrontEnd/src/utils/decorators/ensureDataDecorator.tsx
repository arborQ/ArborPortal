import * as React from 'react';
import StateComponent from '../stateComponent';

export interface ILoadDataProps<T> {
    data: T | null;
}

export function ensureDataDecorator<K, P extends ILoadDataProps<K>>(loadData: () => Promise<K>) {
    return (Component: React.ComponentType<ILoadDataProps<K>>): Utils.Types.PassThruReactComponentType<P, ILoadDataProps<K>> => {
        return class EnsureDataClass extends StateComponent<P, { loadedData?: K }> {

            public async componentWillMount() {
                await this.UpdateState({ loadedData: undefined });
                const loadedData = await loadData();
                await this.UpdateState({ loadedData });
            }

            public render(): JSX.Element {
                return this.state.loadedData === undefined
                    ? <div>Loading data...</div>
                    : <Component {...this.props} data={this.state.loadedData} />;
            }
        };
    };
}
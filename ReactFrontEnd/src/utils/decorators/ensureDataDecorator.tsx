import * as React from 'react';

export interface ILoadDataProps<T> {
    data: T | null;
}

export function ensureDataDecorator<K>(loadData: () => Promise<K>) {
    return (Component: React.ComponentType<ILoadDataProps<K>>) => {
        return class NewerClass extends React.Component<ILoadDataProps<K>, { loadedData?: K }> {

            public async componentWillMount() {
                this.setState({ loadedData: undefined });
                const loadedData = await loadData();
                this.setState({ loadedData });
            }

            public render(): JSX.Element {
                return this.state.loadedData === undefined
                    ? <div>Loading data...</div>
                    : <Component {...this.props} data={this.state.loadedData} />;
            }
        };
    };
}
import * as React from "react";

interface ILoadDataProps<T> {
    data: T | null;
}

class EnsureDataComponentClass<T> extends React.PureComponent<{ Component: React.ComponentType<ILoadDataProps<T>>, loadData: () => Promise<T> }, { data: T | null }> {
    componentWillMount() {
        this.setState({ data: null });
    }
    public render(): JSX.Element {
        const { data } = this.state;
        const { Component } = this.props;

        if (data === null) {
            this.props.loadData().then(newData => {
                console.log({newData});
                this.setState({ data: newData });
            });

            return <div>Loading data...</div>
        }

        return <Component data={data} />;
    }
}

class UserListComponent extends React.Component<ILoadDataProps<number>> {
    public render(): JSX.Element {
        return (
            <div>
                list
            </div>
        );
    }
}

export default () => <EnsureDataComponentClass Component={UserListComponent} loadData={() => Promise.resolve(1)} />;

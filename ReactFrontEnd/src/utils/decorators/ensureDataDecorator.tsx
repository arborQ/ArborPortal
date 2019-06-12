import * as React from 'react';
import Spinner from '@bx-components/loading.indicator';
import StateComponent from '../stateComponent';
import { INavigationProps } from './ensureNavigationDecorator';
import MissingPageComponent from '../../lazy/404';
import { RouteComponentProps } from "react-router-dom";

function DisplayAjaxError({ message }: { message: string}) {
    return <MissingPageComponent message={message} />;
}

export function ensureDataDecorator<P>(loadData: () => Promise<P> | P): any {
    return (Component: React.ComponentClass<Utils.Decorators.ILoadDataProps<P>>): any => {
        return class EnsureDataClass extends StateComponent<P | Partial<INavigationProps> | Partial<RouteComponentProps>, { loadedData?: P, loaded: boolean, error?: string }> {

            public async componentWillMount() {
                await this.UpdateState({ loadedData: undefined, loaded: false });
                try {
                    const loadedData = await loadData();
                    await this.UpdateState({ loadedData, loaded: true });
                } catch {
                    await this.UpdateState({ loaded: true, error: 'AJAX ERROR' });
                }
            }

            public async componentWillReceiveProps(nextProps: P & Partial<INavigationProps>) {
                if (!!nextProps.search) {
                    const loadedData = await loadData();
                    await this.UpdateState({ loadedData });
                }
            }

            public render(): JSX.Element {
                return !this.state.loaded || this.state.loadedData === undefined
                    ? !!this.state.error
                        ? <DisplayAjaxError message={this.state.error} />
                        : <Spinner />
                    : <Component {...this.props} data={this.state.loadedData} />;
            }
        };
    };
}

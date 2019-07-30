import * as React from 'react';
import Spinner from '@bx-components/loading.indicator';
import { INavigationProps } from './ensureNavigationDecorator';
import MissingPageComponent from '../../lazy/404';
import { RouteComponentProps } from 'react-router-dom';

function DisplayAjaxError({ message }: { message: string }) {
    return <MissingPageComponent message={message} />;
}

export function ensureDataDecorator<P>(loadData: (abortSignal?: AbortSignal) => Promise<P> | P): any {
    return (Component: React.ComponentClass<Utils.Decorators.ILoadDataProps<P>>): any => {

        return (props: P | Partial<INavigationProps> | Partial<RouteComponentProps>): JSX.Element => {
            const [isLoaded, changeLoadState] = React.useState(false);
            const [loadError, changeError] = React.useState('');
            const [data, changeData] = React.useState<P | null>(null);
            const reloadDataCallback = React.useCallback(() => {
                const controller = new AbortController();
                changeLoadState(false);
                changeError('');
                Promise.resolve(loadData(controller.signal))
                    .then(resultData => {
                        changeLoadState(true);
                        changeData(resultData);
                    })
                    .catch(error => {
                        console.log('AJAX ERROR');
                        changeError('AJAX ERROR');
                    });
                setTimeout(() => {
                    if(!controller.signal.aborted && !isLoaded) {
                        controller.abort();
                    }
                }, 2000);
                return () => {
                    controller.abort();
                };
            }, []);

            React.useEffect(reloadDataCallback, []);

            if (!isLoaded || !data) {
                if (!!loadError) {
                    return <DisplayAjaxError message={loadError} />;
                }

                return <Spinner />;
            }

            return <Component {...props} data={data} reloadDataCallback={reloadDataCallback} />;
        };
    };
}

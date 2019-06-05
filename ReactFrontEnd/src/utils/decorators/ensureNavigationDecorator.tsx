import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { History } from 'history';

export interface INavigationProps {
    navigate(url: string): void;
    goBack(): void;
    search: string;
}

function navigate(h: History,  url: string): void {
    h.push(url)
};

export function ensureNavigationDecorator<P extends INavigationProps>(): any {
    return (Component: React.ComponentClass<P>): any => {
        return withRouter((props: P & RouteComponentProps<any>) => {
            console.log('navigation changed', props)
            return <Component 
            {...props} 
            search={props.location.search}
            navigate={(u) => navigate(props.history, u)}
            goBack={() => props.history.goBack()}
            />;
        });
    };
}

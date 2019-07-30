import { ensureDataDecorator } from './ensureDataDecorator';
import { get, post } from '@bx-utils/ajax';

interface IApiDataDecoratorProps {
    url?: string;
    method?: 'POST' | 'GET' | 'DELETE' | 'UPDATE';
    postData?: any;
}

export function ensureApiDataDecorator<P>(props: IApiDataDecoratorProps) {
    return ensureDataDecorator<P>(async (abortSignal?: AbortSignal) => {
        const { url } = props;
        const { search } = location;
        const method = props.method || 'GET';
        const apiUrl = url || location.pathname;
        
        if (method === 'GET') {
            return await get<P>(`/api${apiUrl}${search}`, abortSignal);
        } else {
            return await post<P>(`/api${apiUrl}${search}`, props.postData, abortSignal);
        }
    });
}

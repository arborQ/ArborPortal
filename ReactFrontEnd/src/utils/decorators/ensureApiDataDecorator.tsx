import { ensureDataDecorator } from './ensureDataDecorator';
import { get, post } from '@bx-utils/ajax';

interface IApiDataDecoratorProps {
    url: string;
    method?: 'POST' | 'GET' | 'DELETE' | 'UPDATE';
    postData?: any;
}

export function ensureApiDataDecorator<P>(props: IApiDataDecoratorProps) {
    return ensureDataDecorator<P>(async () => {
        const { url } = props;
        const { search } = location;
        const method = props.method || 'GET';

        if (method === 'GET') {
            return await get<P>(`/api${url}${search}`);
        } else {
            return await post<P>(`/api${url}${search}`, props.postData);
        }
    });
}

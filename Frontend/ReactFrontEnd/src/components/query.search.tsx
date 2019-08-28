import * as React from 'react';
import Search from './search';
import { parse as parseSearch } from 'query-string';

export interface IQuerySearchProps {
    queryKey: string;
    helperText?: string;
    onSearch: (search: string) => Promise<void> | void;
    onType?: (search: string) => Promise<void> | void;
    onEscape?: (originalSearch: string) => void;
}

function getSearchValue(key: string): string {
    const params = parseSearch(location.search);
    const searchValue: string = (params[key] || '').toString();

    return searchValue;
}

export default function QuerySearch(props: IQuerySearchProps) {
    const { queryKey, ...searchProps } = props;
    const value = getSearchValue(queryKey);
    const [search, updateSearch] = React.useState(value);

    React.useEffect(() => {
        const searchValue: string = getSearchValue(queryKey);
        updateSearch(searchValue);
    }, [location.search, value]);

    return <Search
        {...searchProps}
        search={search}
    />;
}

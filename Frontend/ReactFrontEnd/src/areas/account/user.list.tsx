import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { useTranslation } from 'react-i18next';
import { get } from '@bx-utils/ajax';
import Search from '@bx-components/query.search';
import NoteAddRounded from '@material-ui/icons/NoteAddRounded';
import { RouteComponentProps } from 'react-router';
import { Divider } from '@material-ui/core';
import { parse } from 'query-string';

interface IUserListProps
    extends Utils.Decorators.ILoadDataProps<Utils.Types.CollectionResponse<Areas.Account.IUser>>, RouteComponentProps {

}

interface IUserListState {
    data: Areas.Account.IUser[];
    // sortOrder: 'asc' | 'desc';
    // sortBy: string;
    // search: string;
}

interface IUserListApiResponse {
    accounts: Areas.Account.IUser[];
}

function UserListComponentHook(props: IUserListProps) {
    const { t } = useTranslation();

    const userNameTranslation = t('User Name');
    const emailTranslation = t('Email');
    const isActiveTranslation = t('Is Active');
    const { history, match } = props;

    const { sortBy, sortOrder, search } = {
        ...{
            sortBy: 'login',
            sortOrder: 'asc',
            search: ''
        }, ...parse(location.search)
    };

    const [searchModel, changeSearchModel] = React.useState<IUserListState>({
        data: []
    });

    const changeSortBy = (sortByKey: string) {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        history.replace(`${match.url}?sortBy=${sortByKey}&sortOrder=${newSortOrder}&search=${search}`);
    };

    const changeSearchText = (newSearch: string) => {
        history.replace(`${match.url}?sortBy=${sortBy}&sortOrder=${sortOrder}&search=${newSearch}`);
    };

    const { data } = searchModel;
    React.useEffect(() => {
        const abortController = new AbortController();
        (async () => {
            const response = await get<IUserListApiResponse>(
                `/api/accounts/user?SortBy=${sortBy}&SortDirection=${sortOrder}&Search=${search}`,
                abortController.signal);
            changeSearchModel({ ...searchModel, data: response.accounts });
        })();

        return () => abortController.abort();
    }, [sortBy, sortOrder, search]);

    return (
        <div>
            <Search
                queryKey='search'
                helperText={t('Search users')}
                onSearch={changeSearchText}
                actions={
                    [
                        {
                            tooltip: t('Add new user'),
                            icon: <NoteAddRounded />,
                            color: 'secondary',
                            onClick: e => {
                                e.preventDefault();
                                e.stopPropagation();
                                history.push('/authorize/create');
                            }
                        }
                    ]}
            />
            <Divider style={{ marginBottom: 10 }} />
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy === 'Login'}
                                    direction={sortOrder}
                                    onClick={() => changeSortBy('Login')}>
                                    {userNameTranslation}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='right'>
                                <TableSortLabel
                                    active={sortBy === 'Email'}
                                    direction={sortOrder}
                                    onClick={() => changeSortBy('Email')}>{emailTranslation}</TableSortLabel>
                            </TableCell>
                            <TableCell align='right'>
                                {isActiveTranslation}
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data === null ? null : data.map(row => (
                            <TableRow
                                key={row.id}
                                onClick={() => history.push(`/account/users/edit/${row.id}`)}>
                                <TableCell component='th' scope='row'>
                                    {row.login}
                                </TableCell>
                                <TableCell align='right'>{row.email}</TableCell>
                                <TableCell align='right'>{row.isActive ? 'Active' : ''}</TableCell>
                                <TableCell align='right'><SupervisedUserCircle /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default ensureIsAuthorized(UserListComponentHook);

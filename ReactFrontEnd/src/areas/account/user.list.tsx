import * as React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ensureApiDataDecorator } from '@bx-utils/decorators/ensureApiDataDecorator';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';
import { ensureNavigationDecorator, INavigationProps } from '@bx-utils/decorators/ensureNavigationDecorator';
import { parse } from 'query-string';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import data from './moc.data';
import StateComponent from "@bx-utils/stateComponent";

function loadUsers(): Promise<Areas.Account.IUser[]> {
    return new Promise<Areas.Account.IUser[]>(resolve => {
        setTimeout(async () => {
            resolve(data);
        }, 500);
    });
}

interface IUserListProps
    extends Utils.Decorators.ILoadDataProps<Utils.Types.CollectionResponse<Areas.Account.IUser>>,
    ITranslationsProps,
    INavigationProps {

}

interface IUserListState {
    data: Areas.Account.IUser[];
    sortOrder: 'asc' | 'desc';
    sortBy: keyof Areas.Account.IUser;
    selected: number[]
}

@ensureNavigationDecorator()
@ensureIsAuthorized
@ensureApiDataDecorator<Areas.Account.IUser[]>({ url: '/account/users' })
@ensureTranslationsDecorator<IUserListProps>('account')
export default class UserListComponent extends StateComponent<IUserListProps, IUserListState> {
    public componentWillMount(): void {
        this.componentWillReceiveProps(this.props);
    }

    public componentWillReceiveProps(nextProps: IUserListProps) {
        const params = parse(location.search) as { sortBy: keyof Areas.Account.IUser | null, sortDirection: 'asc' | 'desc' | null };

        this.UpdateState({
            sortOrder: params.sortDirection || 'asc',
            sortBy: params.sortBy || 'login',
            data: [...(!!this.props.data ? this.props.data.items : [])],
            selected: []
        });
    }

    private translate(key: string): string {
        if (this.props.translate === undefined) {
            return key;
        }

        return this.props.translate(key);
    }
    public render(): JSX.Element {
        const userNameTranslation = this.translate('User Name');
        const emailTranslation = this.translate('Email');
        const isActiveTranslation = this.translate('Is Active');

        return (
            <Paper>
                {
                    this.state.selected.length === 0
                        ? null
                        : (
                            <div>
                                <Button disabled={this.state.selected.length === 0}>Edit</Button>
                                <Divider />
                            </div>
                        )
                }
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={this.state.sortBy === 'login'}
                                    direction={this.state.sortOrder}
                                    onClick={() => this.changeSort('login')}>
                                    {userNameTranslation}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={this.state.sortBy === 'email'}
                                    direction={this.state.sortOrder}
                                    onClick={() => this.changeSort('email')}>{emailTranslation}</TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={this.state.sortBy === 'isActive'}
                                    direction={this.state.sortOrder}
                                    onClick={() => this.changeSort('isActive')}>
                                    {isActiveTranslation}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data === null ? null : this.state.data.map(row => (
                            <TableRow key={row.id} onClick={() => this.props.navigate(`/account/users/edit/${row.id}`)}>
                                <TableCell component="th" scope="row">
                                    {row.login}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.isActive ? 'Active' : ''}</TableCell>
                                <TableCell align="right"><SupervisedUserCircle /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    private changeSort(sortBy: keyof Areas.Account.IUser): void {
        this.props.navigate(`/account/users?sortBy=${sortBy}&sortDirection=${this.state.sortOrder === 'asc' ? 'desc' : 'asc'}`)
    }
}


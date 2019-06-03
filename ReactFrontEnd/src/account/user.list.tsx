import * as React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ensureDataDecorator, ILoadDataProps } from '@bx-utils/decorators/ensureDataDecorator';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import { ensureTranslationsDecorator, changeLanguage, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';
import data from './moc.data';
import StateComponent from "@bx-utils/stateComponent";

function loadUsers(): Promise<Areas.Account.IUser[]> {
    return new Promise<Areas.Account.IUser[]>(resolve => {
        setTimeout(async () => {
            resolve(data);
        }, 500);
    });
}

interface IUserListProps extends ILoadDataProps<Areas.Account.IUser[]>, ITranslationsProps {

}

interface IUserListState {
    data: Areas.Account.IUser[];
    sortOrder: 'asc' | 'desc';
    sortBy: keyof Areas.Account.IUser;
    selected: number[]
}

// @ensureIsAuthorized()
// @ensureDataDecorator<Areas.Account.IUser[], IUserListProps>(loadUsers)
// @ensureTranslationsDecorator<IUserListProps>('account', async () => await import('@bx-translations/account/en'))
class UserListComponent extends StateComponent<IUserListProps, IUserListState> {
    public componentWillMount(): void {
        this.UpdateState(this.sortData({
            sortOrder: 'asc',
            sortBy: 'email',
            data: [...(this.props.data || [])],
            selected: []
        }));
    }

    private sortData(data: IUserListState): IUserListState {
        const items = [...data.data].sort((a, b) => {
            const valueA = a[data.sortBy];
            const valueB = b[data.sortBy];
            const direction = data.sortOrder === 'asc' ? 1 : -1;

            return valueA.toString().localeCompare(valueB.toString()) * direction;
        });
        console.log({ items });
        return {
            ...data, data: items
        }
    }

    public render(): JSX.Element {
        const userNameTranslation = this.props.translate('User Name');
        const emailTranslation = this.props.translate('Email');
        const isActiveTranslation = this.props.translate('Is Active');

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
                            </TableCell>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data === null ? null : this.state.data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Checkbox value={!!this.state.selected.find(a => a === row.id)} onClick={() => {
                                        this.UpdateState({
                                            selected: this.state.selected.find(a => a === row.id)
                                                ? [...this.state.selected.filter(a => a !== row.id)]
                                                : [...this.state.selected, row.id]
                                        })
                                    }}></Checkbox>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.login}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.isActive ? 'Active' : ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    private changeSort(sortBy: keyof Areas.Account.IUser): void {
        this.UpdateState(this.sortData({
            ...this.state,
            sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc',
            sortBy,
        }));
    }
}

export default ensureIsAuthorized()(
    ensureDataDecorator<Areas.Account.IUser[], IUserListProps>(loadUsers)(
        ensureTranslationsDecorator<IUserListProps>('account', async () => await import('@bx-translations/account/en'))(
            UserListComponent
        )
    )
);

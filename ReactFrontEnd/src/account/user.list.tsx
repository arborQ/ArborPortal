import * as React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ensureDataDecorator, ILoadDataProps } from '@bx-utils/decorators/ensureDataDecorator';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import { ensureTranslationsDecorator, changeLanguage, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';

function loadUsers(): Promise<Areas.Account.IUser[]> {
    return new Promise<Areas.Account.IUser[]>(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, login: 'arbor', email: 'arbor@o2.pl', firstName: 'dsa', lastName: 'das asdasda', isActive: true },
            ]);
        }, 500);
    });
}

interface IUserListProps extends ILoadDataProps<Areas.Account.IUser[]>, ITranslationsProps {

}

// @ensureIsAuthorized()
// @ensureDataDecorator<Areas.Account.IUser[], IUserListProps>(loadUsers)
// @ensureTranslationsDecorator<IUserListProps>('account', async () => await import('@bx-translations/account/en'))
class UserListComponent extends React.Component<IUserListProps, { sortOrder: 'asc' | 'desc', sortBy: keyof Areas.Account.IUser }> {
    public componentWillMount(): void {
        this.setState({
            sortOrder: 'asc', sortBy: 'email'
        });
    }

    public render(): JSX.Element {
        const userNameTranslation = this.props.translate('User Name');
        const emailTranslation = this.props.translate('Email');
        const isActiveTranslation = this.props.translate('Is Active');

        return (
            <Paper>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data === null ? null : this.props.data.map(row => (
                            <TableRow key={row.id}>
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
        this.setState({
            sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc',
            sortBy
        });
    }
}

export default ensureIsAuthorized()(
    ensureDataDecorator<Areas.Account.IUser[], IUserListProps>(loadUsers)(
        ensureTranslationsDecorator<IUserListProps>('account', async () => await import('@bx-translations/account/en'))(
            UserListComponent
        )
    )
);

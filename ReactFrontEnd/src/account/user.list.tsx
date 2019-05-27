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
import { ensureTranslationsDecorator, changeLanguage } from '@bx-utils/decorators/translateDecorator';
import { WithTranslation } from 'react-i18next';

function loadUsers(): Promise<Areas.Account.IUser[]> {
    return new Promise<Areas.Account.IUser[]>(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, login: 'arbor', email: 'arbor@o2.pl', firstName: 'dsa', lastName: 'das asdasda', isActive: true },
            ]);
        }, 500);
    });
}

interface IUserListProps extends ILoadDataProps<Areas.Account.IUser[]>, WithTranslation {

}

@ensureIsAuthorized()
@ensureDataDecorator<Areas.Account.IUser[], IUserListProps>(loadUsers)
@ensureTranslationsDecorator<IUserListProps>()
export default class UserListComponent extends React.Component<IUserListProps> {
    public render(): JSX.Element {
        console.log('props', this.props);
        
        const userNameTranslation = this.props.t('User Name');
        const emailTranslation = this.props.t('Email');
        const isActiveTranslation = this.props.t('Is Active');

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {userNameTranslation}
                                <TableSortLabel
                                    active={true}
                                    direction={'desc'}
                                    onClick={() => { this.props.i18n.changeLanguage('en'); }}></TableSortLabel>
                                </TableCell>
                            <TableCell align="right">
                            <TableSortLabel
                                    active={true}
                                    direction={'desc'}
                                    onClick={() => { }}></TableSortLabel>
                                {emailTranslation}</TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={true}
                                    direction={'asc'}
                                    onClick={() => { }}></TableSortLabel>
                                                    {isActiveTranslation}
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
}

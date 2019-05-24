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

function loadUsers(): Promise<Areas.Account.IUser[]> {
    return Promise.resolve([
        { id: 1, login: 'arbor', email: 'arbor@o2.pl', firstName: 'dsa', lastName: 'das asdasda', isActive: true },
    ]);
}

@ensureIsAuthorized()
@ensureDataDecorator(loadUsers)
export default class UserListComponent extends React.Component<ILoadDataProps<Areas.Account.IUser[]>> {
    public render(): JSX.Element {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                User name
                                <TableSortLabel
                                    active={true}
                                    direction={'desc'}
                                    onClick={() => { }}></TableSortLabel>
                                </TableCell>
                            <TableCell align="right">
                            <TableSortLabel
                                    active={true}
                                    direction={'desc'}
                                    onClick={() => { }}></TableSortLabel>
                                Email</TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={true}
                                    direction={'asc'}
                                    onClick={() => { }}></TableSortLabel>
                                                    Is active
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

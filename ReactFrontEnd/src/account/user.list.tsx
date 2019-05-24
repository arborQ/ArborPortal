import * as React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';

interface ILoadDataProps<T> {
    data: T | null;
}

function ensureIsAuthorized() {
    return (Component: React.ComponentType<any>) => {
        return class NewerClass extends React.Component<any, any> {
            public render(): JSX.Element {
                return (
                    <div>
                        <div>
                            Not authorized :(
                        </div>
                        <Component />
                    </div>
                );
            }
        };
    };
}

function ensureDecorator<K>(loadData: () => Promise<K>) {
    return (Component: React.ComponentType<ILoadDataProps<K>>) => {
        return class NewerClass extends React.Component<ILoadDataProps<K>, { loadedData?: K }> {

            public async componentWillMount() {
                this.setState({ loadedData: undefined });
                const loadedData = await loadData();
                this.setState({ loadedData });
            }

            public render(): JSX.Element {
                return this.state.loadedData === undefined
                    ? <div>Loading data...</div>
                    : <Component data={this.state.loadedData} />;
            }
        };
    };
}

interface IUser {
    id: number;
    userName: string;
    email: string;
    isActive: boolean;
    lastLogin: Date | null;
}

function loadUsers(): Promise<IUser[]> {
    return Promise.resolve([
        { id: 1, userName: 'arbor', email: 'arbor@o2.pl', isActive: true, lastLogin: null },
        { id: 2, userName: 'destructor', email: 'arbor@o2.pl', isActive: false, lastLogin: null },
        { id: 3, userName: 'mistrz', email: 'arbor@o2.pl', isActive: true, lastLogin: null },
    ]);
}

@ensureIsAuthorized()
@ensureDecorator(loadUsers)
export default class UserListComponent extends React.Component<ILoadDataProps<IUser[]>> {
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
                                    {row.userName}
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

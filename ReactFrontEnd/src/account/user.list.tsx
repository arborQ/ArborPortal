import * as React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class UserListComponent extends React.Component {
    public render() : JSX.Element {
        return (
            <div>
               <Table>
                   <TableHead>
                    <TableRow>
                    <TableCell>
                            User name
                        </TableCell>
                        <TableCell>
                            Email
                        </TableCell>
                    </TableRow>
                   </TableHead>
                   <TableBody>

                   </TableBody>
               </Table>
            </div>
        );
    }
}
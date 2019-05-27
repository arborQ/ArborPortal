import * as React from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { ensureDataDecorator, ILoadDataProps } from '@bx-utils/decorators/ensureDataDecorator';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import { dialogDecorator, IDialogProps } from '@bx-utils/decorators/dialogDecorator';
import { ensureTranslationsDecorator } from '@bx-utils/decorators/translateDecorator';
import { WithTranslation } from 'react-i18next';

interface IEditUserProps extends ILoadDataProps<Areas.Account.IUser>, IDialogProps, WithTranslation {

}

function loadEditDetails(): Promise<Areas.Account.IUser> {
    return Promise.resolve({ id: 1, login: 'arbor', email: 'arbor@o2.pl', firstName: 'dsa', lastName: 'das asdasda', isActive: true });
}

@ensureIsAuthorized()
@dialogDecorator<IEditUserProps>('Edit user', () => { alert('ok') })
@ensureDataDecorator<Areas.Account.IUser, IEditUserProps>(loadEditDetails)
@ensureTranslationsDecorator<IEditUserProps>()
export default class UserEditComponent extends React.Component<IEditUserProps> {
    public render(): JSX.Element {
        if (!this.props.data) {
            return <div>no data</div>;
        }

        return (
            <Card>
                <CardContent>
                    <TextField
                        id="username"
                        label="User name"
                        value={this.props.data.login}
                        fullWidth
                        margin="normal"
                        helperText="test test"
                        onChange={() => { }}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        value={this.props.data.email}
                        fullWidth
                        margin="normal"
                        helperText="test test"
                        onChange={() => { }}
                    />

                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" color="primary">
                        Save
                    </Button>
                    <Button size="small" variant="contained" onClick={() => this.props.close()}>
                        Cancel
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

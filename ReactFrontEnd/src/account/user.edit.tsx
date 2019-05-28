import * as React from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
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
@ensureTranslationsDecorator<IEditUserProps>('account')
export default class UserEditComponent extends React.Component<IEditUserProps> {
    public render(): JSX.Element {
        if (!this.props.data) {
            return <div>no data</div>;
        }
        const userNameTranslation = this.props.t('User Name');
        const emailTranslation = this.props.t('Email');
        const isActiveTranslation = this.props.t('Is Active');
        const saveTranslation = this.props.t('Save');
        const cancelTranslation = this.props.t('Cancel');

        return (
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <Card>
                    <CardContent>
                        <TextField
                            id="username"
                            label={userNameTranslation}
                            value={this.props.data.login}
                            fullWidth
                            margin="normal"
                            helperText="test test"
                            onChange={() => { }}
                        />
                        <TextField
                            id="email"
                            label={emailTranslation}
                            value={this.props.data.email}
                            fullWidth
                            margin="normal"
                            helperText="test test"
                            onChange={() => { }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.props.data.isActive}
                                    onChange={() => { }}
                                    value="isActive"
                                    color="primary"
                                />
                            }
                            label={isActiveTranslation}
                        />
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained" color="primary" type="submit">
                            {saveTranslation}
                        </Button>
                        <Button size="small" variant="contained" onClick={() => this.props.close()}>
                            {cancelTranslation}
                        </Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

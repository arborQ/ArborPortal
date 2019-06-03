import * as React from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ensureDataDecorator, ILoadDataProps } from '@bx-utils/decorators/ensureDataDecorator';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import { dialogDecorator, IDialogProps } from '@bx-utils/decorators/dialogDecorator';
import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';
import { validate, stringRange, ValidationResult } from '@bx-utils/validator';
import StateComponent from '@bx-utils/stateComponent';

interface IEditUserProps extends ILoadDataProps<Areas.Account.IUser>, IDialogProps, ITranslationsProps {

}

interface IEditUserState {
    userData: Areas.Account.IUser;
    validation: ValidationResult<Areas.Account.IUser>;
}

function loadEditDetails(): Promise<Areas.Account.IUser> {
    return Promise.resolve({ id: 1, login: 'arbor', email: 'arbor@o2.pl', firstName: 'dsa', lastName: 'das asdasda', isActive: true });
}

// @ensureIsAuthorized()
// @dialogDecorator<IEditUserProps>('Edit user', () => { alert('ok') })
// @ensureDataDecorator<Areas.Account.IUser, IEditUserProps>(loadEditDetails)
// @ensureTranslationsDecorator<IEditUserProps>('account')
class UserEditComponent extends StateComponent<IEditUserProps, IEditUserState> {
    private async updateUserData(nextProps: Partial<Areas.Account.IUser>) {
        const userData = { ...this.state.userData, ...nextProps };

        const validation = await validate<Areas.Account.IUser>({
            login: stringRange(1, 20),
            email: stringRange(5, 40)
        }, userData);

        console.log({ userData });

        this.UpdateState(
            {
                ...this.state,
                userData,
                validation
            }
        )
    }

    public componentWillMount() {
        if (!!this.props.data) {
           const newState = this.UpdateState({ userData: this.props.data });
        }
    }

    public componentWillReceiveProps(nextProps: IEditUserProps) {
        if (!!nextProps.data) {
            this.updateUserData(nextProps.data);
        }
    }

    public render(): JSX.Element {
        if (!this.state || !this.state.userData) {
            return <div>no data</div>;
        }
        const userNameTranslation = this.props.translate('User Name');
        const emailTranslation = this.props.translate('Email');
        const isActiveTranslation = this.props.translate('Is Active');
        const saveTranslation = this.props.translate('Save');
        const cancelTranslation = this.props.translate('Cancel');

        return (
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <Card>
                    <CardContent>
                        <TextField
                            id="username"
                            label={userNameTranslation}
                            value={this.state.userData.login}
                            fullWidth
                            error={!!this.state.validation && !!this.state.validation.details && !!this.state.validation.details.login && !this.state.validation.details.login.isValid}
                            margin="normal"
                            helperText={userNameTranslation}
                            onChange={async (e) => { await this.updateUserData({ login: e.target.value }); }}
                        />
                        <TextField
                            id="email"
                            label={emailTranslation}
                            value={this.state.userData.email}
                            error={!!this.state.validation && !!this.state.validation.details && !!this.state.validation.details.email && !this.state.validation.details.email.isValid}
                            fullWidth
                            margin="normal"
                            helperText={emailTranslation}
                            onChange={async (e) => { await this.updateUserData({ email: e.target.value }); }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.userData.isActive}
                                    onChange={async (e) => { await this.updateUserData({ isActive: e.target.checked }); }}
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
// @ensureIsAuthorized()
// @dialogDecorator<IEditUserProps>('Edit user', () => { alert('ok') })
// @ensureDataDecorator<Areas.Account.IUser, IEditUserProps>(loadEditDetails)
// @ensureTranslationsDecorator<IEditUserProps>('account')

export default ensureIsAuthorized()(
    ensureDataDecorator<Areas.Account.IUser, IEditUserProps>(loadEditDetails)(
        ensureTranslationsDecorator<IEditUserProps>('account')(
            UserEditComponent
        )
    )
)
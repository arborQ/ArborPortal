import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ensureApiDataDecorator } from '@bx-utils/decorators/ensureApiDataDecorator';
import { ensureNavigationDecorator, INavigationProps } from '@bx-utils/decorators/ensureNavigationDecorator';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import { dialogDecorator, IDialogProps } from '@bx-utils/decorators/dialogDecorator';
import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';
import StateComponent from '@bx-utils/stateComponent';
import { editUser } from '@bx-services/users'
interface IEditUserProps extends Utils.Decorators.ILoadDataProps<Areas.Account.IUser>, IDialogProps,
    ITranslationsProps,
    INavigationProps {

}

interface IEditUserState {
    userData: Areas.Account.IUser;
}

@ensureNavigationDecorator()
@ensureIsAuthorized
@ensureApiDataDecorator<Areas.Account.IUser[]>({})
@ensureTranslationsDecorator<IEditUserProps>({ namespace: 'account' })
@dialogDecorator<IEditUserProps>('Edit user')
export default class UserEditComponent extends StateComponent<IEditUserProps, IEditUserState> {
    componentWillMount() {
        if (!!this.props.data) {
            this.UpdateState({ userData: this.props.data });
        }
    }

    render(): JSX.Element {
        if (!this.state || !this.state.userData) {
            return <div>{this.translate('No data')}</div>;
        }

        const userNameTranslation = this.translate('User Name');
        const emailTranslation = this.translate('Email');
        const isActiveTranslation = this.translate('Is Active');
        const saveTranslation = this.translate('Save');
        const cancelTranslation = this.translate('Cancel');

        return (
            <form onSubmit={(e) => { e.preventDefault(); this.save(); }}>
                <Card>
                    <CardContent>
                        <TextField
                            id='username'
                            disabled={true}
                            label={userNameTranslation}
                            value={this.state.userData.login || ''}
                            fullWidth
                            margin='normal'
                            helperText={userNameTranslation}
                            onChange={async (e) => { await this.updateUserData({ login: e.target.value }); }}
                        />
                        <TextField
                            id='email'
                            disabled
                            label={emailTranslation}
                            value={this.state.userData.email || ''}
                            fullWidth
                            margin='normal'
                            helperText={emailTranslation}
                            onChange={async (e) => { await this.updateUserData({ email: e.target.value }); }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.userData.isActive}
                                    onChange={async (e) => {
                                        await this.updateUserData({ isActive: e.target.checked });
                                    }}
                                    value='isActive'
                                    color='primary'
                                />
                            }
                            label={isActiveTranslation}
                        />
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='contained' color='primary' type='submit'>
                            {saveTranslation}
                        </Button>
                        <Button size='small' variant='contained' onClick={() => this.props.goBack()}>
                            {cancelTranslation}
                        </Button>
                    </CardActions>
                </Card>
            </form>
        );
    }

    private async updateUserData(nextProps: Partial<Areas.Account.IUser>) {
        const userData = { ...this.state.userData, ...nextProps };

        this.UpdateState(
            {
                ...this.state,
                userData
            }
        );
    }

    private translate(key: string): string {
        if (this.props.translate === undefined) {
            return key;
        }

        return this.props.translate(key);
    }

    private async save(): Promise<void> {
        if (this.props.data !== null) {
            await editUser(this.state.userData);
            this.props.goBack();
        }
    }
}

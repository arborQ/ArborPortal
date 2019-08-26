import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AsyncButton from '@bx-components/async.button.component';
import { useTranslation } from 'react-i18next';
import { post } from '@bx-utils/ajax';
import FormComponent from '@bx-components/form.consumer';
import Button from '@material-ui/core/Button';
import { withRouter, RouteChildrenProps } from 'react-router';
import CreateUserModel, { validateModel, ValidationResult } from './models/createUser';

interface ICreateUserProps extends RouteChildrenProps {

}

function createUserAction(data: CreateUserModel): Promise<ICreateUserResponse> {
    return post('/api/users/user', data);
}

interface ICreateUserResponse {
    isSuccessfull: boolean;
    createdUserId: number | null;
    errors: Array<{ propertyName: string, errorMessage: string }>;
}

interface ICreateUserReducerState {
    userData: CreateUserModel;
    validation: {
        [P in keyof CreateUserModel]?: string;
    };
}

function updateFormDataReducer(
    state: ICreateUserReducerState,
    action: { type: string, data: Partial<CreateUserModel> | ICreateUserResponse }) {

    if (action.type === 'SERVER_RESPONSE') {
        const { errors } = action.data as ICreateUserResponse;
        const validation: ValidationResult<CreateUserModel> = errors.reduce((pv, cv) => {
            return { ...pv, [cv.propertyName]: cv.errorMessage };
        }, {});

        return {
            ...state, validation
        };
    } else {

        const userData = { ...state.userData, ...action.data };
        const validation = validateModel(userData);

        return {
            ...state, userData, validation
        };
    }
}

export default withRouter(
    function CreateUserComponent({ history }: ICreateUserProps): JSX.Element {
        const { t } = useTranslation();

        const userNameTranslation = t('User Name');
        const firstNameTranslation = t('First Name');
        const lastNameTranslation = t('Last Name');
        const emailTranslation = t('Email');
        const saveTranslation = t('Save');
        const passwordTranslation = t('Password');
        const cancelTranslation = t('Cancel');
        const confirmPasswordTranslation = t('Confirm Password');

        return (
            <FormComponent
                model={new CreateUserModel()}
                validator={CreateUserModel}
                onSubmit={async (userData) => {
                    const response = await createUserAction(userData);
                }}>
                {
                    ({ isLoading, model, validation, updateModel }) => (
                        <Card>
                            <CardContent>
                                <TextField
                                    id='username'
                                    label={userNameTranslation}
                                    value={model.userName}
                                    fullWidth
                                    disabled={isLoading}
                                    margin='normal'
                                    {...validation.userName}
                                    onBlur={(e) => {
                                        updateModel({ userName: e.target.value }, true);
                                    }}
                                    onChange={(e) => {
                                        updateModel({ userName: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='firstName'
                                    label={firstNameTranslation}
                                    value={model.firstName}
                                    fullWidth
                                    disabled={isLoading}
                                    margin='normal'
                                    {...validation.firstName}
                                    onChange={(e) => {
                                        updateModel({ firstName: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='lastName'
                                    label={lastNameTranslation}
                                    value={model.lastName}
                                    fullWidth
                                    disabled={isLoading}
                                    margin='normal'
                                    {...validation.lastName}
                                    onChange={(e) => {
                                        updateModel({ lastName: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='email'
                                    label={emailTranslation}
                                    value={model.emailAddress}
                                    fullWidth
                                    disabled={isLoading}
                                    margin='normal'
                                    {...validation.emailAddress}
                                    onChange={(e) => {
                                        updateModel({ emailAddress: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='password'
                                    label={passwordTranslation}
                                    value={model.password}
                                    fullWidth
                                    disabled={isLoading}
                                    margin='normal'
                                    {...validation.password}
                                    type='password'
                                    onChange={(e) => {
                                        updateModel({ password: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='confirmPassword'
                                    label={confirmPasswordTranslation}
                                    value={model.confirmPassword}
                                    fullWidth
                                    disabled={isLoading}
                                    margin='normal'
                                    {...validation.confirmPassword}
                                    type='password'
                                    onChange={(e) => {
                                        updateModel({ confirmPassword: e.target.value });
                                    }}
                                />
                            </CardContent>
                            <CardActions>
                                <AsyncButton
                                    type='submit'
                                    variant='contained'
                                    disabled={Object.entries(validation).some(a => !!a)}
                                    loading={isLoading}
                                    color='primary'>
                                    {saveTranslation}
                                </AsyncButton>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    disabled={isLoading}
                                    onClick={() => history.push('/')}
                                >
                                    {cancelTranslation}
                                </Button>
                            </CardActions>
                        </Card>
                    )}
            </FormComponent>
        );
    });

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
        const emailTranslation = t('Email');
        const saveTranslation = t('Save');
        const passwordTranslation = t('Password');
        const cancelTranslation = t('Cancel');
        const initData = {
            userData: new CreateUserModel(),
            validation: validateModel(new CreateUserModel())
        };

        const [state, changeUserData] = React.useReducer(updateFormDataReducer, initData);

        const updateState = React.useCallback((partialData: Partial<CreateUserModel>) => {
            changeUserData({
                type: 'UPDATE_FORM',
                data: partialData
            });
        }, [{}]);

        const { userData, validation } = state;

        return (
            <FormComponent onSubmit={async () => {
                const response = await createUserAction(userData);

                if (response.isSuccessfull) {
                    history.push(`/authorize/edit/${response.createdUserId}`);
                } else {
                    changeUserData({
                        type: 'SERVER_RESPONSE',
                        data: response
                    });
                }
            }}>
                {
                    value => (
                        <Card>
                            <CardContent>
                                <TextField
                                    id='username'
                                    label={userNameTranslation}
                                    value={userData.userName}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    error={!!validation.userName}
                                    helperText={t(validation.userName || '')}
                                    onChange={(e) => {
                                        updateState({ userName: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='firstName'
                                    label={userNameTranslation}
                                    value={userData.firstName}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    error={!!validation.firstName}
                                    helperText={t(validation.firstName || '')}
                                    onChange={(e) => {
                                        updateState({ firstName: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='lastName'
                                    label={userNameTranslation}
                                    value={userData.lastName}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    error={!!validation.lastName}
                                    helperText={t(validation.lastName || '')}
                                    onChange={(e) => {
                                        updateState({ lastName: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='email'
                                    label={emailTranslation}
                                    value={userData.emailAddress}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    error={!!validation.emailAddress}
                                    helperText={t(validation.emailAddress || '')}
                                    onChange={(e) => {
                                        updateState({ emailAddress: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='password'
                                    label={passwordTranslation}
                                    value={userData.password}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    error={!!validation.password}
                                    helperText={t(validation.password || '')}
                                    type='password'
                                    onChange={(e) => {
                                        updateState({ password: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='confirmPassword'
                                    label={passwordTranslation}
                                    value={userData.confirmPassword}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    error={!!validation.confirmPassword}
                                    helperText={t(validation.confirmPassword || '')}
                                    type='password'
                                    onChange={(e) => {
                                        updateState({ confirmPassword: e.target.value });
                                    }}
                                />
                            </CardContent>
                            <CardActions>
                                <AsyncButton
                                    type='submit'
                                    variant='contained'
                                    // disabled={Object.keys(validation).filter(k => !!k).length > 0}
                                    loading={value.isLoading}
                                    color='primary'>
                                    {saveTranslation}
                                </AsyncButton>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    disabled={value.isLoading}
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

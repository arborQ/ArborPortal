import { MinLength } from 'class-validator';

export default class LoginModel {
    @MinLength(1, { message: 'Field is required' })
    login: string = '';

    @MinLength(1, { message: 'Field is required' })
    password: string = '';
}

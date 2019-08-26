import { Length } from 'class-validator';

export default class LoginModel {
    @Length(4, 100)
    login: string = '';

    @Length(1)
    password: string = '';
}

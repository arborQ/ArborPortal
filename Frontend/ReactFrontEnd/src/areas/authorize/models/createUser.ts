import { validateSync, Length, IsEmail } from 'class-validator';
import { plainToClass } from 'class-transformer';

export default class CreateUserModel {
    @Length(4, 100)
    userName: string = '';

    @Length(1)
    password: string = '';

    @Length(1)
    confirmPassword: string = '';

    @Length(1)
    firstName: string = '';

    @Length(1)
    lastName: string = '';

    @IsEmail()
    emailAddress: string = '';
}

export type ValidationResult<T> = {
    [P in keyof T]?: string;
};

export function validateModel(model: CreateUserModel): ValidationResult<CreateUserModel> {
    const classModel = plainToClass(CreateUserModel, model);
    const result = validateSync(classModel);

    const confirmPasswordMissmatch = {
        confirmPassword: classModel.password !== classModel.confirmPassword
            ? 'password and confirm password must match'
            : undefined
    };

    return result.reduce((pv, cv) => {
        const [propertyValidation] = [...Object.values(cv.constraints), ...pv[cv.property]];

        return { ...pv, [cv.property]: propertyValidation };
    }, confirmPasswordMissmatch);
}

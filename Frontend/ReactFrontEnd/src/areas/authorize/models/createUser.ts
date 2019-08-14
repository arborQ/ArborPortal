import { validateSync, Length, IsEmail } from 'class-validator';
import { plainToClass } from 'class-transformer';

export default class CreateUserModel {
    @Length(4, 100)
    userName: string = 'arbor';

    @Length(1)
    password: string = 'test';

    @Length(1)
    confirmPassword: string = 'test';

    @Length(1)
    firstName: string = 'test';

    @Length(1)
    lastName: string = 'test';

    @IsEmail()
    emailAddress: string = 'arbor@o2.pl';
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

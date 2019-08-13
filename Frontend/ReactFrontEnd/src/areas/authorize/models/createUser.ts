import { validate, Length, IsEmail, Min, Equals } from "class-validator";
import { plainToClass } from "class-transformer";
import { object } from "prop-types";
export default class createUser {
    @Length(4, 50)
    username: string = '';

    @Min(1)
    password: string = '';

    @Equals('this.password')
    confirmPassword: string = '';

    @IsEmail()
    email: string = '';
}

export async function validateModel(model: createUser): Promise<string> {
    const classModel = plainToClass(createUser, model);
    const result = await validate(classModel);
    console.log({ result });
    return result.map(v => Object.values(v.constraints).join()).join();
}
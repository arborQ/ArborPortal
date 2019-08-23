import * as React from 'react';
import { validateSync, Length, IsEmail } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

type ValidationResult<T> = {
    [P in keyof T]?: string;
};

interface IInnerFormProps<T> {
    children: (props: {
        isLoading: boolean,
        model: T,
        updateModel: (model: Partial<T>, validate?: boolean) => void,
        validation: ValidationResult<T>
    }) => JSX.Element;
    disabled?: boolean;
    onSubmit: () => Promise<void>;
    model: T;
    validator?: ClassType<T>;
}

function validateModel<T>(model: T, classType: ClassType<T>): ValidationResult<T> {
    const classModel = plainToClass<T, T>(classType, model);
    const result = validateSync(classModel);

    return result.reduce((pv, cv) => {
        const [propertyValidation] = [...Object.values(cv.constraints), ...pv[cv.property]];

        return { ...pv, [cv.property]: propertyValidation };
    }, {});
}

export default function FormComponent<T>(props: IInnerFormProps<T>) {
    const { children, onSubmit, disabled, model } = props;
    const [isLoading, changeLoading] = React.useState(!!disabled);

    return (
        <form className='context-form' onSubmit={async (e) => {
            e.preventDefault();
            if (!isLoading) {
                changeLoading(true);
                try {
                    await onSubmit();
                } catch (ex) {
                    console.log(ex);
                } finally {
                    changeLoading(false);
                }
            }
        }}>
            {children({
                isLoading,
                model,
                updateModel: (partial, validate = true) => {
                    console.log({ partial, validate });
                },
                validation: {}
            })}
        </form>
    );
}
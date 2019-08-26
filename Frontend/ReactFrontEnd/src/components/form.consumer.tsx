import * as React from 'react';
import { validateSync, Length, IsEmail } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

type ValidationResult<T> = {
    [P in keyof T]?: {
        error: boolean,
        helperText: string
    };
};

interface IInnerFormProps<T> {
    children: (props: {
        isLoading: boolean,
        model: T,
        updateModel: (model: Partial<T>, validate?: boolean) => void,
        validation: ValidationResult<T>,
    }) => JSX.Element;
    disabled?: boolean;
    onSubmit: (formModel: T) => Promise<T | void>;
    model: T;
    validator?: ClassType<T>;
}

function validateModel<T>(model: T, classType: ClassType<T>): ValidationResult<T> {
    const classModel = plainToClass<T, T>(classType, model);
    const result = validateSync(classModel);

    return result.reduce((pv, cv) => {
        const [propertyValidation] = [...Object.values(cv.constraints), ...pv[cv.property]];

        return { ...pv, [cv.property]: { error: true, helperText: propertyValidation } };
    }, {});
}

export default function FormComponent<T>(props: IInnerFormProps<T>) {
    const { children, onSubmit, disabled, model, validator } = props;
    const [state, updateState] = React.useState({
        isLoading: !!disabled,
        formModel: model,
        validation: {} as ValidationResult<T>,
        serverError: ''
    });

    const { isLoading, formModel, validation } = state;

    return (
        <form className='context-form' onSubmit={async (e) => {
            e.preventDefault();
            if (!isLoading) {
                updateState({ ...state, isLoading: true });
                try {
                    await onSubmit(formModel);
                    updateState({ ...state, isLoading: false });
                } catch (serverError) {
                    console.log(serverError)
                    // updateState({ ...state, isLoading: false, serverError });
                }
            }
        }}>
            {
                state.serverError
                    ? <div>{state.serverError}</div>
                    : null
            }
            {children({
                isLoading,
                model: formModel,
                validation,
                updateModel: (partial, validate = true) => {
                    const newModel: T = { ...formModel, ...partial };
                    const validation = validate && !!validator ? validateModel(newModel, validator) : {} as ValidationResult<T>;

                    updateState({
                        ...state,
                        validation,
                        formModel: newModel
                    });
                },
            })}
        </form>
    );
}
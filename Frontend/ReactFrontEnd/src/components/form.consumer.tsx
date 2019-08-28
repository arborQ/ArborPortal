import * as React from 'react';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { ErrorAdornment, SuccessAdornment } from './adornment';

export enum ValidationScope {
    Info, Warning, Error, Success
}

type ValidationResult<T> = {
    [P in keyof T]?: IPropertyValidationResult;
};

type TouchedResult<T> = {
    [P in keyof T]?: boolean;
};

interface IInnerFormProps<T> {
    children: (props: {
        isLoading: boolean,
        model: T,
        updateModel: (model: Partial<T>, validate?: boolean) => void,
        validation: ValidationResult<T>,
        touched: TouchedResult<T>
    }) => JSX.Element;
    disabled?: boolean;
    onSubmit: (formModel: T) => Promise<T | void>;
    model: T;
    validator?: ClassType<T>;
}

interface IPropertyValidationResult {
    scope: ValidationScope;
    message: string;
}

function calculateTouched<T>(model: Partial<T>, alreadyTouched: TouchedResult<T>): TouchedResult<T> {
    return Object.keys(model).reduce((pv, cv) => {
        return {
            ...pv, [cv]: true
        };
    }, alreadyTouched);
}

function validateModel<T>(model: T, classType: ClassType<T>): ValidationResult<T> {
    const classModel = plainToClass<T, T>(classType, model);
    const result = validateSync(classModel);

    return result.reduce((pv, cv) => {
        const [propertyValidation] = Object.values(cv.constraints);

        return {
            ...pv, [cv.property]: {
                scope: ValidationScope.Error,
                message: propertyValidation
            }
        };
    }, {} as ValidationResult<T>);
}

export default function FormComponent<T>(props: IInnerFormProps<T>) {
    const { children, onSubmit, disabled, model, validator } = props;
    const [state, updateState] = React.useState({
        isLoading: !!disabled,
        formModel: model,
        validation: !!validator ? validateModel(model, validator) : {},
        touched: {} as TouchedResult<T>,
        serverError: ''
    });

    const { isLoading, formModel, validation, touched } = state;

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
                touched,
                updateModel: (partial, validate = true) => {
                    const newModel: T = { ...formModel, ...partial };
                    const touchedProperties = calculateTouched(partial, state.touched);
                    const validated = validate && !!validator
                        ? validateModel(newModel, validator)
                        : {} as ValidationResult<T>;

                    updateState({
                        ...state,
                        validation: validated,
                        formModel: newModel,
                        touched: touchedProperties
                    });
                },
            })}
        </form>
    );
}

export function TextValidationProps(result?: IPropertyValidationResult, touched?: boolean) {
    if (result === undefined) {
        return null;
    }

    return {
        error: result.scope === ValidationScope.Error,
        helperText: touched ? result.message : undefined
    };
}

export function IconValidationProps(result?: IPropertyValidationResult, touched?: boolean) {
    if (result === undefined) {
        if (touched) {
            return {
                error: false,
                InputProps: {
                    endAdornment: <SuccessAdornment />
                }
            };
        }

        return null;
    }

    const endAdornment = result.scope === ValidationScope.Error
        ? <ErrorAdornment message={result.message} size={!!touched ? 'default' : 'small'} />
        : null;

    return {
        error: result.scope === ValidationScope.Error && touched,
        InputProps: {
            endAdornment
        }
    };
}

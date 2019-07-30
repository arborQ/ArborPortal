export type ValidationResult<T> = {
    isValid: boolean;
    messages: string[];
    details?: { [P in keyof T]?: ValidationResult<T[P]>; }
};
export type Validator<T> = (model: T) => Promise<ValidationResult<T>> | ValidationResult<T>;
export type ValidatorOptions<T> = { [P in keyof T]?: Validator<T[P]>; }

export async function validate<T>(options: ValidatorOptions<T>, model: Partial<T>): Promise<ValidationResult<T>> {
    let validationResults: ValidationResult<T> = {
        isValid: true,
        messages: [],
        details: {}
    };

    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            const propertyKey: keyof T = key;

            const modelValue = model[key];
            const validations = options[key] as Validator<any>;
            const result = await validations(modelValue);

            validationResults.isValid = validationResults.isValid && result.isValid;
            if (!!validationResults.details) {
                validationResults.details[propertyKey] = result;
            }

            if (!!result.messages) {
                validationResults.messages = [...(validationResults.messages ? validationResults.messages : []), ...result.messages];
            }
        }
    }

    return validationResults;
}

export const stringRequired: Validator<string> = function(value: string): ValidationResult<string> {
    const isValid = !!value && value.length > 0;

    return {
        isValid, messages: [ 'Value is required' ]
    };
}

export const stringRange = (min: number, max: number):  Validator<string> => {
    const stringRequired: Validator<string> = function(value: string): ValidationResult<string> {
        const isValid = !!value && value.length >= min && value.length <= max;
    
        return {
            isValid, messages: [ `String length must be between ${min} and ${max}.` ]
        };
    };

    return stringRequired;
}

export const compute = <T>(compute: Array<Validator<T>>) => {
    const [first] = compute;

    return first;
};
 
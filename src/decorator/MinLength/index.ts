import { makeValidateDecorator } from '../makeValidateDecorator';
import { ValidateOptions, ValidateData } from '../../interfaces';

export type MinLengthOptions = {
    min: number;
}

export const defaultOptions: ValidateOptions = {
    message: (data: ValidateData<MinLengthOptions>) => {
        return `must be longer than or equal to ${data.options.min} characters`;
    }
}

export const MinLength = (min: number, options?: ValidateOptions) =>
    makeValidateDecorator<MinLengthOptions>(
        { ...defaultOptions, ...options, min },
        ({ value, options }) => {
            return typeof value === 'string' && value.length >= options.min;
        }
    );

export default MinLength;

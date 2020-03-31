import { makeValidateDecorator } from '../makeValidateDecorator';
import { ValidateOptions, ValidateData } from '../../interfaces';

export type MaxLengthOptions = {
    max: number;
}

export const defaultOptions: ValidateOptions = {
    message: (data: ValidateData<MaxLengthOptions>) => {
        return `must be shorter than or equal to ${data.options.max} characters`;
    }
}

export const MaxLength = (max: number, options?: ValidateOptions) =>
    makeValidateDecorator<MaxLengthOptions>(
        { ...defaultOptions, ...options, max },
        ({ value, options }) => {
            return typeof value === 'string' && value.length <= options.max;
        }
    );

export default MaxLength;

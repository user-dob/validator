import { makeValidateDecorator } from '../makeValidateDecorator';
import { ValidateOptions } from '../../interfaces';

export const defaultOptions: ValidateOptions = {
    message: `should not be empty`
}

export const IsNotEmpty = (options?: ValidateOptions) =>
    makeValidateDecorator(
        { ...defaultOptions, ...options },
        ({ value }) => {
            return value !== '' && value !== null && value !== undefined;
        }
    );

export default IsNotEmpty;

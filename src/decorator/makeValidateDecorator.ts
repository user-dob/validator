import { VALIDATE_DECORATOR_METADATA } from '../validate';
import { ValidateOptions, Validate, ValidateClassMetadata } from '../interfaces';

export const makeValidateDecorator = <T>(options: ValidateOptions<T>, validate: Validate<T>) => {
    return (target: object, property: string) => {
        const metadata: ValidateClassMetadata = Reflect.getMetadata(VALIDATE_DECORATOR_METADATA, target) || {};

        metadata[property] = metadata[property] || { items: [] };

        metadata[property].items.push({
            model: target,
            options,
            property,
            validate
        });

        Reflect.defineMetadata(VALIDATE_DECORATOR_METADATA, metadata, target);
    }
}


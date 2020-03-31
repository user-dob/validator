import { ValidateClassMetadata, ValidateErrors, ValidateMessage, ValidateData } from './interfaces';

export const VALIDATE_DECORATOR_METADATA = Symbol.for('VALIDATE_DECORATOR_METADATA');

export const getMessage = (message: ValidateMessage, data: ValidateData): string => {
    if (typeof message === 'function') {
        return message(data);
    }
    return message;
}

export const validate = async (model: object): Promise<ValidateErrors> => {
    const metadata: ValidateClassMetadata = Reflect.getMetadata(VALIDATE_DECORATOR_METADATA, model) || {};

    const items = Object.entries(metadata).map(async ([property, metadata]) => {

        const items = metadata.items.map(async item => {
            const data: ValidateData = {
                model: item.model,
                options: item.options,
                property: item.property,
                value: model[item.property]
            }

            const isValid = await item.validate(data);

            if (!isValid) {
                return getMessage(item.options.message, data);
            }
        });

        const errors = await Promise.all(items);

        return [property, errors.filter(Boolean)];
    });

    const result = await Promise.all(items);
    const errors = result.filter(item => item[1].length !== 0);

    return Object.fromEntries(errors);
}

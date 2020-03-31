import { ValidateClassMetadata } from "../interfaces";
import { VALIDATE_DECORATOR_METADATA } from "../validate";

export const ValidateArray = () => {
    return (target: object, property: string) => {
        const metadata: ValidateClassMetadata = Reflect.getMetadata(VALIDATE_DECORATOR_METADATA, target) || {};

        metadata[property] = metadata[property] || { items: [] };

        metadata[property].isArray = true;

        Reflect.defineMetadata(VALIDATE_DECORATOR_METADATA, metadata, target);
    }
}
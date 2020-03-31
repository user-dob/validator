export type ValidateMessage<T = any> = string | ((data: ValidateData<T>) => string);

export type ValidateOptions<T = any> = {
    label?: string;
    message: ValidateMessage<T>;
} & T;

export type ValidateData<T = any> = {
    value: unknown;
    model: object;
    property: string;
    options: ValidateOptions<T>
}

export type Validate<T = any> = {
    (data: ValidateData<T>): boolean | Promise<boolean>;
}

export type ValidateDecoratorMetadataItem<T = any> = {
    model: object;
    property: string;
    options: ValidateOptions
    validate: Validate<T>;
};

export type ValidateDecoratorMetadata = {
    isArray?: boolean;
    items: ValidateDecoratorMetadataItem[];
};

export type ValidateClassMetadata = Record<string, ValidateDecoratorMetadata>;

export type ValidateErrors = Record<string, string[]>;

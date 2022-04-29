// See more on: https://github.com/typestack/class-validator/blob/develop/src/validation/ValidationError.ts

export default interface ValidationError {
    target?: Record<string, any>;
    property: string;
    value?: any;
    constraints?: {
        [type: string]: string;
    };
    children: ValidationError[];
}
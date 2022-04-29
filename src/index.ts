import { Options } from "./options.interface";
import ValidationError from "./validationError.interface";

/*
 *  This function flattens an array of ValidateError objects,
 *  concatenating the path with an specified delimiter
 */
function flatten(validationErrors: ValidationError[], delimiter: string) {
    return validationErrors.flatMap(error => {
        if (error.children.length === 0 || !error.children) {
            let {children, ...flattenedChild} = error;
            return [flattenedChild];
        }

        const flattenedChildren = flatten(error.children, delimiter);
        return flattenedChildren.map(child => {
            return {
                ...child,
                property: error.property + delimiter + child.property
            }
        })
    });
}

/*
 *  This function calls flattenCore to, effectively, flatten the array
 *  and process the specified options
 */
export function flattenValidationErrors(validationErrors: ValidationError[], options: Options = {}) {
    let flattenedArray = flatten(validationErrors, options.delimiter || '.');

    if (options.omitErrorsMessages) {
        flattenedArray = flattenedArray.map(error => {
            return {
                ...error,
                constraints: Object.keys(error.constraints)
            }
        })
    }

    return flattenedArray;
}



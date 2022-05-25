import { Options } from "./options.interface";
import ValidationError from "./validationError.interface";

/*
 *  This function flattens an array of ValidateError objects,
 *  concatenating the path with an specified delimiter
 */
function flatten(validationErrors: ValidationError[], delimiter: string): any {
    return validationErrors.flatMap(error => {
        if   (!error.children || error.children.length === 0) {
            let {children, ...flattenedChild} = error;
            return [flattenedChild];
        }

        const flattenedChildren = flatten(error.children, delimiter);
        return flattenedChildren.map((child: any) => {
            return {
                ...child,
                property: error.property + delimiter + child.property
            }
        })
    });
}

/*
 *  This function calls flatten(...) to, effectively, flatten the array
 *  and process the specified options
 */
export function flattenValidationErrors(validationErrors: ValidationError[], options: Options = {}) {
    if (options.omitErrorsMessages && options.omitErrorsNames)
        throw 'omitErrorsMessages and omitErrorsNames options are not meant to be used together'
    
    let flattenedArray = flatten(validationErrors, options.delimiter || '.');

    if (options.omitErrorsMessages || options.omitErrorsNames) {
        flattenedArray = flattenedArray.map((error: any) => {
            return {
                ...error,
                constraints: options.omitErrorsMessages 
                                ? Object.keys(error.constraints) 
                                : Object.keys(error.constraints).map((key) => error.constraints[key]),
            }
        })
    }

    return flattenedArray;
}


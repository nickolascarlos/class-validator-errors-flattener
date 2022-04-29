export interface Options {
    /* 
     *  Delimiter with which the path should be concatenated.
     *  Default: .
     */
    delimiter?: string;

    /*
     *  Should message errors be omitted?
     *  If so, constraints names will be shown as an array 
     *  Default: false
     */
    omitErrorsMessages?: boolean;
}
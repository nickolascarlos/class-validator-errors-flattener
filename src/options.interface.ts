export interface Options {
    /* 
     *  Delimiter with which the path should be concatenated.
     *  Default: .
     */
    delimiter?: string;

    /*
     *  Should errors messages be omitted?
     *  If true, constraints property will be an array of the constraints names
     *  Default: false
     */
    omitErrorsMessages?: boolean;

    /*
     *  Should errors names be omitted?
     *  If true, constraints property will be an array of the constraints messages 
     *  Default: false
     */
    omitErrorsNames?: boolean;
}
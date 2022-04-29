import { flattenValidationErrors } from "."
import ValidationError from "./validationError.interface"

describe('Default options', () => {

    test('Flattening a flat ValidationError array', () => {
        const arrayToFlatten: ValidationError[] = [
            {
                "property": "categoryName",
                "children": [],
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "No such service category with id undefined"
                }
            }, 
            {
                "property": "order",
                "children": [],
                "constraints": {
                    "isNumber": "order must be a number conforming to the specified constraints"
                }
            }
        ]
    
        expect(flattenValidationErrors(arrayToFlatten)).toEqual([
            {
                "property": "categoryName",
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "No such service category with id undefined"
                }
            }, 
            {
                "property": "order",
                "constraints": {
                    "isNumber": "order must be a number conforming to the specified constraints"
                }
            }
        ])
    })

    test('Flattening a two-level deep array', () => {
        let arrayToFlatten: ValidationError[] = [
            {
                "property": "categoryName",
                "children": [],
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "categoryName must be a valid service category name"
                }
            }, 
            {
                "property": "0",
                "children": [
                    {
                        "property": "order",
                        "children": [],
                        "constraints": {
                            "isNumber": "order must be a number conforming to the specified constraints"
                        }
                    }
                ]
            }
        ]

        expect(flattenValidationErrors(arrayToFlatten)).toEqual([
            {
                "property": "categoryName",
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "categoryName must be a valid service category name"
                }
            },
            {
                "property": "0.order",
                "constraints": {
                    "isNumber": "order must be a number conforming to the specified constraints"
                }     
            }
        ])
    })
    
    test('Flattening a three-level deep array', () => {
        let arrayToFlatten: ValidationError[] = [
            {
                "property": "categoryName",
                "children": [],
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "categoryName must be a valid service category name"
                }
            }, 
            {
                "property": "0",
                "children": [
                    {
                        "property": "order",
                        "children": [
                            {
                                "property": "name",
                                "children": [],
                                "constraints": {
                                    "isNotEmpty": "name should not be empty",
                                }
                            }
                        ],
                    }
                ]
            }
        ]

        expect(flattenValidationErrors(arrayToFlatten)).toEqual([
            {
                "property": "categoryName",
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "categoryName must be a valid service category name"
                }
            },
            {
                "property": "0.order.name",
                "constraints": {
                    "isNotEmpty": "name should not be empty"
                }     
            }
        ])
    })

})

describe('With custom delimiter', () => {

    test('Flattening a three-level deep array', () => {
        let arrayToFlatten: ValidationError[] = [
            {
                "property": "categoryName",
                "children": [],
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "categoryName must be a valid service category name"
                }
            }, 
            {
                "property": "0",
                "children": [
                    {
                        "property": "order",
                        "children": [
                            {
                                "property": "name",
                                "children": [],
                                "constraints": {
                                    "isNotEmpty": "name should not be empty",
                                }
                            }
                        ],
                    }
                ]
            }
        ]

        expect(flattenValidationErrors(arrayToFlatten, {delimiter: '>'})).toEqual([
            {
                "property": "categoryName",
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "categoryName must be a valid service category name"
                }
            },
            {
                "property": "0>order>name",
                "constraints": {
                    "isNotEmpty": "name should not be empty"
                }     
            }
        ])
    })
})

describe('With omitErrorsMessages on', () => {

    test('Flattening a three-level deep array', () => {
        let arrayToFlatten: ValidationError[] = [
            {
                "property": "categoryName",
                "children": [],
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "categoryName must be a valid service category name"
                }
            }, 
            {
                "property": "0",
                "children": [
                    {
                        "property": "order",
                        "children": [
                            {
                                "property": "name",
                                "children": [],
                                "constraints": {
                                    "isNotEmpty": "name should not be empty",
                                }
                            }
                        ],
                    }
                ]
            }
        ]

        expect(flattenValidationErrors(arrayToFlatten, {omitErrorsMessages: true})).toEqual([
            {
                "property": "categoryName",
                "constraints": ["isNotEmpty", "isValidServiceCategoryName"]
            },
            {
                "property": "0.order.name",
                "constraints": ["isNotEmpty"]   
            }
        ])
    })
})

describe('With omitErrorsMessages on and custom delimiter', () => {

    test('Flattening a three-level deep array', () => {
        let arrayToFlatten: ValidationError[] = [
            {
                "property": "categoryName",
                "children": [],
                "constraints": {
                    "isNotEmpty": "categoryName should not be empty",
                    "isValidServiceCategoryName": "categoryName must be a valid service category name"
                }
            }, 
            {
                "property": "0",
                "children": [
                    {
                        "property": "order",
                        "children": [
                            {
                                "property": "name",
                                "children": [],
                                "constraints": {
                                    "isNotEmpty": "name should not be empty",
                                }
                            }
                        ],
                    }
                ]
            }
        ]

        expect(flattenValidationErrors(arrayToFlatten, {
            omitErrorsMessages: true,
            delimiter: ','
        })).toEqual([
            {
                "property": "categoryName",
                "constraints": ["isNotEmpty", "isValidServiceCategoryName"]
            },
            {
                "property": "0,order,name",
                "constraints": ["isNotEmpty"]   
            }
        ])
    })

})
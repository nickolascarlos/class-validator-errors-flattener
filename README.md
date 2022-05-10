# class-validator-errors-flattener

A flattener to class-validator's ValidationError array

![Build status](https://github.com/nickolascarlos/class-validator-errors-flattener/workflows/Testing/badge.svg)
![NPM version](https://badge.fury.io/js/class-validator-errors-flattener.svg)
![Issues](https://img.shields.io/bitbucket/issues/nickolascarlos/class-validator-errors-flattener)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
![Downloads](https://img.shields.io/npm/dm/class-validator-errors-flattener)

## Install

```sh
npm install class-validator-errors-flattener
```

## Usage

To flatten the class-validator ValidationError array, just pass it to the flattenValidationErrors function

Example:
```ts
import { validate, MinLength, Min, IsNotEmpty, ValidateNested } from 'class-validator';
import { flattenValidationErrors } from 'class-validators-errors-flattener'

class Address {
  @IsNotEmpty()
  city = "Goiânia";

  @IsNotEmpty()
  state = "";
}

class User {
  @ValidateNested()
  address: Address = new Address();

  @Min(12)
  age = 11;
}
  
  const errors = await validate(new User(), {validationError: { target: false, value: false } });
  const flattenedErrors = flattenValidationErrors(errors);
  
  /* Flat: property as path instead of nested ValidationError objects
    [
      {
        property: 'address.state',
        constraints: { isNotEmpty: 'state should not be empty' }
      },
      {
        property: 'age',
        constraints: { min: 'age must not be less than 12' }
      }
    ]
  */

```

### Options

The flattenValidationErrors accepts an options parameter:

```ts
export interface Options {
    delimiter?: string;
    omitErrorsMessages?: boolean;
    omitErrorsNames?: boolean;
}
```

- delimiter
  - Defines the delimiter with which the path should be concatenated
  - Default: ```.```

- omitErrorsMessages
  - Sets whether errors messages should be omitted
  - If true, constraints property will be an array of the constraints names
  - Default: ```false```

- omitErrorsNames
  - Sets whether errors names should be omitted
  - If true, constraints property will be an array of the constraints messages
  - Default: ```false```

## License
Licensed under [The Unlicense](LICENSE)

# class-validator-errors-flattener

A flattener to class-validator's ValidationError array

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
}
```

- delimiter
  - Defines the delimiter with which the path should be concatenated
  - Default: ```.```

- omitErrorsMessages
  - Sets whether errors messages should be omitted
  - If so, constraints names will be shown as an array 
  - Default: ```false```

## License
Licensed under [The Unlicense](LICENSE)

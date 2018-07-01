# Easy field or password validation

validates fields or password using default option or js object

## Rules

```
rules :
    min: 8,
    max: 50,
    containsNumber: true,
    containsCharacter: true,
    containsUpperCase: true,
    containsNoSpace: true,
    excludedWords: ['password', 'hello', '123456'],
    fieldName: 'Password',
    overWriteOptions: false,
```

## Usage

```
import fieldValidator from 'easy-field-validator'
```

```
const test = fieldValidator('StrongPass555')

console.log(test) -> { valid: true, message: 'Password is valid' }
```

```
const test = fieldValidator('weak')

console.log(test) -> 
{ 
    'valid': false 
    'errors': [
        'Password is less than 8 characters'
        'Password does not contain a number'
        'Password does not contain a upper character'
    ]
    'message': 'Password is invalid' }
```

### Custom options

All the rules can be modified as follows

```
const test = fieldValidator('StrongUserName123', { min: 10, fieldName: 'UserName' })

console.log(test) -> { valid: true, message: 'UserName is valid' }
```

The rules object can be overwritten as follows

```
const test = fieldValidator('1', { overWriteOptions: true, min: 1, fieldName: 'Single Char'})

console.log(test) -> { valid: true, message: 'Single Char is valid' }
```


## Authors

*   **Luke Robertson** - [DesignAlchemy](https://github.com/designalchemy/)

## License

Public

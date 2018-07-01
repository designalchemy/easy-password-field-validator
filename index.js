const fieldValidator = (password, params = {}) => {
  const defaultOptions = {
    min: 8,
    max: 50,
    containsNumber: true,
    containsCharacter: true,
    containsUpperCase: true,
    containsNoSpace: true,
    excludedWords: ['password', 'hello', '123456'],
    fieldName: 'Password',
    overWriteOptions: false,
  }

  const options = params.overWriteOptions ? params : { ...defaultOptions, ...params }

  const {
    min,
    max,
    containsNumber,
    containsCharacter,
    containsUpperCase,
    containsNoSpace,
    excludedWords,
    fieldName
  } = options
  const passwordLength = password.length

  const errors = []

  if (min && passwordLength < min) {
    errors.push(`${fieldName} is less than ${min} characters`)
  }

  if (max && passwordLength > max) {
    errors.push(`${fieldName} is more than ${max} characters`)
  }

  if (containsNumber && !/[0-9]/g.test(password)) {
    errors.push(`${fieldName} does not contain a number`)
  }

  if (containsCharacter && !/[a-z]/g.test(password)) {
    errors.push(`${fieldName} does not contain a lower character`)
  }

  if (containsUpperCase && !/[A-Z]/g.test(password)) {
    errors.push(`${fieldName} does not contain a upper character`)
  }

  if (containsNoSpace && /\s/g.test(password)) {
    errors.push(`${fieldName} contains a space`)
  }

  if (excludedWords.length > 0 && containedBannedWords(password, excludedWords).length > 0) {
    errors.push(
      `${fieldName} contains banned word: ${containedBannedWords(password, excludedWords)}`
    )
  }

  if (errors.length) {
    return {
      valid: false,
      errors,
      message: `${fieldName} is invalid`
    }
  }

  return { valid: true, message: `${fieldName} is valid` }
}

const containedBannedWords = (password, words) =>
  words.filter(item => password.toLowerCase().includes(item.toLowerCase()))

module.exports = fieldValidator

const assert = require('assert')

const fieldValidator = require('./index')

describe('Test field validator', () => {
  describe('fieldValidator', () => {
    it('Should return valid if strong password', () => {
      const intialData = 'strongPassIsValid1111'
      const expectedData = { valid: true, message: 'Password is valid' }
      const result = fieldValidator(intialData)
      assert.deepEqual(expectedData, result)
    })
    it('Should fail if less than 8 chars', () => {
      const intialData = 'P1p3p4'
      const expectedData = {
        valid: false,
        errors: ['Password is less than 8 characters'],
        message: 'Password is invalid'
      }
      const result = fieldValidator(intialData)
      assert.deepEqual(expectedData, result)
    })
    it('Should fail if more than 50 chars', () => {
      const intialData =
        'P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4P1p3p4'
      const expectedData = {
        valid: false,
        errors: ['Password is more than 50 characters'],
        message: 'Password is invalid'
      }
      const result = fieldValidator(intialData)
      assert.deepEqual(expectedData, result)
    })
    it('Should fail if no number', () => {
      const intialData = 'StrongPassNoNumber'
      const expectedData = {
        valid: false,
        errors: ['Password does not contain a number'],
        message: 'Password is invalid'
      }
      const result = fieldValidator(intialData)
      assert.deepEqual(expectedData, result)
    })
    it('Should fail if no characters', () => {
      const intialData = '1239583290'
      const expectedData = {
        valid: false,
        errors: [
          'Password does not contain a lower character',
          'Password does not contain a upper character'
        ],
        message: 'Password is invalid'
      }
      const result = fieldValidator(intialData)
      assert.deepEqual(expectedData, result)
    })
    it('Should fail if no upper characters', () => {
      const intialData = '1234asdqwe'
      const expectedData = {
        valid: false,
        errors: ['Password does not contain a upper character'],
        message: 'Password is invalid'
      }
      const result = fieldValidator(intialData)
      assert.deepEqual(expectedData, result)
    })
    it('Should fail if no lower characters', () => {
      const intialData = '1234ASDQWE'
      const expectedData = {
        valid: false,
        errors: ['Password does not contain a lower character'],
        message: 'Password is invalid'
      }
      const result = fieldValidator(intialData)
      assert.deepEqual(expectedData, result)
    })
    it('Should fail if space present', () => {
      const intialData = '123ASD qwe'
      const expectedData = {
        valid: false,
        errors: ['Password contains a space'],
        message: 'Password is invalid'
      }
      const result = fieldValidator(intialData)
      assert.deepEqual(expectedData, result)
    })
    it('Should fail if banned word present', () => {
      const intialData = ['password123A', 'hello123A', '1234567As']
      const expectedData = [
        {
          valid: false,
          errors: ['Password contains banned word: password'],
          message: 'Password is invalid'
        },
        {
          valid: false,
          errors: ['Password contains banned word: hello'],
          message: 'Password is invalid'
        },
        {
          valid: false,
          errors: ['Password contains banned word: 123456'],
          message: 'Password is invalid'
        }
      ]
      const result = intialData.map(fieldValidator)
      assert.deepEqual(expectedData, result)
    })
  })
})

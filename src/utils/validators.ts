import { isEmpty, isEmptyArray, isNullOrUndefined } from './index'
export const requiredValidator = (value: unknown) => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
      return 'This field is required'
  
    return !!String(value).trim().length || 'This field is required'
  }
export const emailValidator = (value: unknown) => {
    if (isEmpty(value))
      return true
  
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
    if (Array.isArray(value))
      return value.every(val => re.test(String(val))) || 'The Email field must be a valid email'
  
    return re.test(String(value)) || 'The Email field must be a valid email'
  }

  export const passwordValidator = (password: string) => {
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  
    const validPassword = regExp.test(password)
  
    return (
      // eslint-disable-next-line operator-linebreak
      validPassword ||
      'The length of the password must be between 8 and 30. Password must contain at least one uppercase letter, one lowercase letter one number and one special character.'
    )
  }

  export const validateWithFieldName = (value: unknown, errorMessage: string) => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === '')
      return `${errorMessage}`
  
    return !!String(value).trim().length || `${errorMessage}`
   
  }
  
import validator from 'validator'
import React from 'react'
import { ErrorMsgDiv } from '../components/styled'

export const required = value => {
  if (!value.toString().trim().length) {
    return <ErrorMsgDiv>Задължително поле</ErrorMsgDiv>
  }
}

export const email = value => {
  if (!validator.isEmail(value)) {
    return <ErrorMsgDiv>Невалиден e-mail</ErrorMsgDiv>
  }
}

export const gt = (value, props) => {
  if (value.toString().trim().length < 10) {
    return (
      <ErrorMsgDiv>
        Съобщението трябва да съдържа повече от 10 символа.
      </ErrorMsgDiv>
    )
  }
}

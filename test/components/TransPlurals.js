import React from 'react'
import {PropTypes} from 'prop-types'

export function TransPluralize1({}, context) {
  return (
    <span>{context.t(['una noche', '{n} noches', 'n'], {n: 1})}</span>
  )
}

export function TransPluralize2({}, context) {
  return (
    <span>{context.t(['una noche', '{n} noches', 'n'], {n: 5})}</span>
  )
}

TransPluralize1.contextTypes = {
  t: PropTypes.func.isRequired
}

TransPluralize2.contextTypes = {
  t: PropTypes.func.isRequired
}

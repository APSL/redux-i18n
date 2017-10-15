import React from 'react'
import {PropTypes} from 'prop-types'

export function TransFormPluralize1({n}, context) {
  return (
    <span>{context.t(['{n} banane', '{n} bananes', 'n'], {n: n})}</span>
  )
}

TransFormPluralize1.contextTypes = {
  t: PropTypes.func.isRequired
}

export function TransFormPluralize2({n}, context) {
  return (
    <span>{context.t(['plural 1/{n}', 'plural 2/{n}', 'plural 3/{n}', 'n'], {n: n})}</span>
  )
}

TransFormPluralize2.contextTypes = {
  t: PropTypes.func.isRequired
}
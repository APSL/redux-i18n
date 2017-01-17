import React from 'react'

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
  t: React.PropTypes.func.isRequired
}

TransPluralize2.contextTypes = {
  t: React.PropTypes.func.isRequired
}


import React from 'react'
import {PropTypes} from 'prop-types'

const TransWithObjParams = ({}, context) => {
  const user = {name: 'Cesc'}
  const name = <span>{user.name}</span>
  return <div>{context.t('Hello {name}', {name: name})}</div>
}

TransWithObjParams.contextTypes = {
  t: PropTypes.func.isRequired
}

export default TransWithObjParams

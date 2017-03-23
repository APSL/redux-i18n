import React from 'react'

const TransWithObjParams = ({}, context) => {
  const user = {name: 'Cesc'}
  const name = <span>{user.name}</span>
  return <div>{context.t('Hello {name}', {name: name})}</div>
}

TransWithObjParams.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TransWithObjParams

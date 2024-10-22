import React from 'react'
import "./keyCard.scss"

export const KeyCard = ({keyDataName, value}) => {
  return (
    <div>{keyDataName} : {value}</div>
  )
}

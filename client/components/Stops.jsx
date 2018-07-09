import React from 'react'

export default function Stops(props) {
  const stopList = ["WING", "WELL", "JOHN", "TAWA", "PETO", "NAEN", "WATE", "PARA", "6000", "6001", "5500" ]

  let selections = stopList.map((station) => {
    return <option key={station} value={station}>{station}</option>
  })

  return (
    <select defaultValue='WING' onChange={props.callback}>
        {selections}
    </select>
  )
}
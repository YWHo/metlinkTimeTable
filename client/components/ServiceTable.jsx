import React from 'react'

export default function Services(props) {
  const serviceRows = Array.from(props.services).map((service, idx) => {
    const minsToDeparture = Math.floor(service.DisplayDepartureSeconds/60)

    return (
      <tr key={"r" + idx}>
        <td>{service.DestinationStopName}</td>
        <td>{service.DepartureStatus}</td>
        <td>{minsToDeparture}</td>
      </tr>)
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Destination Stop Name</th>
          <th>Departure Status</th>
          <th>Minutes till next departure</th>
        </tr>
      </thead>
      <tbody>
        {serviceRows}
      </tbody>
    </table>
  )
}
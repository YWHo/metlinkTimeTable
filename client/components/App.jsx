import React from 'react'
import {getScheduleAll, getScheduleRealTime} from '../api'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stopName: "",
      services: []
    }

    getScheduleAll('WING')
      .then(data => {
        this.setState({
          stopName : data.StopName,
          services : data.Services
        })
      }).catch(err => {
        console.log("Error: ", err)
      })
  }

  showServices() {
    return Array.from(this.state.services)
      .map((service, idx) => {
        return (
          <tr key={"r" + idx}>
            <td>{service.DestinationStopName}</td>
            <td>{service.DepartureStatus}</td>
            <td>{Math.floor(service.DisplayDepartureSeconds/60)}</td>
          </tr>)
      })
  }

  render() {
    const {stopName, services} = this.state
    console.log("services: ", services)

    return (
      <div>
      <h1>{this.state.stopName}</h1>
      <table border="1" width="400px">
        <thead>
          <tr>
            <td>Destination Stop Name</td>
            <td>Departure Status</td>
            <td>Minutes till next departure</td>
          </tr>
        </thead>
        <tbody>
          {this.showServices()}
        </tbody>
      </table>
      </div>
    )
  }
}



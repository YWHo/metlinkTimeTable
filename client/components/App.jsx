import React from 'react'
import {getScheduleAll, getScheduleRealTime} from '../api'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stopName: "[loading...]",
      services: [],
      date: "",
      time: ""
    }
    this.count = 0;
    this.isFetching = false
  }

  componentWillMount() {
    setInterval(()=>{
      this.refreshData()
      this.updateCurrentDateTime()
    }, 1000);
  }

  refreshData() {
    this.count++
    if (this.count > 5) {
      this.count = 0
    } else if (this.count == 1 && !this.isFetching) {
      this.isFetching = true
      getScheduleAll('WING')
      .then(data => {
        this.isFetching = false
        this.state.stopName = data.StopName
        this.state.services = data.Services
      })
      .catch(err => {
        console.log("Error: ", err)
      })
    }
  }

  updateCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB')
    const time = now.toLocaleTimeString('en-US')
    const dateTime = 'Date: ' + date + '<br>Time: ' + time;
    this.setState({
      date, time
    })
  }

  showServices() {
    return Array.from(this.state.services)
      .map((service, idx) => {
        const minsToDeparture = Math.floor(service.DisplayDepartureSeconds/60)

        return (
          <tr key={"r" + idx}>
            <td>{service.DestinationStopName}</td>
            <td>{service.DepartureStatus}</td>
            <td>{minsToDeparture}</td>
          </tr>)
      })
  }

  render() {
    const {stopName, services} = this.state

    return (
      <div>
        <h1>{this.state.stopName}</h1>
        <div>Date: {this.state.date}</div>
        <div>Time: {this.state.time}</div>
        <table border="1" width="400px">
          <thead>
            <tr>
              <th>Destination Stop Name</th>
              <th>Departure Status</th>
              <th>Minutes till next departure</th>
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



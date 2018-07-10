import React from 'react'
import {getScheduleAll, getScheduleRealTime} from '../api'
import Stops from './Stops'
import ServiceTable from './ServiceTable'
import TwinButtons from './TwinButtons'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stopName: "[loading...]",
      services: [],
      date: "",
      time: "",
      isRealTime: true,
      stopCode: "WING"
    }

    this.isFetching = false
    this.resetCount()
    this.selectStation = this.selectStation.bind(this)
    this.updateRealtime = this.updateRealtime.bind(this)
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
      this.fetchSchedule()
    }
  }

  fetchSchedule() {
    this.isFetching = true
    if (this.state.isRealTime) {
      getScheduleRealTime(this.state.stopCode)
      .then(data => {
        this.isFetching = false
        this.state.stopName = data.StopName
        this.state.services = data.Services
      })
      .catch(err => {
        console.log("Error: ", err)
      })
    } else {
      getScheduleAll(this.state.stopCode)
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

  updateRealtime(isRealTime) {
    if (this.state.isRealTime == isRealTime) return
    this.resetCount()
    this.setState({isRealTime})
  }

  resetCount() {
    this.count = 0
  }

  selectStation(e) {
    if (e.target.value) {
      this.resetCount()
      const stopCode = e.target.value
      this.setState({stopCode})
    }
  }

  render() {
    const {stopName, services} = this.state

    return (
      <div>
        <h1>metlink Time Table</h1>
        <div>Date: {this.state.date}</div>
        <div>Time: {this.state.time}</div>
        <Stops callback={this.selectStation}/>
        <h2>{this.state.stopName}</h2>
        <TwinButtons btnId1="btnRealTime" labelBtn1="Realtime" btnId2="btnAll" labelBtn2="All" isBtn1Active={this.state.isRealTime} callback={this.updateRealtime} />
        <ServiceTable services={this.state.services} />
      </div>
    )
  }
}



import request from 'superagent'

const timeTableUrl = 'http://localhost:3000/timeTable'

export function getScheduleAll (stationCode) {
  return new Promise((resolve, reject) => {
    request.get(`${timeTableUrl}/${stationCode}`).end((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.body)
      }
    })
  })
}

export function getScheduleRealTime (stationCode) {
  return getScheduleAll(stationCode).then(data => {
    const StopName = data.StopName
    const Services = Array.from(data.Services).filter(
      service => service.IsRealtime
    )
    return {
      StopName,
      Services
    }
  })
}

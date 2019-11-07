import request from 'superagent'

const timeTableUrl = '/timeTable'

export function getScheduleAll (stationCode) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${timeTableUrl}/${stationCode}`
    request
      .get(fullUrl)
      .then(res => {
        resolve(res.body)
      })
      .catch(err => {
        reject(err)
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

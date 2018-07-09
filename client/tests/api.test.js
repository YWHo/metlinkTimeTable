import request from 'supertest'
import nock from 'nock'
import { getScheduleAll, getScheduleRealTime } from '../api'

let testData = null
let interceptAPI = null

beforeEach(() => {
  testData = {
    Station: 'Blala Station',
    Services: [
      {
        ServiceID: 'HVL',
        IsRealtime: true,
        Direction: 'Outbound'
      },
      {
        ServiceID: 'IJK',
        IsRealtime: false,
        Direction: 'Inbound'
      }
    ]
  }

  // Begin intercepting
  interceptAPI = nock('http://localhost:3000')
    .get('/timeTable/WING')
    .reply(200, testData)
})

afterEach(() => {
  interceptAPI.done() // end intercept
})

test('retrieve all schedules from a stop', () => {
  return getScheduleAll('WING').then(data => {
    expect(data.hasOwnProperty('Services')).toBe(true)
    expect(data.Services.length).toBe(testData.Services.length)
  })
})

test('retrieve realtime schedules from a stop', () => {
  return getScheduleRealTime('WING').then(data => {
    expect(data.hasOwnProperty('Services')).toBe(true)
    expect(data.Services.length).toBe(1)
    expect(data.Services[0].IsRealtime).toBe(true)
  })
})

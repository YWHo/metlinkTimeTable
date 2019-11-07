import nock from 'nock'
import { getScheduleAll, getScheduleRealTime } from './apiRequester'

describe('api test', () => {
  let testData, interceptAPI

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
    interceptAPI = nock('http://localhost')
      .get('/timeTable/WING')
      .reply(200, testData)
  })

  afterEach(() => {
    interceptAPI.done() // end intercept
    nock.cleanAll()
  })

  it('retrieve all schedules from a stop', () => {
    return getScheduleAll('WING').then(data => {
      expect(data.hasOwnProperty('Services')).toBe(true)
      expect(data.Services.length).toBe(testData.Services.length)
    })
  })

  it('retrieve realtime schedules from a stop', () => {
    return getScheduleRealTime('WING').then(data => {
      expect(data.hasOwnProperty('Services')).toBe(true)
      expect(data.Services.length).toBe(1)
      expect(data.Services[0].IsRealtime).toBe(true)
    })
  })
})

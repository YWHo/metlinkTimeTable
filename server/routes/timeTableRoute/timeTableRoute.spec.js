import request from 'supertest'
import nock from 'nock'
import server from '../../server'

describe('GET /timeTable/WING', () => {
  const testData = {
    LastModified: '2018-07-09T20:34:56+12:00',
    Stop: {
      Name: 'Wingate Station',
      Sms: 'WING',
      Farezone: '5'
    },
    Notices: [],
    Services: [
      {
        ServiceID: 'HVL',
        IsRealtime: true,
        Direction: 'Outbound',
        OperatorRef: 'RAIL',
        OriginStopID: 'WELL',
        OriginStopName: 'WgtnStn',
        DestinationStopID: 'UPPE',
        DestinationStopName: 'UPPE - All stops'
      }
    ]
  }

  // Begin intercepting
  let interceptAPI = nock('https://www.metlink.org.nz')
    .get('/api/v1/StopDepartures/WING')
    .reply(200, testData)

  it('return JSON data', () => {
    return request(server)
      .get('/timeTable/WING')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        interceptAPI.done() // end intercept
        expect(res.body.hasOwnProperty('StopName')).toBe(true)
        expect(res.body.hasOwnProperty('Services')).toBe(true)
        expect(res.body.Services[0].hasOwnProperty('IsRealtime')).toBe(true)
      })
  })
})

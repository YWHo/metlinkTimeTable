import request from 'supertest'
import server from '../../server'

describe('GET /user/157', () => {
  it('returns userID 157 data', () => {
    const expected = 157
    return request(server)
      .get('/user/' + expected)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.ID).toBe(expected)
      })
  })
})

import request from 'supertest'
import server from '../server'

test('GET /user/234 returns userID 234 data', () => {
  const expected = 234
  return request(server)
    .get('/user/' + expected)
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      expect(res.body.ID).toBe(expected)
    })
})

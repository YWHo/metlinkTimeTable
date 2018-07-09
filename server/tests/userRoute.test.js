const request = require('supertest')

const server = require('../server')

test('GET /234 returns userID 234 data', () => {
  const expected = 234
  return request(server)
    .get('/user/' + expected)
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      console.log('res.body: ', res.body)
      expect(res.body.ID).toBe(expected)
    })
})

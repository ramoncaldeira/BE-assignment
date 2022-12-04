const request = require('supertest')
const app = require('../app')

describe('Contracts', () => {
  describe('GET /contracts/:id', () => {
    it('responds with 404 when contract is not found', function(done) {
      request(app)
        .get('/contracts/999')
        .set('profile_id', 1)
        .expect(404, done)
    })
  })
})
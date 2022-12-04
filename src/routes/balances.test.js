const request = require('supertest')
const app = require('../app')

describe('Balances', () => {
  describe('POST /balances/deposit/:userId', () => {
    it('responds with 403 when profile is not a client', (done) => {
      request(app)
        .post('/balances/deposit/1')
        .set('profile_id', 5)
        .expect(403, done)
    })

    it('handles concurrency with consistency', async () => {
      const firstResponse = await request(app)
        .post('/balances/deposit/1')
        .send({amount: 50})
        .set('profile_id', 2)

      const initialBalance = firstResponse.body.balance
      const amountsToDeposit = [10, 20, 30, 40, 50] // 150

      await Promise.all(amountsToDeposit.map(amount => (
        request(app)
          .post('/balances/deposit/1')
          .send({amount})
          .set('profile_id', 2)
      )))

      const lastResponse = await request(app)
        .post('/balances/deposit/1')
        .send({amount: 50})
        .set('profile_id', 2)
      
      expect(lastResponse.body.balance).toEqual(initialBalance + 200)
    })
  })
})
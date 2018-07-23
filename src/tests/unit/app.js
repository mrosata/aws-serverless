const rp = require('request-promise')
const chai = require('chai')
const expect = chai.expect


describe('Endpoint /hello', function () {
  it('returns hello world message response', async () => {
    const result = await rp.get('http://127.0.0.1:3000/hello')
      .catch(err => {
        return err.message
      })

    expect(result).to.be.an('object')
    expect(result.status).to.equal(200)
    expect(result.body).to.be.an('object')
    expect(result.body.message).to.be.equal('Hello World')
  })
})

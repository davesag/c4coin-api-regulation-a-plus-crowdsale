const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()

describe('rest', () => {
  const fakeController = () => {}

  const fakeRoutes = {
    get: {
      '/': fakeController
    },
    bogus: {
      '/': fakeController
    }
  }

  const rest = proxyquire('../../../src/utils/rest', {
    '../routes': fakeRoutes
  })

  const app = {
    get: sinon.spy(),
    bogus: sinon.spy()
  }

  before(() => {
    rest(app)
  })

  it("registers app.get('/', fakeController)", () => {
    expect(app.get).to.have.been.calledWith('/', fakeController)
  })

  it("does not attempt to call app.bogus('/', fakeController)", () => {
    expect(app.bogus).not.to.have.been.called
  })
})

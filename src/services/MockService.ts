/* eslint-disable no-undef */
import { cleanup } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { TEST_RESPONSE_DATA } from '../common/constants'

export default class MockService {
  static initialize () {
    const server = setupServer(
      rest.get('/weather', (_, res, ctx) => {
        return res(ctx.json(TEST_RESPONSE_DATA))
      })
    )
    beforeAll(() => server.listen())
    afterEach(() => {
      cleanup()
      server.resetHandlers()
    })
    afterAll(() => {
      server.close()
    })
  }
}

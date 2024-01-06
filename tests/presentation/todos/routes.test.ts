import request from 'supertest'
import { testServer } from '../../test-server'

describe('todos/routes.ts', () => {


  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(() => {
    testServer.close()
  })

  test('should return all todos api/todos', async () => {


    const response = await request(testServer.app)
      .get('/api/todos')
      .expect(200);

    console.log(response.body)

  })

})
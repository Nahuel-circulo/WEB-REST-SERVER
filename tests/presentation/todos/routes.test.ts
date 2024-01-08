import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres'

describe('todos/routes.ts', () => {


  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(() => {
    testServer.close()
  })

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  })

  const todo1 = { text: 'Hola Mundo 1' }
  const todo2 = { text: 'Hola Mundo 2' }

  test('should return all todos api/todos', async () => {

    await prisma.todo.createMany({
      data: [todo1, todo2]
    })

    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBe(null);

  })


  test('should return a TODO api/todo/:id', async () => {

    const todo = await prisma.todo.create({
      data: todo1
    })

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo1.text,
      completedAt: null,
    })

  })

  test('should return a 404 NotFound api/todo/:id', async () => {

    const todoID = 999;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoID}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoID} not found` })

  })

  test('should create a TODO api/todo', async () => {


    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    })

  })


  test('should return error if text is not present on Create todo', async () => {

    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({})
      .expect(400);

    expect(body).toEqual({ error: 'text is required' })

  })

  test('should return error if text is empty on Create todo', async () => {

    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({text:''})
      .expect(400);

    expect(body).toEqual({ error: 'text is required' })

  })

})
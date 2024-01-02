import { Request, Response } from "express"

const todos = [
  {
    id: 1,
    text: 'Learn Docker',
    createdAt: new Date()
  },
  {
    id: 2,
    text: 'Learn CI/CD',
    createdAt: new Date()
  },
  {
    id: 3,
    text: 'Learn SVG Animations',
    createdAt: new Date()
  },
]

export class TodosController {

  constructor() { }


  public getTodos = (req: Request, res: Response) => {
    return res.json(todos)
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'ID argument is not a number'
      })
    }
    const todo = todos.find(todo => todo.id === id)
    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found'
      })
    }
    return res.json(todo)
  }

}
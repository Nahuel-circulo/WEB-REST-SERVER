import { Request, Response } from "express"

const todos = [
  {
    id: 1,
    text: 'Learn Docker',
    completedAt: new Date()
  },
  {
    id: 2,
    text: 'Learn CI/CD',
    completedAt: null
  },
  {
    id: 3,
    text: 'Learn SVG Animations',
    completedAt: new Date()
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

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if ( !text ) return res.status( 400 ).json( { error: 'Text property is required' } );
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null
    };

    todos.push( newTodo );

    res.json( newTodo );
  }

}
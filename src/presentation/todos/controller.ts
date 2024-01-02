import { Request, Response } from "express"
import { prisma } from "../../data/postgres"

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


  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    return res.json(todos)
  }

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'ID argument is not a number'
      })
    }
    const todo = await prisma.todo.findFirst({
      where: {
        id
      }
    })

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found'
      })
    }
    return res.json(todo)
  }

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text property is required' });

    const todo = await prisma.todo.create({
      data: {
        text
      }
    })

    res.json(todo);
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findFirst({
      where: {
        id
      }
    })

    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: {
        id
      },
      data: {
        completedAt: (completedAt) ? new Date(completedAt) : null,
        text
      }
    })

    res.json(updatedTodo);

  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({
      where: {
        id
      }
    });

    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    const deleted = await prisma.todo.delete({
      where: {
        id
      }
    });

    (deleted)
      ? res.json({ message: `Todo with id ${id} deleted` })
      : res.status(500).json({ error: `Todo with id ${id} do not exist` });

  }

}
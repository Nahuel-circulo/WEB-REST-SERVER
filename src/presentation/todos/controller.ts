import { Request, Response } from "express"


export class TodosController {

  constructor() { }


  public getTodos = (req: Request, res: Response) => {

    res.json([
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
    ])
  }

}
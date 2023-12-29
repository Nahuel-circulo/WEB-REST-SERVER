import { Router } from "express";


export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.get('/api/todos', (req, res) => {
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
    })


    return router;
  }

}
import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRespositoryImpl } from "../../infrastructure/repository/todo.respository.impl";

export class TodoRoutes {

  static get routes(): Router {

    const router = Router();
    const todoDatasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRespositoryImpl(todoDatasource);

    const todoController = new TodosController(todoRepository)
    
    router.get('/', todoController.getTodos)
    router.get('/:id', todoController.getTodoById)
    router.post('/', todoController.createTodo)
    router.put('/:id', todoController.updateTodo)
    router.delete('/:id', todoController.deleteTodo );
    
    return router;
  }

}
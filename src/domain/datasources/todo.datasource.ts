import { CreateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {

  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
  
  //TODO: paginacion
  abstract getAll(): Promise<TodoEntity[]>;

  abstract getById(id: string): Promise<TodoEntity>;

  abstract updateById(id: string, updateTodoDto: CreateTodoDto): Promise<TodoEntity>;
  
  abstract deleteById(id: string): Promise<TodoEntity>;

}
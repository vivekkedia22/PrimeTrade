import { TODO_STATUS } from "../constants/todoStatus";
import { Todo } from "../models/todo.model";
import type { TodoDocument } from "../models/todo.model";
import type { CreateTodoInput } from "../validation/todo.validation";

export const createTodoOps = async (
  todoData: CreateTodoInput
): Promise<TodoDocument | null> => {
  const todo = await Todo.create(todoData);
  return todo;
};

export const findAllTodos = async (title: string): Promise<TodoDocument[]> => {
  const todos = title ? await Todo.find({ title: { $regex: title, $options: "i" } }) : await Todo.find();
  return todos;
};

export const findAllTodosAdmin = async (title: string): Promise<TodoDocument[]> => {
  const todos = title ? await Todo.find({ title: { $regex: title, $options: "i" } }).populate("ownerId", "name email") : await Todo.find().populate("ownerId", "name email");
  return todos;
};

export const findTodoById = async (todoId: string): Promise<TodoDocument | null> => {
  const todo = await Todo.findById(todoId);
  return todo;
};

export const findMyTodos = async (userId: string): Promise<TodoDocument[]> => {
  const todos = await Todo.find({ ownerId: userId });
  return todos;
};

export const updateTodoStatus = async (
  todoId: string,
  status: TODO_STATUS
): Promise<TodoDocument | null> => {
  const todo = await Todo.findByIdAndUpdate(
    todoId,
    { $set: { status } },
    { new: true }
  );
  return todo;
};

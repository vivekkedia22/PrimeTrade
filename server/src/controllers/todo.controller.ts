import type { Request, Response } from "express";
import { asyncHandler } from "../utils/apihandler";
import { createTodoOps, findAllTodos, findTodoById, findAllTodosAdmin, findMyTodos, updateTodoStatus } from "../services/todo.service";
import { ApiError } from "../utils/apierror";
import { ApiResponse } from "../utils/apiresponse";
import { TODO_STATUS } from "../constants/todoStatus";
import { redisClient } from "../utils/redisClient";

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  const todo = await createTodoOps({ ...req.body, ownerId: req.user._id ,status:TODO_STATUS.open});
  if (!todo) throw new ApiError(500, "Todo creation failed");
  res.status(201).json(new ApiResponse(201, todo, "Todo created"));
});

export const getAllTodosAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { title = "" } = req.query as { title?: string };
  const todos = await findAllTodosAdmin(title);
  res.status(200).json(new ApiResponse(200, todos, "All Todos retrieved (Admin)"));
});

export const getMyTodos = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  const todos = await findMyTodos(req.user._id);
  res.status(200).json(new ApiResponse(200, todos, "My Todos retrieved"));
});

export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
  if(!req.params.id){
    throw new ApiError(400, "Todo ID is required");
  }
  const todo = await findTodoById(req.params.id);
  if (!todo) throw new ApiError(404, "Todo not found");
  res.status(200).json(new ApiResponse(200, todo, "Todo retrieved"));
});

export const updateTodoStatusController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  const { id } = req.params;
  if(!id){
    throw new ApiError(400, "Todo ID is required");
  }
  const { status } = req.body;

  if (!Object.values(TODO_STATUS).includes(status)) {
    throw new ApiError(400, "Invalid todo status");
  }

  const updatedTodo = await updateTodoStatus(id, status);
  await redisClient.del(`todos:user:${req.user._id}`)
  await redisClient.del(`admin:todos`)
  if (!updatedTodo) throw new ApiError(404, "Todo not found");
  res.status(200).json(new ApiResponse(200, updatedTodo, "Todo status updated"));
});
import { body } from 'express-validator';

export interface CreateTodoInput {
  title: string;
  description: string;
  ownerId: string;
}

export const validateCreateTodo = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

export const validateTodoStatus = [
  body('status').isIn(['open', 'assigned', 'completed']).withMessage('Invalid todo status'),
];
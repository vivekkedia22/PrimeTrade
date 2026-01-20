import { Router } from 'express';
import { createTodo, getAllTodosAdmin, getMyTodos, getTodoById, updateTodoStatusController } from '../controllers/todo.controller';
import { validateCreateTodo, validateTodoStatus } from '../validation/todo.validation';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { authMiddleware, authorize } from '../middlewares/auth.middleware';
import { cache } from '../middlewares/cache.middleware';
import { USER_ROLES } from '../constants/roles';

const router = Router();

router.post('/todo', authMiddleware, validateCreateTodo, validationMiddleware, createTodo);

router.get('/todo/admin', authMiddleware, authorize(USER_ROLES.ADMIN), cache(() => "admin:todos"), getAllTodosAdmin);
router.get('/todo/me', authMiddleware, cache((req) => `todos:user:${req.user?._id}`), getMyTodos);
router.get('/todo/:id', authMiddleware, getTodoById);
router.patch('/todo/:id/status', authMiddleware,validateTodoStatus, validationMiddleware, updateTodoStatusController);
export default router;

type UserRoleLiteral = 'ADMIN' | 'USER';

type TodoStatusLiteral = 'open' | 'assigned' | 'completed';

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRoleLiteral;
    createdAt: string;
}

interface Todo {
    id: string;
    title: string;
    description: string;
    ownerId: User;
    status: TodoStatusLiteral;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

interface ApiErrorResponse {
    statusCode: number;
    message: string;
    errors: any[];
    success: boolean;
}

export {
    User,
    Todo,
    ApiResponse,
    ApiErrorResponse,
    UserRoleLiteral,
    TodoStatusLiteral
}

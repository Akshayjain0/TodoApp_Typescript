import { ReactNode, createContext, useContext, useState } from "react";

// Context section and logic

export type Todo = {
	id: string;
	task: string;
	completed: boolean;
	createdAt: Date;
};
export type TodosContext = {
	todos: Todo[];
	handleAddTodo: (task: string) => void; //call signature
	toggleTodoAsCompleted: (id: string) => void;
	handleDeleteTodo: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

// Provider section and logic

export type TodosProviderProps = {
	children: ReactNode;
};
export const TodosProvider = ({ children }: TodosProviderProps) => {
	const [todos, setTodos] = useState<Todo[]>(() => {
		try {
			const newTodos = localStorage.getItem('todos') || "[]";
			return JSON.parse(newTodos) as Todo[]
		} catch (error) {
			return []
		}
	});
	const handleAddTodo = (task: string) => {
		setTodos((prev) => {
			const newTodos: Todo[] = [
				{
					id: Math.random().toString(),
					task: task,
					completed: false,
					createdAt: new Date(),
				},
				...prev,
			];
			// console.log("my previous todos: " + prev);
			// console.log(newTodos);
			localStorage.setItem('todos', JSON.stringify(newTodos));

			return newTodos;
		});
	};
	const toggleTodoAsCompleted = (id: string) => {
		setTodos((prev) => {
			const newTodos: Todo[] = prev.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed: !todo.completed };
				} else {
					return todo;
				}
			});
			localStorage.setItem('todos', JSON.stringify(newTodos));
			return newTodos;
		});
	};
	const handleDeleteTodo = (id: string) => {
		setTodos((prev) => {
			let newTodos = prev.filter((todo) => {
				return todo.id !== id;
			});
			localStorage.setItem('todos', JSON.stringify(newTodos));
			return newTodos;
		});
	};
	return (
		<todosContext.Provider
			value={{
				todos,
				handleAddTodo,
				toggleTodoAsCompleted,
				handleDeleteTodo,
			}}
		>
			{children}
		</todosContext.Provider>
	);
};

// Consumer section and logic( Context API)

export const useTodos = () => {
	const todoConsumer = useContext(todosContext);
	if (!todoConsumer) {
		throw new Error("useTodos used outside of Provider");
	}
	return todoConsumer;
};

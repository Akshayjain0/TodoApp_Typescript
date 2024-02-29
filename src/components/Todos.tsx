import { useSearchParams } from "react-router-dom";
import { useTodos } from "../store/todos";

const Todos = () => {
	const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();
  const [searchParams] = useSearchParams();
  
  let todosData = searchParams.get('todos');


  let filterData = todos;
  
  if (todosData === "active") {
    filterData = filterData.filter((task)=> !task.completed)
  }

  if (todosData === "completed") {
    filterData = filterData.filter((task) => task.completed);
  }

	// console.log(filterData);
	return (
		<ul className="main-task">
			{filterData?.map((todo) => (
				<li key={todo.id}>
					<input
						type='checkbox'
						id={`todo-${todo.id}`}
						checked={todo.completed}
						onChange={() => toggleTodoAsCompleted(todo.id)}
					/>
					<label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
					{todo.completed && (
						<button
							type='button'
							onClick={() => handleDeleteTodo(todo.id)}
						>
							Delete
						</button>
					)}
				</li>
			))}
		</ul>
	);
};

export default Todos;

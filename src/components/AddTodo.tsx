import { useState } from 'react'
import { useTodos } from '../store/todos';

const AddTodo: React.FC = () => {
    const { handleAddTodo } = useTodos();
    const [todo, setTodo] = useState('');
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleAddTodo(todo);
        setTodo('')
    }
  return (
      <form onSubmit={handleFormSubmit}> 
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <button type='submit'>Add</button>
    </form>
  )
}

export default AddTodo
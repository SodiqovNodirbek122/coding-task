import { useEffect, useState } from "react"
import API from "../api"

function Dashboard() {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const response = await API.get("/todos")
    setTodos(response.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async () => {
    await API.post("/todos", { text })
    setText("")
    fetchTodos()
  }

  const suggestTodo = async () => {
    const response = await API.post("/ai/suggest", { task: text })
    for (let index = 0; index < response.data.length; index++) {
      const element = response.data[index]
      await API.post("/todos", { text: element })
    }
    fetchTodos()
  }

  const deleteTask = async (id) => {
    await API.delete(`/todos/${id}`)
    fetchTodos()
  }

  const completeTask = async (id) => {
    await API.put(`/todos/${id}`, {
      text: todos.find((todo) => todo._id === id).text,
      completed: true,
    })
    fetchTodos()
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="text"
        placeholder="Task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={suggestTodo}>Suggest</button>
      <ul>
        {todos.map((todo) => (
          <li
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            key={todo._id}
          >
            {todo.text}
            <button onClick={() => completeTask(todo._id)}>Complete</button>
            <button onClick={() => deleteTask(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard

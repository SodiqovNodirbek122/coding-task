import express from "express"
import Todo from "../models/Todo.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id })
    res.json(todos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", auth, async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      user: req.user.id,
    })
    const newTodo = await todo.save()
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }
    res.json(todo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }
    todo.text = req.body.text
    todo.completed = req.body.completed
    const updatedTodo = await todo.save()
    res.json(updatedTodo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }
    await todo.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    })
    res.json({ message: "Todo deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

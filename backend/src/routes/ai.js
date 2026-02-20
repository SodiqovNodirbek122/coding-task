import express from "express"
import auth from "../middleware/auth.js"
import OpenAI from "openai"

const router = express.Router()

router.post("/suggest", auth, async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const { task } = req.body
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Break this task into 5-7 short actionable todo items. Task: ${task}`,
        },
      ],
    })

    res.json({ suggestion: response.choices[0].message.content })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

# Smart Todo Coding Challenge

Build a Smart Todo app with authentication and AI-powered task suggestions.

## Rules

1. **Screen-record the entire coding process** - no cuts, no edits
2. **Narrate as you code** - explain your decisions and thought process (in English/Russian/Uzbek)
3. **Allowed**: ChatGPT, Google, Stack Overflow, documentation, copy-pasting snippets, asking AI questions, IDE autocomplete/inline suggestions (Copilot, Codeium, etc.)
4. **NOT allowed**: Running AI agents in autonomous mode that build the app in one shot (e.g., Cursor Agent, Claude Code in agent mode, Devin, etc.)

## Challenge Requirements

### Backend (Node.js + Express + MongoDB)
- [ ] Register endpoint (`POST /api/auth/register`)
- [ ] Login endpoint (`POST /api/auth/login`) - returns JWT
- [ ] Create todo (`POST /api/todos`) - protected
- [ ] List todos (`GET /api/todos`) - protected, user's own todos only
- [ ] Delete todo (`DELETE /api/todos/:id`) - protected
- [ ] Toggle todo (`PATCH /api/todos/:id`) - protected
- [ ] AI suggestions (`POST /api/ai/suggest`) - takes a general task, returns 5-7 action items

### Frontend (React)
- [ ] Register page
- [ ] Login page
- [ ] Dashboard (protected - only accessible when logged in)
- [ ] Input field to add a todo
- [ ] "Suggest" button - calls AI endpoint and displays suggestions
- [ ] Add suggestions to todo list with one click
- [ ] List of todos
- [ ] Mark todo as done/undone
- [ ] Delete todo

### Authorization
- Each user can only see and manage their own todos
- Backend must enforce proper authorization checks

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API key (or any LLM API)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and OpenAI API key
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Submit

- GitHub repo link
- Unedited screen recording (upload to YouTube, Loom, Google Drive, etc.)
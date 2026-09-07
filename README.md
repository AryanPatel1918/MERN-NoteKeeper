# 📝 NoteKeeper

A full-stack note-taking application built with the **MERN stack**. NoteKeeper allows users to create, view, edit, and delete notes through a responsive React interface backed by an Express REST API and MongoDB database.

The application also includes **API rate limiting with Upstash Redis**, responsive styling with **Tailwind CSS and DaisyUI**, and user feedback through toast notifications.

## 🌐 Live Demo

[**Try NoteKeeper Live →**](https://mern-notekeeper-1azc.onrender.com/)

## 🚀 Features

* Create new notes
* View all notes
* View individual notes
* Edit existing notes
* Delete notes with confirmation
* Notes sorted by most recently updated
* Input validation for empty titles and content
* Loading states while fetching or saving data
* Error handling for server and network failures
* API rate limiting
* Responsive design for mobile, tablet, and desktop
* Toast notifications for successful and failed operations
* Production-ready frontend build served by the Express backend

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* DaisyUI
* Lucide React
* React Hot Toast
* Vite

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* Upstash Redis
* Upstash Rate Limit
* CORS
* dotenv

## 📁 Project Structure

```text
MERN-NoteKeeper/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── upstash.js
│   │
│   ├── controllers/
│   │   └── noteController.js
│   │
│   ├── middleware/
│   │   └── rateLimiter.js
│   │
│   ├── models/
│   │   └── Note.js
│   │
│   ├── routes/
│   │   └── noteRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BackButton.jsx
│   │   │   ├── BackendErrorState.jsx
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── EmptyNotesState.jsx
│   │   │   ├── LoadingOverlay.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   └── RateLimitedUI.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── CreateNote.jsx
│   │   │   ├── EditNote.jsx
│   │   │   ├── Home.jsx
│   │   │   └── NoteDetails.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── eslint.config.js
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── .gitignore
├── package.json
├── LICENSE
└── README.md
```

## 🔄 Application Architecture

The application follows a typical full-stack MERN architecture:

```text
React Frontend
      │
      │ Axios HTTP Requests
      ↓
Vite Development Proxy
      │
      ↓
Express REST API
      │
      ├── Rate Limiting
      │
      ↓
Controllers
      │
      ↓
Mongoose
      │
      ↓
MongoDB
```

In development, Vite proxies `/api` requests from the React application to the Express server running on port `5000`.

## 🔌 API Endpoints

All note endpoints are prefixed with `/api/notes`.

| Method   | Endpoint         | Description       |
| -------- | ---------------- | ----------------- |
| `GET`    | `/api/notes`     | Get all notes     |
| `GET`    | `/api/notes/:id` | Get a note by ID  |
| `POST`   | `/api/notes`     | Create a new note |
| `PUT`    | `/api/notes/:id` | Update a note     |
| `DELETE` | `/api/notes/:id` | Delete a note     |

### Example Note

```json
{
  "title": "Grocery List",
  "content": "Apples, bread, cheese"
}
```

Each note also receives automatic `createdAt` and `updatedAt` timestamps through the Mongoose schema.

## ⚡ Rate Limiting

The backend uses **Upstash Redis** with a sliding-window rate limiter.

The current configuration allows:

```text
20 requests per 20 seconds
```

Requests exceeding the limit receive:

```http
429 Too Many Requests
```

The frontend handles these responses by displaying an appropriate notification or rate-limit UI.

## 💻 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* An Upstash Redis database

### 1. Clone the repository

```bash
git clone https://github.com/AryanPatel1918/MERN-NoteKeeper.git
cd MERN-NoteKeeper
```

### 2. Configure environment variables

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
PORT=5000
NODE_ENV=development
```

Replace the placeholder values with your MongoDB and Upstash credentials.

> Never commit your `.env` file or expose your database credentials publicly.

### 3. Install dependencies

From the project root:

```bash
npm run build
```

This installs the backend and frontend dependencies and creates the frontend production build.

Alternatively, dependencies can be installed separately:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4. Start the backend

From the project root:

```bash
npm start
```

The Express server will start on:

```text
http://localhost:5000
```

### 5. Start the frontend in development

Open another terminal:

```bash
cd frontend
npm run dev
```

The Vite development server will normally run at:

```text
http://localhost:5173
```

The Vite proxy automatically forwards `/api` requests to the Express backend.

## 🏗️ Production

The root project includes a production build script:

```bash
npm run build
```

This:

1. Installs backend dependencies
2. Installs frontend dependencies
3. Builds the React application with Vite
4. Creates the production files inside `frontend/dist`

When `NODE_ENV=production`, the Express server serves the React production build directly.

Start the production application with:

```bash
npm start
```

## 🎨 UI & Responsive Design

The frontend uses **Tailwind CSS** and **DaisyUI** for styling.

The application uses DaisyUI's `forest` theme and includes responsive layouts for different screen sizes.

The notes grid adapts based on the viewport:

```text
Mobile       → 1 column
Medium       → 2 columns
Large        → 3 columns
```

The UI also includes dedicated states for:

* Loading
* Empty notes
* Backend/server errors
* Rate limiting
* Delete confirmation

## 📸 Screenshots

*Add screenshots of the application here.*

For example:

```markdown
![Home Page](screenshots/home.png)

![Create Note](screenshots/create-note.png)

![Note Details](screenshots/note-details.png)
```

## 🧪 Error Handling

The application handles several types of errors.

### HTTP errors

The frontend checks `error.response` to determine whether the server returned an HTTP error.

For example:

```text
429 → Rate limit exceeded
404 → Note not found
500 → Server error
```

### Network errors

If the request fails without receiving a response from the server, the application displays a network/server connectivity message.

### Validation

The Create and Edit pages prevent users from submitting notes with empty titles or content.

Input is trimmed before being sent to the API.

## 📌 Future Improvements

Potential improvements include:

* User authentication and authorization
* User-specific notes
* Search and filtering
* Note categories/tags
* Rich-text editing
* Pagination
* Note pinning
* Dark/light theme selection
* Improved API error handling
* Per-user/IP rate limiting
* Automated tests
* Improved backend validation
* Deployment with a production database

## 📄 License

This project is licensed under the terms of the MIT License.

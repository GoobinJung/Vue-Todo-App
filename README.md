# Todo App

A to-do list web application built with Vue 3. Users can create an account, sign in, and organize tasks into separate lists. Each task includes a name, description, and state, such as `complete` or `in-progress`.

Developed in Visual Studio Code using Vue's Composition API, Vue Router, and Axios. This repository contains the frontend; user accounts and task data are handled by a separate backend API.

## Features

- User registration, login, and logout
- Create, rename, and delete to-do lists
- Add, edit, and delete tasks within a list
- Update task names, descriptions, and states
- Display the current user's name
- Redirect users to the login page when no authentication token is stored

## Tech Stack

| Technology | Purpose |
|---|---|
| Vue 3 | Components and reactive state |
| Vue Router 4 | Page navigation and route guards |
| Axios | HTTP requests and authentication headers |
| Vite 4 | Development server and production builds |
| JavaScript, HTML, CSS | Application logic, structure, and styling |
| Visual Studio Code | Development environment |

## Getting Started

### Requirements

- Node.js and npm
- A compatible backend API running at the configured address

### Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/GoobinJung/todo-vue.git
cd todo-vue
npm ci
```

Open the folder in VS Code and run the development server from the integrated terminal:

```bash
npm run dev
```

The configured development address is **http://localhost:8081**. Use the address printed in the terminal if that port is already occupied.

The repository recommends the **Vue - Official** extension for VS Code.

### Using the App

1. Open the app and select **Click to add new user** to register.
2. Sign in with the account you created.
3. Select **Add** or **ADD LIST** to create a list.
4. Open a list to add tasks or edit its name.
5. Use **Save** to update a task and **Delete** to remove a task or list.

Task state is entered as text in the current list editor.

## API Configuration

API requests are defined in [`src/services/TodoServices.js`](src/services/TodoServices.js).

| Environment | API base URL |
|---|---|
| Development | `http://localhost/todoapi/` |
| Production | `/todoapi/` on the same origin as the frontend |

The backend must provide endpoints for user registration, login/logout, user details, list management, and task management under `lists/:listId/items`.

Login uses an HTTP Basic authorization header. The returned token is stored in `localStorage` and attached to subsequent authenticated requests as a Bearer token. The backend is responsible for validating tokens and enforcing access to user data.

For local development, the API must allow requests from the frontend origin, including the authorization header and the HTTP methods used by the app. If your API runs at a different address, update `TodoServices.js` accordingly. Starting the frontend alone does not provide the backend or database.

## Build

```bash
npm run build
```

Vite writes the production files to `dist/`. To preview the build locally:

```bash
npm run preview
```

The production base path is currently set to `/todo-frontend-vue3/` in [`vite.config.js`](vite.config.js). Change it to match your deployment path. The hosting server should serve `index.html` for frontend routes because the app uses Vue Router's HTML5 history mode.

## Project Structure

| Path | Contents |
|---|---|
| `src/App.vue` | Navigation bar and main application layout |
| `src/main.js` | Application entry point |
| `src/router.js` | Routes and login redirect logic |
| `src/views/` | Login, registration, list, and task-editing pages |
| `src/components/` | List and task display components |
| `src/services/TodoServices.js` | API calls and authentication headers |
| `src/style.css` | Shared styles |
| `vite.config.js` | Development server and build configuration |

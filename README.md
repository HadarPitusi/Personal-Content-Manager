# 📘 React RESTful API App – Full-Stack Project

This project is part of a **Full-Stack Web Development course**. It demonstrates a complete React application that interacts with a RESTful API to manage users, todos, posts, albums, and photos.

---

## 🔧 Technologies Used

- ⚛️ **React** (with Hooks, Router, Forms)
- 🗄️ **JSON Server** (local fake REST API)
- ✨ **JavaScript** (ES6+, async/await, fetch)
- 💾 **Local Storage** – for session management and persistence
- 🎨 **CSS** – Separate files for clean and modular design

---

## 📦 Project Structure

project-root/
├── client/ # React frontend application
├── server/ # JSON Server backend with db.json
├── node_modules/ # Project dependencies
└── README.md


---

## ✨ Features

### 🔐 Login & Register
- Validates against users in the JSON Server
- Password is matched against the `website` field
- Stores session in `localStorage`

### 🏠 Home Page
- Displays user full name
- Navigation to Info, Todos, Posts, Albums, Logout

### ✅ Todos Page
- View todos list for the logged-in user
- Search, sort (by ID, title, status)
- Add / Edit / Delete todos
- Mark as complete/incomplete

### 📝 Posts Page
- List of user posts with titles and IDs
- Search posts
- Add / Edit / Delete posts
- View post content and related comments
- Add comment (only by current user)
- Edit / Delete own comments

### 📷 Albums Page
- View albums by logged-in user
- Lazy-load photos within albums
- Add / Edit / Delete photos
- Add new albums

### 🚪 Logout
- Clears localStorage and returns to login page

### 🎨 Styling
- The entire application is styled using custom CSS files.
- Each page (Todos, Posts, Albums, Info) uses a dedicated CSS file for modular and consistent styling.
- The design is clean, responsive, and user-friendly.
---

## 🗂 Routing

| Route           | Description                  |
|----------------|------------------------------|
| `/login`       | Login page                   |
| `/register`    | Register new user            |
| `/home`        | Main application dashboard   |
| `/todos`       | Todos management             |
| `/posts`       | Posts and comments section   |
| `/albums`      | Albums and photo management  |
| `/users/:id/albums/:aid/photos/:pid` | Deep linking with informative URLs |

---

## 🧪 Notes

- The backend does not persist changes – it’s a mock REST API (based on [JSONPlaceholder](https://jsonplaceholder.typicode.com/))
- You can run the local server using `json-server --watch db.json --port 3001`

---

## 📜 License

This project is part of an educational course. For academic use only.

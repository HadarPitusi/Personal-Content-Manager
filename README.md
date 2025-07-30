React RESTful API App – Full-Stack Project
This project is part of a Full-Stack Web Development course. It demonstrates a complete React application that interacts with a RESTful API to manage users, todos, posts, albums, and photos.

🔧 Technologies Used
React (with Hooks, Router, Forms)

JSON Server (local fake REST API)

JavaScript (ES6+, async/await, fetch)

Local Storage for session management

📦 Project Structure
client/ – React frontend application

server/ – JSON Server backend with a local db.json

node_modules/ – Project dependencies

✨ Features
Login & Register – with validation against users in the JSON Server

Home Page – after login, shows user info and navigation

Todos Page – view, search, sort, add, update, delete todos

Posts Page – manage posts and associated comments

Albums Page – view albums, manage photos, lazy-load images

Logout – clears session from localStorage

🗂 Routing
/login – Login page

/register – User registration

/home – Main app page

/todos, /posts, /albums – Feature sections

Informative URL patterns like /users/1/albums/2/photos/5
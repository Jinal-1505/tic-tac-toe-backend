# **tic-tac-toe-backend**

## Description

This backend system powers a Turn-Based Multiplayer **Tic-Tac-Toe Game**, built with **Express.js**, **Mongoose**, and **Socket.io**. It features user authentication, real-time game room management, turn-based gameplay, and a leaderboard system to track player performance.

## Installation Guide

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Jinal-1505/tic-tac-toe-backend.git
   cd your-project-name
   ```

2. **Install dependencies**:
   This project uses **Node.js** and **npm** (Node package manager). To install the required dependencies, run:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory of the project.
   - Copy the content from `.sample.env` to `.env` and modify the values as needed.
     You can find the sample file here: [**.sample.env**](./.sample.env).

4. **Start the server**:
   Once the dependencies are installed and environment variables are set up, start the server:

   ```bash
   npm run serve
   ```

   This will start the server at `http://localhost:3000`.

## Available Scripts

Here are the available npm scripts in the project:

- **`start`**: Starts the server after building the project. The entry point is `dist/src/server.js`.

  ```bash
  npm run start
  ```

- **`start:dev`**: Starts the development server with `nodemon` and `ts-node` for live reloading.
  ```bash
  npm run start:dev
  ```

## Available Scripts

Here are the available npm scripts in the project:

- **`start`**: Starts the server after building the project. The entry point is `dist/src/server.js`.

  ```bash
  npm run start
  ```

- **`start:dev`**: Starts the development server with `nodemon` and `ts-node` for live reloading.
  ```bash
  npm run start:dev
  ```

---

## **Features**

### **1. User Authentication**

- API for user registration and login.
- JWT-based authentication for secure access.
- Session management for authenticated users.

### **2. Game Room Management**

- **Create Game Room**:
  - Fields: `roomName`, `createdBy` (player ID), and `isPrivate` (boolean).
  - Generates a unique join code for private rooms.
- **Join Game Room**:
  - Public rooms: Join by room ID.
  - Private rooms: Join using the unique join code.
- **List Active Rooms**:
  - Retrieves all public rooms with available spots.

### **3. Game Logic**

- Players take turns to make moves.
- Move validation:
  - Ensures moves are within bounds and follow the turn order.
  - Detects game results (win, loss, or draw).
- Real-time gameplay using WebSockets:
  - **Start Game**: Notifies players when the game starts.
  - **Player Move**: Broadcasts the player's move to the opponent.
  - **Game End**: Notifies both players of the result (win/loss/draw).

### **4. Game State Management**

- Represents the game board using a 3x3 matrix (`boardState` field).
- Updates the board state after each move and switches the turn.

### **5. Leaderboard**

- Tracks wins, losses, and draws for each player in the `users` collection.
- API to fetch the top 10 players based on their win count.

---

## **Technologies Used**

- **Node.js** with **Express.js** for building APIs.
- **MongoDB** for database storage.
- **Socket.io** for real-time communication.
- **JWT** for authentication.

---

## License

This project is licensed under the MIT License.

## Author

### **Jinal Mistry**

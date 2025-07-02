# Mongo Academy Frontend

## Description

The **Frontend** of the **Mongo Academy** platform allows users to practice **MongoDB queries** in an interactive and user-friendly environment. It integrates with the **Backend API** to run queries, authenticate users via **Google OAuth** and **Email/Password**, and displays real-time results through **WebSockets**.

This project is built using **React**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit** for state management.

---

## 🔧 Technologies Used

* **Frontend Framework:** React.js (with TypeScript)
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS
* **Authentication:** Google OAuth, Email/Password (JWT-based authentication)
* **Real-time Communication:** WebSockets (via Socket.IO)
* **CI/CD:** GitHub Actions

---

## 🧰 Local Development Setup

### Prerequisites

1. **Node.js** (>=22.x)
2. **Yarn** (recommended) or **npm** for package management

### 1. Clone the repository

### 2. Install dependencies

```bash
yarn install
# OR if you're using npm
npm install
```

### 3. Set up Environment Variables

Before starting the frontend application, make sure to create a `.env.development` file in your project’s root directory with the following content (modify values as needed):

```bash
PORT
REACT_APP_BACKEND_URL
REACT_APP_GOOGLE_CLIENT_ID
REACT_APP_SOCKET_URL
REACT_APP_NODE_ENV
GENERATE_SOURCEMAP
```

### 4. Start the Development Server

To start the frontend application in development mode:

```bash
yarn start
# OR if you're using npm
npm start
```

This will start the **React** app on `http://localhost:PORT`. The app will automatically reload when you make changes to the code.

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## ❓ Contributing

At this time, we are **not accepting contributions**. Please feel free to use the code for personal or educational purposes only.

---

### 📬 Contact

For any questions, suggestions, or feedback, please contact:

* **Email:** [devpatelm8318@gmail.com](mailto:devpatelm8318@gmail.com)
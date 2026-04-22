# Team Directory App

A simple React Native application built with Expo that allows users to browse a team directory, view user details, and add new teammates.

---

## 🚀 Features

- View a list of users from a remote API (ReqRes)
- Navigate to a user detail screen
- Add a new teammate via a form
- Basic client-side validation (required fields)
- Loading, error, and empty states handling
- Pull-to-refresh support for updating the user list
- Clean UI with card-based layout and floating action button (FAB)

---

## 🛠 Tech Stack

- React Native (Expo)
- TypeScript
- Expo Router (file-based navigation)
- Fetch API

---

## 📦 Installation

1. Clone the repository

   git clone [<your-repo-url>](https://github.com/tumpopoM/team-directory-app.git)
   cd team-directory-app

2. Install dependencies

   npm install

---

## ▶️ Running the App

Start the development server:

    npx expo start

Then choose one of the following:

### Android

- Press `a` to open Android emulator

### iOS

- Press `i` to open iOS simulator (Mac only)

### Web

- Press `w` to open in browser

---

## ⚙️ Requirements

- Node.js (>= 18 recommended)
- npm or yarn
- Android Studio (for Android emulator)

---

## 📱 Tested On

- Android Emulator (Pixel / Android Studio)

---

## 🌐 API

This app uses the public ReqRes API:

- GET /users?page=1
- GET /users/{id}
- POST /users

> Note: The create endpoint does not persist data. It returns a success response but does not update the user list.

---

## 📁 Project Structure

team-directory-app/
├── app/
│ ├── index.tsx # User list screen
│ ├── detail.tsx # User detail screen
│ └── add.tsx # Add teammate form
│
├── src/
│ └── services/
│ └── api.ts # API functions
│
├── assets/
├── components/
├── hooks/
│
├── package.json
├── tsconfig.json
└── README.md

---

## ⚖️ Assumptions & Trade-offs

- Only the first page of users is implemented (no pagination)
- Created users are not persisted due to API limitations
- UI is intentionally simple and focused on usability
- No external state management library used

---

## 🧠 Approach

- Centralized API logic in a single service file (api.ts)
- Used React hooks (useState, useEffect)
- Implemented navigation using Expo Router
- Handled loading, error, and empty states
- Improved UI with:
  - Card-style list items
  - Floating action button (FAB)
  - Clean form layout
- Added pull-to-refresh for better UX

---

## 🎯 Improvements (If More Time)

- Pagination / infinite scroll
- Local update after creating user
- Better error handling
- Unit testing
- Accessibility improvements

---

## 📌 Notes

- Focused on core React Native concepts:
  - Navigation
  - API integration
  - Form handling
  - UI structuring
- UI is simple but practical

---

## 🙌 Thank you

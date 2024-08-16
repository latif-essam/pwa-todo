<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">PWA-TODO</h1>
</p>
<p align="center">
    <em><code>A simple todo app with Notifications and indexed storage setup
</code></em>
</p>
<p align="center">
    <img src="https://img.shields.io/github/license/latif-essam/pwa-todo.git?style=flat&color=0080ff" alt="license">
    <img src="https://img.shields.io/github/last-commit/latif-essam/pwa-todo.git?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
    <img src="https://img.shields.io/github/languages/top/latif-essam/pwa-todo.git?style=flat&color=0080ff" alt="repo-top-language">
    <img src="https://img.shields.io/github/languages/count/latif-essam/pwa-todo.git?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
        <em>Developed with the software and tools below.</em>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running pwa-todo](#-running-pwa-todo)
> - [ Project Roadmap](#-project-roadmap)

---

## Overview

<code>► PWA Todo is a Progressive Web App (PWA) for managing to-do tasks. It utilizes Tailwind CSS for styling, IndexedDB for data management, and service workers for notifications. The app allows users to create, update, and delete tasks, and provides notifications for task deadlines.</code>

---

## Features

- **Progressive Web App (PWA):** The application is designed as a PWA, offering a native app-like experience with offline capabilities and improved performance.
- **Todo Management:** Users can create, edit, and delete todo items.
- **Local Storage:** Todos are stored locally using the browser’s local storage for offline use.
- **Responsive Design:** The app is responsive and works well on various screen sizes and devices.
- **Service Worker:** Implements a service worker for caching and offline functionality.
- **Push Notifications:** Users receive notifications for important updates and reminders.
- **Theming:** Supports light and dark themes for better user experience based on preferences.
- **User Authentication:** Secure user authentication to manage and synchronize todos.
- **Sync with Cloud:** Optional synchronization with cloud services to backup and restore todos.

## Repository Structure

```sh
└── pwa-todo/
    ├── README.MD
    ├── assets
    │   ├── check.png
    │   ├── icon512_maskable.png
    │   ├── icon512_rounded.png
    │   └── manifest.json
    ├── index.html
    ├── js
    │   ├── idb.js
    │   ├── main.js
    │   ├── serviceWorker.js
    │   └── utils.js
    ├── package-lock.json
    ├── package.json
    ├── styles
    │   ├── input.css
    │   └── output.css
    └── tailwind.config.js
```

## Getting Started

**_Requirements_**

Ensure you have the following dependencies installed on your system:

- **NodeJS**: `version +16.0.0`

### Installation

1. Clone the pwa-todo repository:

```sh
git clone https://github.com/latif-essam/pwa-todo.git
```

2. Change to the project directory:

```sh
cd pwa-todo
```

3. Install the dependencies:

```sh
npm install
```

4. Open with vs code:

```sh
code .
```

### Running pwa-todo

run with live server extension

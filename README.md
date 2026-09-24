# CURT Project & Task Management System

A web-based engineering project and task management dashboard designed for **CURT (Cairo University Racing Team)** — a Formula Student / FSAE racing team. The application provides subsystem leads and engineering members with tools to coordinate vehicle design, manufacturing milestones, CFD/FEA simulations, accumulator development, and competition static events.

---

## 📌 Project Overview

Formula Student engineering demands structured coordination across multidisciplinary teams (Aerodynamics, Powertrain, Chassis & Suspension, Electrical & Electronics, and Business/Static Events). 

The **CURT Project Management System** streamlines team workflows by providing:
- **Centralized Subsystem Projects**: Organize large engineering initiatives and maintain team member rosters.
- **Granular Task Tracking**: Track engineering deliverables by status (`To Do`, `In Progress`, `Done`) and priority (`Low`, `Medium`, `High`).
- **Role-Aware Access**: Respect project ownership rules, restricting administrative modifications (editing, deleting, reassigning) to subsystem leads and task owners.
- **Live Search, Filter, and Pagination**: Navigate dozens of racing tasks with instant search and URL-synchronized filters.
- **Member Profile & Engineering Metrics**: View individual task allocation and update user credentials.

---

## 🛠 Technologies Used

### **Core Framework & Runtime**
- **[React 19](https://react.dev/)** (`^19.2.8`): Modern component architecture using hooks (`useState`, `useEffect`, `useContext`, `useSearchParams`, `useNavigate`, `useParams`).
- **[Vite 8](https://vitejs.dev/)** (`^8.3.0`): Lightning-fast build tool, local dev server, and Hot Module Replacement (HMR).
- **[React Router DOM v7](https://reactrouter.com/)** (`^7.18.4`): Declarative client-side routing, protected routes, nested layout routes, and URL query parameter state synchronization.

### **Styling & Icons**
- **[Tailwind CSS v4](https://tailwindcss.com/)** (`@tailwindcss/vite` & `tailwindcss ^4.3.3`): Utility-first CSS framework coupled with CSS custom variables for a consistent design system.
- **[React Icons](https://react-icons.github.io/react-icons/)** (`^5.7.0`): Icon suites including Heroicons v2 (`react-icons/hi2`), FontAwesome (`react-icons/fa`), Material Design (`react-icons/md`), and Remix/Cg (`react-icons/cg`).

### **Notifications & Utilities**
- **[React Hot Toast](https://react-hot-toast.com/)** (`^2.6.1`): Non-blocking toast notifications for CRUD feedback, status updates, and error alerts.
- **HTML5 Web Storage API (`localStorage` & `sessionStorage`)**: Client-side relational data simulation and session persistence.
- **[ESLint](https://eslint.org/)** (`^10.x`): Code quality and React hook validation.

---

## 🚀 Setup Instructions

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (recommended: LTS `v20.x` or `v22.x`)
- **npm**: `v9.0.0` or higher (packaged with Node.js)

### Installation
1. **Clone or navigate to the project directory:**
   ```bash
   cd curtproject
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

---

## 💻 How to Run the Project

### 1. Start the Development Server
Run the local development server:
```bash
npm run dev
```
Open your browser and navigate to the local URL (typically **`http://localhost:5173`**).

### 2. Build for Production
To create an optimized production build in the `dist/` directory:
```bash
npm run build
```

### 3. Preview Production Build
To preview the generated production build locally:
```bash
npm run preview
```

### 4. Run Linting
To check code quality and lint rules:
```bash
npm run lint
```

---

## 👥 Demo Accounts & Credentials

The application initializes with predefined demo accounts simulating CURT team members across multiple subsystems:

| Full Name | Email Address | Password | Role / Subsystem |
| :--- | :--- | :--- | :--- |
| **Ahmed Lead** | `ahmed@curt.com` | `123` | Aerodynamics Subsystem Lead |
| **Salma Member** | `salma@curt.com` | `123` | CFD Engineer |
| **Youssef Member** | `youssef@curt.com` | `123` | Powertrain & High Voltage Engineer |

> **Tip:** You can also click **"Don't have an account? Sign up"** on the login page to register a new user account at any time.

---

## ✨ Additional Features Implemented

### 1. **Robust Authentication & Protected Routes**
- **Protected Routing (`ProtectedRoute.jsx`)**: Unauthorized users attempting to access internal pages (`/home`, `/projects`, `/tasks`, `/profile`) are automatically redirected to `/login`.
- **User Registration**: Form validation prevents blank fields and prohibits duplicate email registrations.
- **Session Isolation**: A `sessionStorage` flag (`sessionStarted`) ensures that opening a new browser session prompts clean authentication while keeping shared project data intact.

### 2. **Advanced UI Component Patterns (Compound Components)**
- **Compound Modal (`Modal.jsx`)**: Context-driven modal dialogs (`Modal.Open` and `Modal.Window`) rendered into `document.body` via React Portals with smooth backdrop blur.
- **Floating Action Menus (`Menus.jsx`)**: Contextual dropdown menus rendered in portals with dynamic viewport positioning, preventing table clipping.
- **Outside Click Dismissal (`UseOutSideClick.jsx`)**: Reusable custom hook to automatically dismiss modals and menus when clicking outside their bounding rects.
- **Confirmation Modals (`ConfirmDelete.jsx`)**: Destructive actions (deleting projects or tasks) require confirmation dialogs to prevent accidental data loss.

### 3. **Comprehensive Search, Filtering & Pagination**
- **URL-Driven State**: Filter tabs (`status`, `priority`) and pagination indices (`page`) synchronize directly with URL search parameters (`useSearchParams`), enabling shareable URLs and browser back/forward navigation.
- **Debounced Search**: Text search inputs for projects and tasks with automatic debouncing and loading spinners.
- **Client-Side Pagination**: Automatic page calculation (5 records per page) with disabled boundary controls.

### 4. **Detailed Views & Scope Isolation**
- **Project Details (`/projects/:projectId`)**: View project objectives, project owner, member list, and a dedicated table displaying only tasks assigned to that specific project.
- **Task Details (`/tasks/:taskId`)**: Dedicated detail route with color-coded status badges, priority tags, descriptions, and assigned member badges.
- **Fast Status Progression**: Leads and assignees can mark tasks as `Done` directly from the table action menu with a single click.

### 5. **User Profile & Subsystem Metrics**
- **Engineering Statistics Dashboard**: Visual metrics showing:
  - Number of projects owned
  - Number of projects enrolled as a member
  - Tasks count categorized by status (`To Do`, `In Progress`, `Done`)
- **Account Settings**: Users can update their display name and set a new password with password-confirmation validation.
- **Real-Time Header Sync**: Modifying a profile dispatches a custom window event (`user-updated`) to instantly update the avatar and name in the persistent header.

---

## 📐 Assumptions & Design Decisions

1. **Client-Side Relational Storage**:
   - The application relies on `localStorage` to emulate a backend database.
   - On initial load, `seedInitialData()` seeds `initialUsers`, `initialProjects`, and `initialTasks` from `FakeData.js` if storage is empty.
   - Safe storage wrappers (`getStorageData`, `setStorageData`) catch JSON parsing errors and prevent application crashes.

2. **Access Control & Permissions Logic**:
   - **Project Deletion & Editing**: Restricted strictly to the `ownerId` of the project. Other team members can view project details but cannot delete or edit project metadata.
   - **Task Modification**: Restricted to the owner of the parent project.
   - **Task Status Updates**: Allowed if the logged-in user is either the **project owner** OR **one of the assigned engineers** for that task.
   - **Task Assignment Constraints**: When creating or editing a task, the assignee list is strictly scoped to members of that specific project.

3. **Styling System & Rem Scaling**:
   - The root document HTML font size is set to `62.5%` (`1rem = 10px`).
   - Sizing across components uses `rem` units (e.g., `1.6rem = 16px`, `2.4rem = 24px`, `4.8rem = 48px`).
   - Tailwind CSS v4 is configured with CSS variables in `src/index.css` (`--color-grey-*`, `--color-brand-*`, `--border-radius-*`).

4. **Responsive Layout**:
   - App layout provides a compact sidebar on mobile/tablet viewports and expands with full labels on desktop viewports (`md:` breakpoint).

---

## 📁 Project Structure

```plaintext
curtproject/
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Team logo and imagery
│   ├── data/
│   │   ├── FakeData.js     # Default CURT users, FSAE projects, and engineering tasks
│   │   └── helpers.js      # LocalStorage helpers and database seeder
│   ├── features/
│   │   ├── projects/       # Project components (Table, Rows, Forms, Details)
│   │   ├── tasks/          # Task components (Table, Operations, Forms, Details)
│   │   └── users/          # User management (UpdateUser modal)
│   ├── hooks/
│   │   └── UseOutSideClick.jsx # Custom hook for portal/modal click-outside detection
│   ├── pages/
│   │   ├── Home.jsx        # Landing welcome screen
│   │   ├── Login.jsx       # Authentication & account creation
│   │   ├── Logout.jsx      # Session termination
│   │   ├── PageNotFound.jsx# 404 fallback page
│   │   ├── Profile.jsx     # User dashboard & subsystem statistics
│   │   ├── Projects.jsx    # Projects overview with search & pagination
│   │   └── Tasks.jsx       # Tasks dashboard with filtering, search & pagination
│   ├── ui/                 # Reusable UI library (Modal, Menus, Tag, Button, etc.)
│   ├── App.jsx             # Main router configuration & Toast container
│   ├── index.css           # Tailwind v4 import & CSS custom design tokens
│   └── main.jsx            # Application entrypoint
├── eslint.config.js        # ESLint configuration
├── package.json            # Project dependencies and npm scripts
├── vite.config.js          # Vite build and plugin settings
└── README.md               # Project documentation
```

🎓 Student Management React App

Role-based React dashboard for Admin, Teacher, and Student users. Fully dynamic with JSON data, protected routing, responsive layout, and theme toggle.

🛠 Tech Stack:

React 19.1.1

Vite (project bundler)

Tailwind CSS (styling)

React Router DOM  (routing)

No backend is used; all data comes from static JSON files.


📂 Project Structure:

src/

 ├─ assets/                  # Optional images, icons, animations


 ├─ components/       
      
 │    ├─ DashboardLayout.jsx  # Main dashboard layout with sidebar & topbar

 │    ├─ HomeRedirect.jsx     # Redirects "/" based on user role

 │    ├─ ProtectedRoute.jsx   # Role-based route protection

 │    ├─ DataTableWrapper.jsx # Reusable table wrapper for Admin & Teacher

 │    └─ OverviewPage.jsx     # Reusable overview cards


 ├─ context/

 │    ├─ AuthContext.jsx      # Authentication state

 │    ├─ AuthProvider.jsx     # Provides AuthContext

 │    ├─ ThemeContext.jsx     # Theme state (light/dark)

 │    └─ ThemeProvider.jsx    # Provides ThemeContext

 ├─ hooks/

 │    ├─ useAuth.jsx          # Custom hook for authentication

 │    └─ useTheme.jsx         # Custom hook for theme

 ├─ pages/

 │    ├─ admin/

 │    │    ├─ Overview.jsx    # Admin dashboard overview

 │    │    └─ Users.jsx       # Admin user management

 │    ├─ teacher/

 │    │    ├─ Overview.jsx    # Teacher dashboard overview

 │    │    └─ Courses.jsx     # Teacher courses page

 │    ├─ student/

 │    │    ├─ Overview.jsx    # Student dashboard overview

 │    │    └─ StudentCalendar.jsx # Calendar showing student events

 │    ├─ AppRoutes.jsx        # All app routes with protected routes

 │    ├─ App.jsx              # Main app component

 │    ├─ Main.jsx             # App entry point

 │    └─ index.css            # Global styles

 ├─ data/

 │    ├─ Users.json           # User data

 │    ├─ Courses.json         # Courses data

 │    └─ Grades.json          # Grades data

 └─ main.jsx                  # Application  file



✨Features

Role-Based Routing: Admin, Teacher, and Student pages are accessible only by authorized users.

Dynamic Data Rendering: Stats, tables, and calendar events are generated from JSON files (Users.json, Courses.json, Grades.json).

Reusable Components: Cards, tables, and dashboard layouts are reusable across different roles.

Theme Support: Light and dark mode supported across all pages.

Responsive Design: Works on desktop and mobile devices.

Student Calendar: Interactive calendar showing events dynamically from grades.


⚡Setup Instructions:
1-Clone the repository

git clone https://github.com/Maram-Qais/Student-Management-react.git

cd Student-Management-react

2-Install dependencies

npm install

3-Run locally

npm run dev

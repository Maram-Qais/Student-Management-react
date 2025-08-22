import { NavLink, Outlet } from 'react-router-dom';
import { Home, Users, BookOpen, LogOut, Moon, Sun, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

import { useAuth } from '../hooks/useAuth';
import Lottie from 'lottie-react';
import schoolAnimation from '../assets/lottie/school.json';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarLight = 'bg-purple-800 text-white';
  const sidebarDark = 'bg-gray-800 text-gray-100';

  const links = {
    Admin: [
      { to: '/admin/overview', label: 'Overview', icon: <Home size={18} /> },
      { to: '/admin/users', label: 'Users', icon: <Users size={18} /> },
    ],
    Teacher: [
      { to: '/teacher/overview', label: 'Overview', icon: <Home size={18} /> },
      { to: '/teacher/courses', label: 'Courses', icon: <BookOpen size={18} /> },
    ],
    Student: [
      { to: '/student/overview', label: 'Overview', icon: <Home size={18} /> },
      { to: '/student/calendar', label: 'Calendar', icon: <BookOpen size={18} /> },
    ],
  };

  const roleLinks = links[user.role] || [];

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-purple-100' : 'bg-gray-900'}`}>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col p-2 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${theme === 'light' ? sidebarLight : sidebarDark}`}
      >
        {/* Logo + title + collapse arrow */}
        <div className="relative flex flex-col items-center mb-4">
          <div className="w-12 h-12">
            <Lottie animationData={schoolAnimation} loop autoplay />
          </div>
          {!sidebarCollapsed && <span className="font-bold text-lg text-center mt-1">Management System</span>}

          {/* Collapse arrow on top-right of logo/title */}
         <button
  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
  className="absolute top-0 right-0 p-1"
  style={{ background: 'none' }}
>
  {sidebarCollapsed ? <ChevronRight size={10} /> : <ChevronLeft size={14} />}
</button>

           
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2 flex-1">
          {roleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-700 ${
                  isActive ? 'bg-purple-700' : ''
                } ${sidebarCollapsed ? 'justify-center' : ''}`
              }
            >
              {link.icon}
              {!sidebarCollapsed && link.label}
            </NavLink>
          ))}

          {/* Logout */}
          <button
            onClick={logout}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-700 mt-2 ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={18} />
            {!sidebarCollapsed && 'Logout'}
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <aside className={`flex flex-col w-64 p-4 ${theme === 'light' ? sidebarLight : sidebarDark}`}>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="mb-4 self-end p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Menu size={24} />
            </button>
            <nav className="flex flex-col gap-2">
              {roleLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-700 ${
                      isActive ? 'bg-purple-700' : ''
                    }`
                  }
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  {link.icon} {link.label}
                </NavLink>
              ))}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-700 mt-auto"
              >
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>
          <div className="flex-1 bg-black opacity-50" onClick={() => setMobileSidebarOpen(false)}></div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4 min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'light' ? 'text-purple-900' : 'text-gray-100'}`}>
                {user.role} Dashboard
              </h1>
              <p className={`text-sm ${theme === 'light' ? 'text-purple-800' : 'text-gray-300'}`}>{user.email}</p>
            </div>
          </div>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-full transition">
            {theme === 'light' ? <Moon size={20} color="#3B82F6" /> : <Sun size={20} color="#FACC15" />}
          </button>
        </div>

        {/* Outlet */}
        <div className="w-full min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Users, 
  PenTool, 
  Calendar, 
  BarChart3, 
  Settings,
  Menu,
  Bell,
  Search,
  X,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import AIAssistant from './AIAssistant';
import WorkspaceSwitcher from './WorkspaceSwitcher';

const navigation = [
  { name: 'Personas', icon: Users, path: '/personas' },
  { name: 'Content', icon: PenTool, path: '/content' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Top Navigation */}
      <header className="fixed top-0 inset-x-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Left section */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Platform Logo and Name */}
            <Link to="/" className="flex items-center space-x-3 ml-2 lg:ml-0">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
                TribeMind
              </span>
            </Link>
          </div>

          {/* Center section - Search Bar */}
          <div className="flex-1 max-w-2xl mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-1 text-gray-400 hover:text-gray-500 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white dark:ring-gray-800" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-800 shadow-sm transform transition duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex-shrink-0 flex items-center h-16 px-6 border-b border-gray-100 dark:border-gray-700">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              TribeMind
            </span>
          </Link>
          <button 
            className="lg:hidden ml-auto p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-50"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace Switcher */}
        <div className="flex-shrink-0 px-3 mt-6 mb-6">
          <WorkspaceSwitcher />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2.5 mt-1 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Content area with top padding for fixed header */}
        <main className="pt-16 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  );
}
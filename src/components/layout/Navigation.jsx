import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLogout } = useAuth();

  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    return path.split('/')[1]; // Obtiene la primera parte de la ruta
  };

  const currentView = getCurrentView();

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/' },
    { key: 'characters', label: 'Personajes', icon: '👤', path: '/characters' },
    { key: 'campaigns', label: 'Campañas', icon: '📖', path: '/campaigns' },
    { key: 'sessions', label: 'Sesiones', icon: '📅', path: '/sessions' },
    { key: 'encounters', label: 'Encuentros', icon: '⚔️', path: '/encounters' },
    { key: 'items', label: 'Objetos', icon: '🎒', path: '/items' },
    { key: 'spells', label: 'Hechizos', icon: '✨', path: '/spells' },
    { key: 'npcs', label: 'NPCs', icon: '👥', path: '/npcs' },
    { key: 'combat', label: 'Combate', icon: '🗡️', path: '/combat' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">RoleGames</h1>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {menuItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className={`${
                    currentView === item.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <span className="text-sm text-gray-700">
                Hola, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
              >
                Cerrar Sesión
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map(item => (
              <button
                key={item.key}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`${
                  currentView === item.key
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                } block px-3 py-2 rounded-md text-base font-medium w-full text-left border-l-4`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-200 pt-4">
              <div className="px-3 py-2">
                <span className="text-sm text-gray-700">Hola, {user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="block px-3 py-2 text-red-600 hover:bg-red-50 w-full text-left text-base font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
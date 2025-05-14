import { useState } from 'react'
import useAuth from './hooks/useAuth'
import LoginForm from './components/LoginForm'

export default function App() {
  const {isAuthenticated, user, loading, handleLogout} = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-amber-400 border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl">⚔️</div>
            </div>
          </div>
          <p className="mt-4 text-amber-200 font-serif">Cargando el reino...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-amber-900 to-slate-800 relative overflow-hidden">
      {/* Medieval background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-amber-600">⚜️</div>
        <div className="absolute top-20 right-20 text-4xl text-amber-600">🗡️</div>
        <div className="absolute bottom-20 left-20 text-5xl text-amber-600">🛡️</div>
        <div className="absolute bottom-10 right-10 text-3xl text-amber-600">👑</div>
      </div>
      
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {isAuthenticated && user ? (
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-amber-300 mb-4 font-serif tracking-wider">
                ⚔️ RoleGames ⚔️
              </h1>
              <p className="text-amber-200 font-serif italic">Un Reino de Aventuras</p>
              
              <div className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg shadow-2xl border-4 border-amber-600 p-8 mt-8 relative">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-amber-700"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-amber-700"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-amber-700"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-amber-700"></div>
                
                <div className="text-center mb-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-200 border-2 border-amber-600 mb-4">
                    <svg className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-amber-900 font-serif">
                    ¡Bienvenido, {user.username}!
                  </h2>
                  <p className="text-amber-700 font-serif italic">Héroe del Reino</p>
                </div>
                
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center py-2 border-b-2 border-amber-300">
                    <span className="text-sm font-medium text-amber-700 font-serif">ID del Héroe</span>
                    <span className="text-sm text-amber-900 font-mono">{user.userId}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b-2 border-amber-300">
                    <span className="text-sm font-medium text-amber-700 font-serif">Correspondencia</span>
                    <span className="text-sm text-amber-900">{user.email}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b-2 border-amber-300">
                    <span className="text-sm font-medium text-amber-700 font-serif">Clase</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-amber-200 text-amber-800 border border-amber-600 font-serif">
                      {user.userType}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b-2 border-amber-300">
                    <span className="text-sm font-medium text-amber-700 font-serif">Unión al Reino</span>
                    <span className="text-sm text-amber-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex justify-center py-3 px-4 border-2 border-red-700 rounded-md shadow-lg text-sm font-medium text-amber-100 bg-gradient-to-b from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-serif tracking-wider transform hover:scale-105 transition-all duration-200"
                  >
                    ⚔️ Abandonar el Reino ⚔️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-amber-300 mb-8 font-serif tracking-wider">
                ⚔️ RoleGames ⚔️
              </h1>
              <p className="text-amber-200 font-serif italic text-lg">Entra al Reino de Aventuras</p>
            </div>
            <LoginForm 
              onLoginSuccess={(userData) => {
                setUser(userData);
                setIsAuthenticated(true);
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
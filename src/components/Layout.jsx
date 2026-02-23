import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Shield, Store, FileText, BarChart3, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Layout = ({ children, user, signOut }) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'User Management', href: '/users', icon: Users },
    { name: 'Role Management', href: '/roles', icon: Shield },
    { name: 'Merchant Management', href: '/merchants', icon: Store },
    { name: 'Applications', href: '/applications', icon: FileText },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-primary-blue to-primary-blue/90 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-primary-blue to-primary-gold">
            <h1 className="text-xl font-bold text-white">MaSAT Admin</h1>
            <button
              className="lg:hidden text-white hover:text-primary-gold transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-gold text-white shadow-lg'
                      : 'text-white hover:bg-white/10 hover:text-primary-gold'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-white/20 p-4">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-gold to-primary-gold/80 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.signInDetails?.loginId?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white truncate">
                  {user?.signInDetails?.loginId || 'Admin'}
                </p>
                <p className="text-xs text-primary-gold">Administrator</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white/10 hover:text-primary-gold rounded-lg transition-all"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center h-16 px-4 bg-card border-b-2 border-primary-gold/20 shadow-sm lg:px-8">
          <button
            className="lg:hidden text-primary-blue hover:text-primary-gold transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h2 className="ml-4 text-xl font-bold bg-gradient-to-r from-primary-blue to-primary-gold bg-clip-text text-transparent lg:ml-0">
            {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
          </h2>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

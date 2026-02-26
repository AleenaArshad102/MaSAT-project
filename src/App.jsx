import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import AgencyRevenue from './pages/AgencyRevenue'
import UserManagement from './pages/UserManagement'
import RoleManagement from './pages/RoleManagement'
import RankingManagement from './pages/RankingManagement'
import LeaderStats from './pages/LeaderStats'
import TribeManagement from './pages/TribeManagement'
import RelationshipCP from './pages/RelationshipCP'
import RechargeActivity from './pages/RechargeActivity'
import RoomManagement from './pages/RoomManagement'
import RoomInvites from './pages/RoomInvites'
import CoinPackages from './pages/CoinPackages'
import Finance from './pages/Finance'
import SalaryManagement from './pages/SalaryManagement'
import BankManagement from './pages/BankManagement'
import TopupApprovals from './pages/TopupApprovals'
import WithdrawalApprovals from './pages/WithdrawalApprovals'
import MerchantManagement from './pages/MerchantManagement'
import Applications from './pages/Applications'
import KYCVerification from './pages/KYCVerification'
import BanManagement from './pages/BanManagement'
import Tickets from './pages/Tickets'
import Analytics from './pages/Analytics'
import Layout from './components/Layout'
import Login from './components/Login' // Ab ye dummy login hai
import DiagnosticTest from './components/DiagnosticTest'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  // Dummy admin users
  const DUMMY_ADMINS = [
    { userId: '5001010', username: 'john_admin', email: 'john@example.com', role: 'admin' },
    { userId: '5002020', username: 'sarah_admin', email: 'sarah@example.com', role: 'super_admin' },
    { userId: '5003030', username: 'mike_manager', email: 'mike@example.com', role: 'manager' },
    { userId: '5004040', username: 'emma_head', email: 'emma@example.com', role: 'country_head' },
    { userId: 'admin', username: 'admin_user', email: 'admin@example.com', role: 'admin' }
  ]

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
        setIsAdmin(true) // Assume saved user is admin
      } catch (e) {
        console.error('Error parsing saved user:', e)
        localStorage.removeItem('adminUser')
      }
    }
    setLoading(false)
  }, [])

  const handleLoginSuccess = (userData) => {
    console.log('✅ Login successful for:', userData.email)
    
    // Save to state
    setUser({
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
      role: userData.role,
      signInDetails: {
        loginId: userData.email
      }
    })
    
    setIsAuthenticated(true)
    setIsAdmin(true) // All dummy users are admins
    
    // Save to localStorage
    localStorage.setItem('adminUser', JSON.stringify({
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
      role: userData.role
    }))
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
    setUser(null)
    localStorage.removeItem('adminUser')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onSuccess={handleLoginSuccess} />
  }

  // Show access denied if authenticated but not admin (shouldn't happen with dummy data)
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-blue to-primary-gold">
        <div className="bg-card p-8 rounded-2xl shadow-2xl text-center max-w-2xl border border-primary-gold/20">
          <div className="inline-block p-4 bg-error/10 rounded-full mb-4">
            <svg className="w-16 h-16 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-error to-error/80 bg-clip-text text-transparent mb-4">
            Access Denied
          </h1>
          <p className="text-text-secondary mb-4">
            You do not have administrator privileges to access this panel.
          </p>
          <button
            onClick={handleSignOut}
            className="bg-gradient-to-r from-primary-blue to-primary-gold hover:from-primary-blue/90 hover:to-primary-gold/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  // Show admin panel for authenticated admins
  return (
    <Layout user={user} signOut={handleSignOut}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agency-revenue" element={<AgencyRevenue />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
        <Route path="/rankings" element={<RankingManagement />} />
        <Route path="/leader-stats" element={<LeaderStats />} />
        <Route path="/tribes" element={<TribeManagement />} />
        <Route path="/relationships" element={<RelationshipCP />} />
        <Route path="/recharge-activity" element={<RechargeActivity />} />
        <Route path="/room-management" element={<RoomManagement />} />
        <Route path="/room-invites" element={<RoomInvites />} />
        <Route path="/coin-packages" element={<CoinPackages />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/salary-management" element={<SalaryManagement />} />
        <Route path="/bank-management" element={<BankManagement />} />
        <Route path="/topup-approvals" element={<TopupApprovals />} />
        <Route path="/withdrawal-approvals" element={<WithdrawalApprovals />} />
        <Route path="/merchants" element={<MerchantManagement />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/kyc-verification" element={<KYCVerification />} />
        <Route path="/ban-management" element={<BanManagement />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
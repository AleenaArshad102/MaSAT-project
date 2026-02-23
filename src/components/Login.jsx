import { useState } from 'react'

export default function Login({ onSuccess }) {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Dummy credentials
  const DUMMY_CREDENTIALS = {
    'admin': {
      password: 'admin123',
      userId: 'admin',
      username: 'admin_user',
      email: 'admin@example.com',
      role: 'admin'
    },
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const inputUserId = userId.trim()
      
      // Check if credentials are valid
      if (DUMMY_CREDENTIALS[inputUserId] && 
          DUMMY_CREDENTIALS[inputUserId].password === password) {
        
        console.log('✅ Login successful')
        const userData = DUMMY_CREDENTIALS[inputUserId]
        
        onSuccess(userData)
      } else {
        throw new Error('Incorrect User ID or password')
      }
    } catch (err) {
      console.error('❌ Login error:', err)
      setError('Incorrect User ID or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-gold">
      <div className="bg-card p-8 rounded-2xl shadow-2xl w-full max-w-md border border-primary-gold/20">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-primary-blue to-primary-gold rounded-full mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-blue to-primary-gold bg-clip-text text-transparent mb-2">
            MaSAT Admin Panel
          </h1>
          <p className="text-text-secondary">Sign in with your credentials</p>
          
          {/* Demo credentials hint */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 font-semibold mb-1">🔐 Demo Credentials:</p>
            <p className="text-xs text-blue-600">User ID: admin / Password: admin123</p>

          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="userId" className="block text-sm font-semibold text-text-primary mb-2">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your User ID"
              className="w-full px-4 py-3 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-input-fill transition-all"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-input-fill transition-all"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-blue to-primary-gold hover:from-primary-blue/90 hover:to-primary-gold/90 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
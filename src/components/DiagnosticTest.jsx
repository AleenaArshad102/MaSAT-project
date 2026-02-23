import { useState } from 'react'

export default function DiagnosticTest() {
  const [results, setResults] = useState([])
  const [testing, setTesting] = useState(false)

  const addResult = (message, type = 'info') => {
    setResults(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }])
    console.log(`[${type.toUpperCase()}]`, message)
  }

  // Dummy data for testing
  const dummyUser = {
    username: 'john_admin',
    userId: 'usr_5001010',
    email: 'john.admin@example.com',
    roles: ['admin', 'manager'],
    primaryRole: 'admin',
    status: 'active'
  }

  const runDiagnostics = async () => {
    setResults([])
    setTesting(true)

    try {
      addResult('Starting diagnostic tests...', 'info')

      // Test 1: Simulate signed in user
      addResult('Test 1: Checking if user is signed in...', 'info')
      await new Promise(resolve => setTimeout(resolve, 500))
      addResult('✅ User is signed in (dummy data)', 'success')
      addResult(`   Username: ${dummyUser.username}`, 'info')
      addResult(`   User ID: ${dummyUser.userId}`, 'info')

      // Test 1b: Simulate user email retrieval
      addResult('Test 1b: Checking user email...', 'info')
      await new Promise(resolve => setTimeout(resolve, 400))
      addResult('✅ User email retrieved', 'success')
      addResult(`   Email: ${dummyUser.email}`, 'info')

      // Test 1c: Simulate auth tokens
      addResult('Test 1c: Checking auth tokens...', 'info')
      await new Promise(resolve => setTimeout(resolve, 300))
      addResult('✅ Auth tokens present (simulated)', 'success')
      addResult(`   ID Token present: ✅`, 'info')
      addResult(`   Access Token present: ✅`, 'info')

      // Test 2: Simulate user lookup by username
      addResult('Test 2: Looking up user by username...', 'info')
      await new Promise(resolve => setTimeout(resolve, 600))
      addResult('✅ User found by username!', 'success')
      addResult(`   User ID: ${dummyUser.userId}`, 'info')
      addResult(`   Email: ${dummyUser.email}`, 'info')
      addResult(`   Roles: ${dummyUser.roles.join(', ')}`, 'info')
      addResult(`   Primary Role: ${dummyUser.primaryRole}`, 'info')
      addResult(`   Status: ${dummyUser.status}`, 'info')

      // Test 3: Simulate email lookup
      addResult('Test 3: Looking up user by email...', 'info')
      await new Promise(resolve => setTimeout(resolve, 500))
      addResult('✅ User found by email!', 'success')
      addResult(`   User ID: ${dummyUser.userId}`, 'info')
      addResult(`   Email: ${dummyUser.email}`, 'info')
      addResult(`   Roles: ${dummyUser.roles.join(', ')}`, 'info')
      addResult(`   Primary Role: ${dummyUser.primaryRole}`, 'info')
      addResult(`   Status: ${dummyUser.status}`, 'info')

      // Check admin role
      const adminRoles = ['admin', 'super_admin', 'manager', 'country_head']
      const hasAdminRole = dummyUser.roles?.some(role => adminRoles.includes(role))

      if (hasAdminRole) {
        addResult('✅ User has admin privileges!', 'success')
      } else {
        addResult('❌ User does NOT have admin privileges', 'error')
      }

      addResult('✅ Diagnostic tests complete! (using dummy data)', 'success')
    } catch (error) {
      addResult(`❌ Unexpected error: ${error.message}`, 'error')
    } finally {
      setTesting(false)
    }
  }

  const getColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      case 'warning': return 'text-orange-600'
      default: return 'text-gray-700'
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel Diagnostics</h2>
        
        {/* Dummy data notice */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Running in demo mode with dummy data. No actual backend calls are made.
          </p>
        </div>

        <button
          onClick={runDiagnostics}
          disabled={testing}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg mb-6"
        >
          {testing ? 'Running Tests...' : 'Run Diagnostic Tests (Demo)'}
        </button>

        {results.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <h3 className="font-semibold mb-2">Results:</h3>
            <div className="space-y-1 font-mono text-sm">
              {results.map((result, index) => (
                <div key={index} className={getColor(result.type)}>
                  <span className="text-gray-500 text-xs">[{result.time}]</span> {result.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
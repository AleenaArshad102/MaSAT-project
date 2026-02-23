import { useState, useEffect } from 'react'
import { Search, Filter, ChevronLeft, ChevronRight, Edit2, Ban, CheckCircle } from 'lucide-react'
import { RoleBadge } from '../components/RoleSelect'
import { format } from 'date-fns'

/* ---------------- MOCK DATABASE ---------------- */

const MOCK_USERS = Array.from({ length: 137 }, (_, i) => ({
  userId: `U${1000 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['user', 'host', 'agency_owner', 'admin', 'super_admin'][i % 5],
  createdAt: new Date(2024, 0, (i % 28) + 1).toISOString(),
  status: {
    isActive: i % 6 !== 0,
    isBanned: i % 10 === 0,
    isSuspended: false,
  },
}))

const PAGE_SIZE = 50

/* ---------------- COMPONENT ---------------- */

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  /* ---------------- LOAD USERS ---------------- */

  const loadUsers = async (lastKey = null) => {
    try {
      setLoading(true)

      await new Promise((res) => setTimeout(res, 500))

      const startIndex = lastKey || 0
      const paginated = MOCK_USERS.slice(startIndex, startIndex + PAGE_SIZE)

      setUsers(paginated)
      setLastEvaluatedKey(startIndex + PAGE_SIZE)
      setHasMore(startIndex + PAGE_SIZE < MOCK_USERS.length)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- SEARCH ---------------- */

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadUsers()
      return
    }

    try {
      setLoading(true)
      await new Promise((res) => setTimeout(res, 400))

      const results = MOCK_USERS.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userId.toLowerCase().includes(searchTerm.toLowerCase())
      )

      setUsers(results)
      setHasMore(false)
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- ROLE FILTER ---------------- */

  const handleRoleFilter = async (role) => {
    setSelectedRole(role)

    if (role === 'all') {
      loadUsers()
      return
    }

    try {
      setLoading(true)
      await new Promise((res) => setTimeout(res, 400))

      const results = MOCK_USERS.filter((user) => user.role === role)

      setUsers(results)
      setHasMore(false)
    } catch (error) {
      console.error('Error filtering users:', error)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- BAN USER ---------------- */

  const handleBanUser = async (userId) => {
    if (!confirm('Are you sure you want to ban this user?')) return

    try {
      await new Promise((res) => setTimeout(res, 300))

      const updated = MOCK_USERS.map((user) =>
        user.userId === userId
          ? {
              ...user,
              status: { isActive: false, isBanned: true, isSuspended: false },
            }
          : user
      )

      const index = MOCK_USERS.findIndex((u) => u.userId === userId)
      MOCK_USERS[index] = updated[index]

      loadUsers()
      alert('User banned successfully')
    } catch (error) {
      console.error('Error banning user:', error)
      alert('Failed to ban user')
    }
  }

  /* ---------------- ACTIVATE USER ---------------- */

  const handleActivateUser = async (userId) => {
    try {
      await new Promise((res) => setTimeout(res, 300))

      const updated = MOCK_USERS.map((user) =>
        user.userId === userId
          ? {
              ...user,
              status: { isActive: true, isBanned: false, isSuspended: false },
            }
          : user
      )

      const index = MOCK_USERS.findIndex((u) => u.userId === userId)
      MOCK_USERS[index] = updated[index]

      loadUsers()
      alert('User activated successfully')
    } catch (error) {
      console.error('Error activating user:', error)
      alert('Failed to activate user')
    }
  }

  const filteredUsers = users

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Search size={20} />
              Search
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Filter size={20} className="text-gray-500" />
            <select
              value={selectedRole}
              onChange={(e) => handleRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="host">Host</option>
              <option value="agency_owner">Agency Owner</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            All Users ({filteredUsers.length})
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-6 py-4">
                        {user.status.isBanned ? 'Banned' : 'Active'}
                      </td>
                      <td className="px-6 py-4">
                        {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        {user.status.isBanned ? (
                          <button onClick={() => handleActivateUser(user.userId)}>
                            <CheckCircle size={18} />
                          </button>
                        ) : (
                          <button onClick={() => handleBanUser(user.userId)}>
                            <Ban size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                <button
                  onClick={() => loadUsers()}
                  disabled={!lastEvaluatedKey}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => loadUsers(lastEvaluatedKey)}
                  disabled={!hasMore}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default UserManagement

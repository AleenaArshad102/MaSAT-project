import { useState, useEffect } from 'react'
import { Search, Filter, ChevronLeft, ChevronRight, Edit2, Ban, CheckCircle } from 'lucide-react'
import { RoleBadge } from '../components/RoleSelect'
import { format } from 'date-fns'

/* MOCK DATABASE */
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

  const handleBanUser = async (userId) => {
    if (!confirm('Are you sure you want to ban this user?')) return
    try {
      await new Promise((res) => setTimeout(res, 300))
      const updated = MOCK_USERS.map((user) =>
        user.userId === userId
          ? { ...user, status: { isActive: false, isBanned: true, isSuspended: false } }
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

  const handleActivateUser = async (userId) => {
    try {
      await new Promise((res) => setTimeout(res, 300))
      const updated = MOCK_USERS.map((user) =>
        user.userId === userId
          ? { ...user, status: { isActive: true, isBanned: false, isSuspended: false } }
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
    <div className="space-y-6 px-2 md:px-0 pb-10">
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[14px]"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium text-[14px] transition-all active:scale-95"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full lg:w-auto">
              <Filter size={18} className="text-gray-500" />
              <select
                value={selectedRole}
                onChange={(e) => handleRoleFilter(e.target.value)}
                className="bg-transparent py-2 outline-none text-[14px] w-full"
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
      </div>

      
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-[16px] font-bold text-slate-800">
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
              <table className="min-w-[800px] w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined At</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 text-[14px]">{user.name}</span>
                          <span className="text-gray-400 text-[12px]">{user.email}</span>
                          <span className="text-[10px] text-blue-500 font-mono">ID: {user.userId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${
                          user.status.isBanned 
                            ? 'bg-red-50 text-red-600' 
                            : 'bg-green-50 text-green-600'
                        }`}>
                          {user.status.isBanned ? 'BANNED' : 'ACTIVE'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[13px] text-slate-600">
                        {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          {user.status.isBanned ? (
                            <button 
                              onClick={() => handleActivateUser(user.userId)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                              title="Activate User"
                            >
                              <CheckCircle size={20} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleBanUser(user.userId)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Ban User"
                            >
                              <Ban size={20} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => loadUsers()}
                  disabled={!lastEvaluatedKey || lastEvaluatedKey <= PAGE_SIZE}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-[13px] font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>
                <button
                  onClick={() => loadUsers(lastEvaluatedKey)}
                  disabled={!hasMore}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 rounded-lg bg-blue-600 text-white text-[13px] font-medium hover:bg-blue-700 disabled:opacity-50 shadow-sm"
                >
                  Next
                  <ChevronRight size={18} />
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
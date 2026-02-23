import { useState, useEffect } from 'react'
import { Shield, Users, Search, Plus, Trash2, Star, ChevronDown, ChevronUp } from 'lucide-react'

const dummyUsers = [
  {
    userId: 'u1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    roles: ['admin', 'user'],
    primaryRole: 'admin',
    isVerified: true,
    bdLeaderId: 'bd100',
    merchantId: null,
    agencyId: 'ag1',
  },
  {
    userId: 'u2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    roles: ['super_bd'],
    primaryRole: 'super_bd',
    isVerified: false,
    bdLeaderId: null,
    merchantId: 'm50',
    agencyId: null,
  },
  {
    userId: 'u3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    roles: ['agency_owner', 'user'],
    primaryRole: 'agency_owner',
    isVerified: true,
    bdLeaderId: null,
    merchantId: null,
    agencyId: 'ag2',
  },
]

const availableRoles = [
  { value: 'admin', label: 'Admin', color: '#EF4444' },
  { value: 'super_bd', label: 'Super BD', color: '#3B82F6' },
  { value: 'agency_owner', label: 'Agency Owner', color: '#8B5CF6' },
  { value: 'user', label: 'User', color: '#10B981' },
  { value: 'coin_seller', label: 'Coin Seller', color: '#FACC15' },
]

const RoleManagement = () => {
  const [users, setUsers] = useState([])
  const [expandedUsers, setExpandedUsers] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // For assigning roles
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedUserForAssign, setSelectedUserForAssign] = useState(null)
  const [selectedRoleToAssign, setSelectedRoleToAssign] = useState('')
  const [assigning, setAssigning] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    setLoading(true)
    setTimeout(() => {
      setUsers(dummyUsers)
      setLoading(false)
    }, 500)
  }

  const getRoleLabel = (role) => {
    const found = availableRoles.find(r => r.value === role)
    return found ? found.label : role
  }

  const getRoleColor = (role) => {
    const found = availableRoles.find(r => r.value === role)
    return found ? found.color : '#6B7280'
  }

  const getAvailableRoles = () => availableRoles

  const handleOpenAssignDialog = (user) => {
    setSelectedUserForAssign(user)
    setSelectedRoleToAssign('')
    setAssignDialogOpen(true)
  }

  const handleCloseAssignDialog = () => {
    setAssignDialogOpen(false)
    setSelectedUserForAssign(null)
    setSelectedRoleToAssign('')
  }

  const handleAssignRole = () => {
    if (!selectedUserForAssign || !selectedRoleToAssign) return
    if (!confirm(`Assign ${getRoleLabel(selectedRoleToAssign)} role to ${selectedUserForAssign.name || selectedUserForAssign.email}?`)) return

    setAssigning(true)
    setTimeout(() => {
      const updatedUsers = users.map(u => {
        if (u.userId === selectedUserForAssign.userId) {
          return {
            ...u,
            roles: [...u.roles, selectedRoleToAssign],
          }
        }
        return u
      })
      setUsers(updatedUsers)
      alert('Role assigned successfully!')
      handleCloseAssignDialog()
      setAssigning(false)
    }, 500)
  }

  const handleRevokeRole = (user, roleToRevoke) => {
    if (!confirm(`Revoke ${getRoleLabel(roleToRevoke)} role from ${user.name || user.email}?`)) return
    const updatedUsers = users.map(u => {
      if (u.userId === user.userId) {
        return {
          ...u,
          roles: u.roles.filter(r => r !== roleToRevoke),
          primaryRole: u.primaryRole === roleToRevoke ? u.roles[0] || '' : u.primaryRole,
        }
      }
      return u
    })
    setUsers(updatedUsers)
    alert('Role revoked successfully!')
  }

  const handleSetPrimaryRole = (user, primaryRole) => {
    if (!confirm(`Set ${getRoleLabel(primaryRole)} as primary role for ${user.name || user.email}?`)) return
    const updatedUsers = users.map(u => {
      if (u.userId === user.userId) {
        return { ...u, primaryRole }
      }
      return u
    })
    setUsers(updatedUsers)
    alert('Primary role updated successfully!')
  }

  const toggleUserExpansion = (userId) => {
    setExpandedUsers(prev => ({ ...prev, [userId]: !prev[userId] }))
  }

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.roles?.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getRoleStats = () => {
    const stats = {}
    users.forEach(user => {
      user.roles?.forEach(role => { stats[role] = (stats[role] || 0) + 1 })
    })
    return stats
  }

  const roleStats = getRoleStats()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-gold"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-primary-blue to-primary-gold p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <Users size={48} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Admins</p>
              <p className="text-3xl font-bold">{roleStats.admin || 0}</p>
            </div>
            <Shield size={48} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Super BDs</p>
              <p className="text-3xl font-bold">{roleStats.super_bd || 0}</p>
            </div>
            <Users size={48} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Agency Owners</p>
              <p className="text-3xl font-bold">{roleStats.agency_owner || 0}</p>
            </div>
            <Users size={48} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card p-4 rounded-lg shadow-lg border border-primary-gold/20">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users by name, email, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue bg-input-fill transition-all"
          />
          <button className="px-6 py-2 bg-gradient-to-r from-primary-blue to-primary-gold text-white rounded-lg hover:from-primary-blue/90 hover:to-primary-gold/90 flex items-center gap-2 shadow-lg transition-all">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {filteredUsers.map(user => {
          const isExpanded = expandedUsers[user.userId]

          return (
            <div key={user.userId} className="bg-card rounded-lg shadow-lg border border-primary-gold/20 overflow-hidden">
              <div
                onClick={() => toggleUserExpansion(user.userId)}
                className="p-4 cursor-pointer hover:bg-background transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-blue to-primary-gold flex items-center justify-center text-white font-bold text-lg">
                      {(user.name || user.email)?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">
                        {user.name || user.email}
                        {user.isVerified && (
                          <span className="ml-2 text-primary-blue">✔</span>
                        )}
                      </p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                      <p className="text-xs text-text-hint">ID: {user.userId}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      {user.roles?.map(role => (
                        <span
                          key={role}
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1"
                          style={{ backgroundColor: getRoleColor(role) }}
                        >
                          {role === user.primaryRole && <Star size={12} fill="white" />}
                          {getRoleLabel(role)}
                        </span>
                      ))}
                    </div>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 bg-background/50">
                  <div className="border-t border-divider pt-3">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-sm">Manage Roles:</p>
                      <button
                        onClick={() => handleOpenAssignDialog(user)}
                        className="px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-gold text-white rounded-lg hover:from-primary-blue/90 hover:to-primary-gold/90 flex items-center gap-2 text-sm shadow-lg transition-all"
                      >
                        <Plus size={16} />
                        Assign Role
                      </button>
                    </div>

                    <div className="space-y-2">
                      {user.roles?.map(role => (
                        <div key={role} className="flex items-center justify-between p-3 bg-card rounded-lg border border-input-border">
                          <div className="flex items-center gap-3">
                            <span
                              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                              style={{ backgroundColor: getRoleColor(role) }}
                            >
                              {getRoleLabel(role)}
                            </span>
                            {role === user.primaryRole && (
                              <span className="text-xs text-primary-gold font-semibold flex items-center gap-1">
                                <Star size={14} fill="#DAA520" />
                                Primary Role
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {role !== user.primaryRole && (
                              <button
                                onClick={() => handleSetPrimaryRole(user, role)}
                                className="px-3 py-1 text-xs bg-primary-gold text-white rounded-lg hover:bg-primary-gold/90 transition-all"
                              >
                                Set as Primary
                              </button>
                            )}
                            {user.roles.length > 1 && (
                              <button
                                onClick={() => handleRevokeRole(user, role)}
                                className="p-2 text-error hover:bg-error/10 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Assign Role Dialog */}
      {assignDialogOpen && selectedUserForAssign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCloseAssignDialog}>
          <div className="bg-card rounded-lg shadow-2xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-primary-blue">Assign Role</h3>

            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-text-secondary mb-1">User</p>
                <p className="font-semibold">{selectedUserForAssign.name || selectedUserForAssign.email}</p>
                <p className="text-xs text-text-hint mt-1">ID: {selectedUserForAssign.userId}</p>
              </div>

              <div>
                <p className="text-sm text-text-secondary mb-2">Current Roles:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUserForAssign.roles?.map(role => (
                    <span
                      key={role}
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: getRoleColor(role) }}
                    >
                      {getRoleLabel(role)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Select Role to Assign</label>
                <select
                  value={selectedRoleToAssign}
                  onChange={(e) => setSelectedRoleToAssign(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue bg-input-fill"
                >
                  <option value="">Choose a role...</option>
                  {getAvailableRoles()
                    .filter(role => !selectedUserForAssign.roles?.includes(role.value))
                    .map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCloseAssignDialog}
                  disabled={assigning}
                  className="flex-1 px-4 py-2 border-2 border-input-border rounded-lg hover:bg-background transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignRole}
                  disabled={assigning || !selectedRoleToAssign}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-gold text-white rounded-lg hover:from-primary-blue/90 hover:to-primary-gold/90 shadow-lg transition-all disabled:opacity-50"
                >
                  {assigning ? 'Assigning...' : 'Assign Role'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoleManagement

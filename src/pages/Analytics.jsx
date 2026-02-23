import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#1E90FF', '#FFD700', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

const Analytics = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // Dummy analytics data
  const dummyStats = {
    totalUsers: 12547,
    activeUsers: 10234,
    bannedUsers: 1243,
    suspendedUsers: 1070,
    roleDistribution: {
      admin: 42,
      host: 3245,
      agency: 876,
      coin_seller: 2341,
      regular_user: 4567,
      moderator: 156,
      guest: 1345
    },
    newUsersToday: 89,
    newUsersThisWeek: 567,
    newUsersThisMonth: 2341,
    deletedUsers: 432,
    verifiedUsers: 8765,
    unverifiedUsers: 3782,
    loginCountToday: 1245,
    averageSessionTime: "8.5 minutes",
    topRoles: [
      { role: "regular_user", count: 4567, growth: "+12%" },
      { role: "host", count: 3245, growth: "+8%" },
      { role: "coin_seller", count: 2341, growth: "+15%" },
      { role: "guest", count: 1345, growth: "-3%" }
    ],
    monthlyGrowth: [
      { month: "Jan 2024", users: 11234 },
      { month: "Feb 2024", users: 11567 },
      { month: "Mar 2024", users: 11892 },
      { month: "Apr 2024", users: 12145 },
      { month: "May 2024", users: 12378 },
      { month: "Jun 2024", users: 12547 }
    ],
    userEngagement: {
      daily: 4567,
      weekly: 7890,
      monthly: 10234
    }
  }

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setStats(dummyStats)
      setLoading(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Prepare data for charts
  const roleData = Object.entries(stats?.roleDistribution || {}).map(([role, count]) => ({
    name: role.replace('_', ' ').toUpperCase(),
    value: count,
  }))

  const statusData = [
    { name: 'Active', value: stats?.activeUsers || 0 },
    { name: 'Banned', value: stats?.bannedUsers || 0 },
    { name: 'Suspended', value: stats?.suspendedUsers || 0 },
  ]

  const engagementData = [
    { name: 'Daily', value: stats?.userEngagement?.daily || 0 },
    { name: 'Weekly', value: stats?.userEngagement?.weekly || 0 },
    { name: 'Monthly', value: stats?.userEngagement?.monthly || 0 },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Platform Analytics</h2>
        <p className="text-gray-600">Overview of user statistics and platform metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalUsers?.toLocaleString() || 0}</p>
          <p className="text-sm text-green-600 mt-2">+{stats?.newUsersToday || 0} today</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.activeUsers?.toLocaleString() || 0}</p>
          <p className="text-sm text-gray-500 mt-2">{((stats?.activeUsers / stats?.totalUsers) * 100).toFixed(1)}% of total</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Banned Users</h3>
          <p className="text-3xl font-bold text-red-600">{stats?.bannedUsers?.toLocaleString() || 0}</p>
          <p className="text-sm text-gray-500 mt-2">{((stats?.bannedUsers / stats?.totalUsers) * 100).toFixed(1)}% of total</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Suspended</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats?.suspendedUsers?.toLocaleString() || 0}</p>
          <p className="text-sm text-gray-500 mt-2">{((stats?.suspendedUsers / stats?.totalUsers) * 100).toFixed(1)}% of total</p>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Verified Users</h3>
          <p className="text-2xl font-bold text-purple-600">{stats?.verifiedUsers?.toLocaleString() || 0}</p>
          <p className="text-sm text-gray-500 mt-2">{((stats?.verifiedUsers / stats?.totalUsers) * 100).toFixed(1)}% verified</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">New This Week</h3>
          <p className="text-2xl font-bold text-indigo-600">{stats?.newUsersThisWeek?.toLocaleString() || 0}</p>
          <p className="text-sm text-green-600 mt-2">↑ {((stats?.newUsersThisWeek / stats?.totalUsers) * 100).toFixed(1)}% growth</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Today's Logins</h3>
          <p className="text-2xl font-bold text-pink-600">{stats?.loginCountToday?.toLocaleString() || 0}</p>
          <p className="text-sm text-gray-500 mt-2">Avg. session: {stats?.averageSessionTime}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Deleted Users</h3>
          <p className="text-2xl font-bold text-gray-600">{stats?.deletedUsers?.toLocaleString() || 0}</p>
          <p className="text-sm text-gray-500 mt-2">All time</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Role Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1E90FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.monthlyGrowth || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Engagement */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Roles Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Roles by Growth</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Count</th>
                  <th className="text-left py-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                {stats?.topRoles?.map((role, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 capitalize">{role.role.replace('_', ' ')}</td>
                    <td className="py-2">{role.count.toLocaleString()}</td>
                    <td className={`py-2 ${role.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {role.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Role Details Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Detailed Role Statistics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(stats?.roleDistribution || {})
                .sort(([, a], [, b]) => b - a)
                .map(([role, count]) => (
                  <tr key={role}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {role.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {count.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {((count / stats.totalUsers) * 100).toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Math.round(count * 0.7).toLocaleString()} (70%)
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow text-white">
          <h4 className="text-sm opacity-90 mb-1">New Users (Today)</h4>
          <p className="text-3xl font-bold">{stats?.newUsersToday || 0}</p>
          <p className="text-xs opacity-75 mt-2">↑ 12% from yesterday</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow text-white">
          <h4 className="text-sm opacity-90 mb-1">Active Users</h4>
          <p className="text-3xl font-bold">{stats?.userEngagement?.daily?.toLocaleString() || 0}</p>
          <p className="text-xs opacity-75 mt-2">Daily active users</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow text-white">
          <h4 className="text-sm opacity-90 mb-1">Verification Rate</h4>
          <p className="text-3xl font-bold">{((stats?.verifiedUsers / stats?.totalUsers) * 100).toFixed(1)}%</p>
          <p className="text-xs opacity-75 mt-2">{stats?.verifiedUsers?.toLocaleString()} verified users</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics
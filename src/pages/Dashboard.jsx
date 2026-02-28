import { useState, useEffect } from 'react'
import { Users, UserCheck, UserX, Shield } from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [pendingApps, setPendingApps] = useState({ host: 0, agency: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // simulate backend delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // 🔹 Dummy statistics (same structure as backend)
      const statistics = {
        totalUsers: 137,
        activeUsers: 118,
        bannedUsers: 19,
        roleDistribution: {
          admin: 5,
          super_admin: 2,
          manager: 10,
          country_head: 6,
          host: 40,
          agency_owner: 20,
          user: 54,
        },
      }

      // 🔹 Dummy pending applications
      const hostApps = new Array(8).fill({})
      const agencyApps = new Array(5).fill({})

      setStats(statistics)
      setPendingApps({
        host: hostApps.length,
        agency: agencyApps.length,
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      name: 'Banned Users',
      value: stats?.bannedUsers || 0,
      icon: UserX,
      color: 'bg-red-500',
    },
    {
      name: 'Pending Apps',
      value: pendingApps.host + pendingApps.agency,
      icon: Shield,
      color: 'bg-yellow-500',
    },
  ]



  return (
    
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to MaSAT Admin Panel</h2>
        <p className="mt-2 text-gray-600">
          Manage users, roles, and applications from this dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Role Distribution */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Role Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats?.roleDistribution &&
            Object.entries(stats.roleDistribution).map(([role, count]) => (
              <div key={role} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 capitalize">
                  {role.replace('_', ' ')}
                </p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/users"
            className="block p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-semibold text-blue-600">Manage Users</h4>
            <p className="text-sm text-gray-600 mt-1">
              View and edit user accounts
            </p>
          </a>

          <a
            href="/applications"
            className="block p-4 border-2 border-yellow-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
          >
            <h4 className="font-semibold text-yellow-600">
              Review Applications
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {pendingApps.host + pendingApps.agency} pending
            </p>
          </a>

          <a
            href="/roles"
            className="block p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            <h4 className="font-semibold text-purple-600">Assign Roles</h4>
            <p className="text-sm text-gray-600 mt-1">
              Manage user permissions
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

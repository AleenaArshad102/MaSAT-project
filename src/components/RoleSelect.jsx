const roles = [
  { value: 'user', label: 'User', level: 0, color: 'bg-gray-100 text-gray-800' },
  { value: 'host', label: 'Host', level: 1, color: 'bg-blue-100 text-blue-800' },
  { value: 'cs', label: 'Customer Service', level: 50, color: 'bg-green-100 text-green-800' },
  { value: 'junior_bd', label: 'Junior BD', level: 2, color: 'bg-purple-100 text-purple-800' },
  { value: 'senior_bd', label: 'Senior BD', level: 2.5, color: 'bg-purple-100 text-purple-800' },
  { value: 'super_bd', label: 'Super BD (BD Leader)', level: 3, color: 'bg-purple-200 text-purple-900' },
  { value: 'agency_owner', label: 'Agency Owner', level: 6, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'manager', label: 'Manager', level: 4, color: 'bg-orange-100 text-orange-800' },
  { value: 'country_head', label: 'Country Head', level: 5, color: 'bg-orange-100 text-orange-800' },
  { value: 'merchant', label: 'Merchant', level: 100, color: 'bg-indigo-100 text-indigo-800' },
  { value: 'coin_seller', label: 'Coin Seller', level: 101, color: 'bg-indigo-100 text-indigo-800' },
  { value: 'admin', label: 'Admin', level: 200, color: 'bg-red-100 text-red-800' },
  { value: 'super_admin', label: 'Super Admin', level: 999, color: 'bg-red-100 text-red-800' },
]

const RoleSelect = ({ value, onChange, disabled = false }) => {
  const selectedRole = roles.find(r => r.value === value) || roles[0]

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      }`}
    >
      {roles.map((role) => (
        <option key={role.value} value={role.value}>
          {role.label} (Level {role.level})
        </option>
      ))}
    </select>
  )
}

export const RoleBadge = ({ role }) => {
  const roleData = roles.find(r => r.value === role) || roles[0]

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleData.color}`}>
      {roleData.label}
    </span>
  )
}

export const getRoleLabel = (roleValue) => {
  return roles.find(r => r.value === roleValue)?.label || 'Unknown'
}

export default RoleSelect
export { roles }

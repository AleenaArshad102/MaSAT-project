import { useState, useEffect } from 'react'
import { Check, X, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

const Applications = () => {
  const [hostApps, setHostApps] = useState([])
  const [agencyApps, setAgencyApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('host')
  const [currentAdmin, setCurrentAdmin] = useState(null)

  // Dummy data
  const dummyHostApplications = [
    {
      applicationId: 'host_app_1',
      userId: 'user_123',
      name: 'John Smith',
      email: 'john.smith@example.com',
      gender: 'Male',
      language: 'English',
      contentType: 'Travel & Lifestyle',
      createdAt: new Date('2024-01-15T10:30:00').toISOString(),
      idPhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      status: 'pending',
      phone: '+1-555-0123',
      location: 'New York, USA'
    },
    {
      applicationId: 'host_app_2',
      userId: 'user_456',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      gender: 'Female',
      language: 'Spanish',
      contentType: 'Food & Cooking',
      createdAt: new Date('2024-01-14T15:45:00').toISOString(),
      idPhotoUrl: 'https://images.unsplash.com/photo-1494790108777-466fd0c7c5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      status: 'pending',
      phone: '+1-555-0456',
      location: 'Miami, USA'
    },
    {
      applicationId: 'host_app_3',
      userId: 'user_789',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      gender: 'Male',
      language: 'Mandarin',
      contentType: 'Technology & Gaming',
      createdAt: new Date('2024-01-13T09:15:00').toISOString(),
      idPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      status: 'pending',
      phone: '+1-555-0789',
      location: 'San Francisco, USA'
    },
    {
      applicationId: 'host_app_4',
      userId: 'user_101',
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      gender: 'Female',
      language: 'French',
      contentType: 'Fashion & Beauty',
      createdAt: new Date('2024-01-12T14:20:00').toISOString(),
      idPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      status: 'pending',
      phone: '+1-555-0321',
      location: 'Los Angeles, USA'
    },
    {
      applicationId: 'host_app_5',
      userId: 'user_112',
      name: 'David Brown',
      email: 'david.b@example.com',
      gender: 'Male',
      language: 'German',
      contentType: 'Fitness & Health',
      createdAt: new Date('2024-01-11T11:00:00').toISOString(),
      idPhotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      status: 'pending',
      phone: '+1-555-0654',
      location: 'Chicago, USA'
    }
  ]

  const dummyAgencyApplications = [
    {
      applicationId: 'agency_app_1',
      userId: 'agency_user_1',
      agencyName: 'Global Talent Agency',
      contactInfo: 'contact@globaltalent.com | +1-555-1000',
      country: 'United States',
      description: 'Full-service talent agency representing content creators across multiple platforms. Specializing in lifestyle, fashion, and entertainment.',
      createdAt: new Date('2024-01-10T10:00:00').toISOString(),
      website: 'https://globaltalent.com',
      foundedYear: '2015',
      numberOfTalent: '50+',
      status: 'pending'
    },
    {
      applicationId: 'agency_app_2',
      userId: 'agency_user_2',
      agencyName: 'Asia Star Management',
      contactInfo: 'info@asiastar.asia | +82-2-555-1234',
      country: 'South Korea',
      description: 'Leading agency for K-content creators, influencers, and entertainers. Focus on Korean Wave (Hallyu) content.',
      createdAt: new Date('2024-01-09T14:30:00').toISOString(),
      website: 'https://asiastar.asia',
      foundedYear: '2018',
      numberOfTalent: '30+',
      status: 'pending'
    },
    {
      applicationId: 'agency_app_3',
      userId: 'agency_user_3',
      agencyName: 'Euro Creatives',
      contactInfo: 'hello@eurocreatives.eu | +44-20-555-6789',
      country: 'United Kingdom',
      description: 'European network of content creators, influencers, and digital artists. Representing talent across UK, France, and Germany.',
      createdAt: new Date('2024-01-08T09:45:00').toISOString(),
      website: 'https://eurocreatives.eu',
      foundedYear: '2016',
      numberOfTalent: '25+',
      status: 'pending'
    },
    {
      applicationId: 'agency_app_4',
      userId: 'agency_user_4',
      agencyName: 'LatAm Influencers',
      contactInfo: 'info@lataminfluencers.com | +52-55-5555-1234',
      country: 'Mexico',
      description: 'Premier talent agency for Latin American content creators. Specializing in Spanish and Portuguese markets.',
      createdAt: new Date('2024-01-07T16:20:00').toISOString(),
      website: 'https://lataminfluencers.com',
      foundedYear: '2019',
      numberOfTalent: '20+',
      status: 'pending'
    },
    {
      applicationId: 'agency_app_5',
      userId: 'agency_user_5',
      agencyName: 'Digital Stars ME',
      contactInfo: 'contact@digitalstars.ae | +971-4-555-7890',
      country: 'UAE',
      description: 'Middle East\'s fastest growing digital talent agency. Representing creators across UAE, Saudi Arabia, and Egypt.',
      createdAt: new Date('2024-01-06T12:15:00').toISOString(),
      website: 'https://digitalstars.ae',
      foundedYear: '2020',
      numberOfTalent: '15+',
      status: 'pending'
    }
  ]

  useEffect(() => {
    loadApplications()
    loadCurrentAdmin()
  }, [])

  const loadCurrentAdmin = async () => {
    // Simulate API delay
    setTimeout(() => {
      setCurrentAdmin('admin_123')
    }, 300)
  }

  const loadApplications = async () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setHostApps(dummyHostApplications)
      setAgencyApps(dummyAgencyApplications)
      setLoading(false)
    }, 800)
  }

  const handleApproveHost = async (app) => {
    if (!confirm(`Approve ${app.name} as a Host?`)) return

    // Simulate API call
    setTimeout(() => {
      // Remove the approved app from the list
      setHostApps(hostApps.filter(a => a.applicationId !== app.applicationId))
      alert(`✅ Host application approved for ${app.name}!`)
    }, 500)
  }

  const handleRejectHost = async (app) => {
    const reason = prompt('Enter rejection reason:')
    if (!reason) return

    // Simulate API call
    setTimeout(() => {
      // Remove the rejected app from the list
      setHostApps(hostApps.filter(a => a.applicationId !== app.applicationId))
      alert(`❌ Host application rejected for ${app.name}. Reason: ${reason}`)
    }, 500)
  }

  const handleApproveAgency = async (app) => {
    if (!confirm(`Approve ${app.agencyName} as an Agency?`)) return

    // Simulate API call
    setTimeout(() => {
      // Remove the approved app from the list
      setAgencyApps(agencyApps.filter(a => a.applicationId !== app.applicationId))
      alert(`✅ Agency application approved for ${app.agencyName}!`)
    }, 500)
  }

  const handleRejectAgency = async (app) => {
    const reason = prompt('Enter rejection reason:')
    if (!reason) return

    // Simulate API call
    setTimeout(() => {
      // Remove the rejected app from the list
      setAgencyApps(agencyApps.filter(a => a.applicationId !== app.applicationId))
      alert(`❌ Agency application rejected for ${app.agencyName}. Reason: ${reason}`)
    }, 500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('host')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'host'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Host Applications ({hostApps.length})
            </button>
            <button
              onClick={() => setActiveTab('agency')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'agency'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Agency Applications ({agencyApps.length})
            </button>
          </nav>
        </div>

        {/* Host Applications */}
        {activeTab === 'host' && (
          <div className="p-6">
            {hostApps.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No pending host applications
              </div>
            ) : (
              <div className="space-y-4">
                {hostApps.map((app) => (
                  <div
                    key={app.applicationId}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">User ID: {app.userId}</p>
                        <p className="text-sm text-gray-500">Email: {app.email}</p>
                        <p className="text-sm text-gray-500">Phone: {app.phone}</p>
                        <p className="text-sm text-gray-500">Location: {app.location}</p>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Gender</p>
                            <p className="text-sm font-medium text-gray-900">{app.gender}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Language</p>
                            <p className="text-sm font-medium text-gray-900">{app.language}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Content Type</p>
                            <p className="text-sm font-medium text-gray-900">{app.contentType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Applied</p>
                            <p className="text-sm font-medium text-gray-900">
                              {format(new Date(app.createdAt), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>

                        {app.idPhotoUrl && (
                          <div className="mt-4">
                            <a
                              href={app.idPhotoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink size={16} />
                              View ID Photo
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleApproveHost(app)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Check size={18} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectHost(app)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <X size={18} />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Agency Applications */}
        {activeTab === 'agency' && (
          <div className="p-6">
            {agencyApps.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No pending agency applications
              </div>
            ) : (
              <div className="space-y-4">
                {agencyApps.map((app) => (
                  <div
                    key={app.applicationId}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{app.agencyName}</h3>
                        <p className="text-sm text-gray-500 mt-1">Applicant ID: {app.userId}</p>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Contact Info</p>
                            <p className="text-sm font-medium text-gray-900">{app.contactInfo}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Country</p>
                            <p className="text-sm font-medium text-gray-900">{app.country}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Website</p>
                            <p className="text-sm font-medium text-gray-900">
                              <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {app.website}
                              </a>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Founded</p>
                            <p className="text-sm font-medium text-gray-900">{app.foundedYear}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Talent Count</p>
                            <p className="text-sm font-medium text-gray-900">{app.numberOfTalent}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Applied</p>
                            <p className="text-sm font-medium text-gray-900">
                              {format(new Date(app.createdAt), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>

                        {app.description && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">Description</p>
                            <p className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg">
                              {app.description}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleApproveAgency(app)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Check size={18} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectAgency(app)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <X size={18} />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Applications
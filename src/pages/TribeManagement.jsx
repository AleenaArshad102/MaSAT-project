import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

const TribeManagement = () => {
  const [activeTab, setActiveTab] = useState('tribes')
  const [loading, setLoading] = useState(true);

  // 🔹 Exact Spinner Logic from your files
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // 🔹 Exact Spinner Component from your files
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }

  const tabs = [
    { id: 'tribes', name: 'Tribes (0)' },
    { id: 'requests', name: 'Pending Join Requests (0)' },
    { id: 'levels', name: 'Tribe Levels (0)' },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500 px-4 md:px-0 pb-10">
      {/* Header Section - Mobile Optimized */}
      <div className="flex flex-row items-center justify-between gap-4">
        <h1 className="text-[14px] md:text-[16px] font-bold text-blue-600 leading-tight">
          Tribe Management (Phase 2A)
        </h1>
        
        {/* Fixed Refresh Button: Solid Blue with White Text */}
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 md:px-5 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-sm active:scale-95 shrink-0"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Tabs Section - Horizontal Scroll for Mobile */}
      <div className="flex overflow-x-auto pb-1 no-scrollbar">
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-6 py-2.5 rounded-lg font-bold text-[13px] md:text-[14px] transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-gray-100' 
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section - Responsive Scroll Wrapper */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[300px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                {activeTab === 'tribes' && (
                  <>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Cover</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Name</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">ID</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Owner</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Level</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Members</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Daily / Weekly / Monthly Exp</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Country</th>
                  </>
                )}
                {activeTab === 'requests' && (
                  <>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Request ID</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Tribe ID</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">User ID</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Message</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Requested At</th>
                  </>
                )}
                {activeTab === 'levels' && (
                  <>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Level</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Name</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Exp Threshold</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Max Admins</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Max Members</th>
                    <th className="px-6 py-4 text-[11px] text-gray-600 uppercase font-bold">Badge</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="10" className="px-6 py-32 text-center">
                  <p className="text-gray-400 font-normal text-[14px] max-w-md mx-auto">
                    {activeTab === 'tribes' && "No tribes yet. Tribes are created in the app by Agency Owners (25000 coins)."}
                    {activeTab === 'requests' && "No pending join requests. Approve/Reject is done by Tribe Owner or Admin in the app."}
                    {activeTab === 'levels' && "No tribe levels configured. Add TribeLevel records (e.g. Barlas, Gauls, Vikings, Apache, Kayi) via API or seed."}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TribeManagement
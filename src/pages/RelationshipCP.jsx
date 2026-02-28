import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

const RelationshipCP = () => {
  const [activeTab, setActiveTab] = useState('type')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
    { id: 'type', name: 'Relationship Types (0)' },
    { id: 'invites', name: 'Pending Invites (0)' },
    { id: 'relationship', name: 'Relationships (0)' },
    { id: 'biding', name: 'CP Bindings (0)' },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500 px-4 md:px-0 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between gap-4">
        <h1 className="text-[14px] md:text-[16px] font-bold text-blue-600 leading-tight">
          Relationship & CP (Phase 2B)
        </h1>
        
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 md:px-5 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition-all shadow-sm active:scale-95 shrink-0"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Tabs Section  */}
      <div className="flex overflow-x-auto pb-1 md:pb-0 gap-2 no-scrollbar">
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-6 py-2 rounded-lg font-bold text-[12px] md:text-[14px] transition-all whitespace-nowrap ${
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

      {/* Table Section  */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[300px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                {activeTab === 'type' && (
                  <>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Type ID</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Name</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Cost (coins)</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Gift to accepter</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Description</th>
                  </>
                )}
                {activeTab === 'invites' && (
                  <>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Invite ID</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">From</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">To</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Type</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Cost / Gift</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Created</th>
                  </>
                )}
                {activeTab === 'relationship' && (
                  <>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">ID</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Inviter</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Accepter</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Type</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Status / Exp</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Started</th>
                  </>
                )}
                {activeTab === 'biding' && (
                  <>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Couple ID</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">User 1</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">User 2</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Weekly points</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase ">Bound at</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="10" className="px-6 py-32 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-400 font-normal text-[14px] max-w-md mx-auto">
                      {activeTab === 'type' && "No relationship types. Seed soulmate, confidant, brotherhood, sisterly, bestie, crime_partner via API."}
                      {activeTab === 'invites' && "No pending invites."}
                      {activeTab === 'relationship' && "No relationships yet."}
                      {activeTab === 'biding' && "No CP bindings yet."}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RelationshipCP
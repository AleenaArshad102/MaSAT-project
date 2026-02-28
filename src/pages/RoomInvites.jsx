import React, { useState, useEffect } from 'react'
import { Mail, RefreshCw, Search, ChevronDown } from 'lucide-react'

const RoomInvites = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-[#334155] px-4 md:px-0 pb-10">
      
      {/* --- HEADER SECTION (Mobile Optimized) --- */}
      <div className="flex flex-row justify-between items-center gap-4">
        <h1 className="text-[16px] md:text-[18px] font-bold text-blue-600 leading-tight">
          Room Invites (Phase 4A/4C)
        </h1>

        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg font-medium text-[13px] md:text-[14px] hover:bg-blue-700 transition-all shadow-sm active:scale-95 shrink-0"
        >
          <RefreshCw size={18} strokeWidth={2.5} className={loading ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* FILTERS  */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
      
        <div className="relative group flex-1 md:flex-none">
          <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-normal outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer w-full md:w-40">
            <option>All statuses</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={16} strokeWidth={2.5} />
          </div>
        </div>

    
        <input 
          type="text" 
          placeholder="Filter by To User ID" 
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 w-full md:w-48 placeholder:text-gray-400"
        />

        
        <input 
          type="text" 
          placeholder="Filter by Room ID / Name" 
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 w-full md:w-56 placeholder:text-gray-400"
        />
      </div>

      {/* TABLE SECTION  */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/30">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase ">Invite ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase ">To User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase ">Room</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase ">Inviter</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase ">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase ">Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="px-6 py-24 text-center">
                  <p className="text-gray-400 text-[14px] font-normal max-w-xs mx-auto md:max-w-none">
                    No room invites. Invites appear when users share rooms from the app.
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

export default RoomInvites
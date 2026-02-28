import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

const LeaderStats = () => {
    const [leaderId, setLeaderId] = useState('')
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
  

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Title */}
      <h1 className="text-[16px] font-bold text-blue-600 ">
        BD Leader Stats (Group 3)
      </h1>

      {/* Main Search Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-full">
        <div className="space-y-2">
          {/* Label */}
          <label className="text-[14px]  text-slate-800 block">
            BD Leader User ID
          </label>

          {/* Input and Button Container */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="e.g. 5001001"
                value={leaderId}
                onChange={(e) => setLeaderId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 placeholder:text-gray-300 transition-all bg-white"
              />
            </div>

            <button 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-[14px] hover:bg-[#7e9ae8] transition-all shadow-sm active:scale-95"
            >
              <Search size={18} />
              Load Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderStats
import React, { useState, useEffect } from 'react'
import { Gift, Calendar, RefreshCw } from 'lucide-react'

const RechargeActivity = () => {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500 text-[#334155]">
      
      {/* 1. Top Header Card */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Orange Gift Icon */}
          <Gift className="text-[#f59e0b]" size={24} strokeWidth={2.5} />
          <h1 className="text-[24px] font-bold text-slate-800 ">
            Recharge Activity Management
          </h1>
        </div>

        
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-[#f59e0b] text-white px-5 py-2 rounded-xl font-bold text-[14px] hover:bg-orange-500 transition-all shadow-md active:scale-95"
        >
          <RefreshCw size={18} strokeWidth={2.5} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 2. Current Recharge Event Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Sub-Header with Calendar Icon */}
        <div className="p-4 border-b border-gray-50 bg-orange-50/30 flex items-center gap-2">
          <Calendar className="text-[#f59e0b]" size={20} strokeWidth={2.5} />
          <h2 className="text-[16px] font-bold text-slate-800">
            Current Recharge Event
          </h2>
        </div>

        
        <div className="p-8 flex items-center justify-center min-h-[140px]">
          <p className="text-gray-400 text-[14px]  font-normal text-center">
            No active recharge event. Create one in DynamoDB (RechargeEvent) with status "active" and startDate/endDate covering now.
          </p>
        </div>
      </div>

    </div>
  )
}

export default RechargeActivity
import React, { useState, useEffect } from 'react'
import { CheckCircle2, Clock } from 'lucide-react'

const TopupApprovals = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-[#334155] px-4 md:px-0 pb-10">
      
      {/* HEADER SECTION*/}
      <div className="flex items-start md:items-center gap-3">
    
        <CheckCircle2 className="text-blue-600 shrink-0 mt-1 md:mt-0" size={28} strokeWidth={2.5} />
        <div>
          <h1 className="text-[22px] md:text-[26px] font-bold text-slate-800 leading-tight">Top-up Approvals</h1>
          <p className="text-gray-400 text-[13px] md:text-[14px] mt-0.5 max-w-xs md:max-w-none">
            Review and process manual bank transfer recharges
          </p>
        </div>
      </div>

      {/*  TABLE SECTION */}
      <div className="bg-white rounded-[24px] border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-8 py-5 text-[11px] font-bold text-gray-600 uppercase ">User Info</th>
                <th className="px-4 py-5 text-[11px] font-bold text-gray-600 uppercase ">Amount & Coins</th>
                <th className="px-4 py-5 text-[11px] font-bold text-gray-600 uppercase  text-center">Bank Detail</th>
                <th className="px-4 py-5 text-[11px] font-bold text-gray-600 uppercase  text-center">Proof</th>
                <th className="px-4 py-5 text-[11px] font-bold text-gray-600 uppercase  text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-600 uppercase  text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="py-24 md:py-32">
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="bg-gray-50 p-4 rounded-full">
                       <Clock size={40} className="text-gray-400" strokeWidth={1.5} />
                    </div>
                    <p className="text-[15px] md:text-[16px] font-normal text-gray-400 ">
                      No pending top-up requests.
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

export default TopupApprovals
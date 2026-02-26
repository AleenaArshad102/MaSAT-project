import React, { useState, useEffect } from 'react'
import { Banknote, FileText, Users, Percent, Search, ChevronUp, ChevronDown } from 'lucide-react'

const SalaryManagement = () => {
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
    <div className="space-y-4 animate-in fade-in duration-500 text-[#334155] px-4 md:px-0 pb-10">
      
      {/* --- TOP HEADER SECTION (Mobile Optimized) --- */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
             {/* Exact Bank Icon as requested */}
            <Banknote className="text-blue-600 shrink-0" size={28} strokeWidth={2.5} />
            <h1 className="text-[20px] md:text-[24px] font-bold text-slate-800">Salary Management</h1>
          </div>
          <p className="text-gray-400 text-[13px] md:text-[14px] mt-1">
            Process host salaries and agency commissions
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl font-bold text-[13px] md:text-[14px] text-slate-700 hover:bg-gray-50 transition-all">
            <FileText size={18} className="text-slate-500" />
            <span>Audit trail</span>
          </button>
          <button className="flex-1 md:flex-none bg-[#93c5fd] text-white px-6 py-2.5 rounded-xl font-bold text-[13px] md:text-[14px] cursor-not-allowed shadow-sm whitespace-nowrap">
            Payout (0)
          </button>
        </div>
      </div>

      {/* --- SEARCH & STATS BAR (Responsive Wrap) --- */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-3 md:gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full bg-[#f8fafc] border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Stats: Hosts Found */}
          <div className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#eff6ff] text-[#2563eb] px-4 py-2.5 rounded-2xl font-bold text-[13px] md:text-[14px] whitespace-nowrap">
            <Users size={18} />
            <span>0 Hosts Found</span>
          </div>

          {/* Stats: Tax withheld */}
          <div className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#fffbeb] text-[#92400e] px-4 py-2.5 rounded-2xl text-[12px] md:text-[13px] font-medium border border-[#fef3c7] whitespace-nowrap">
            <Percent size={18} />
            <span className="hidden sm:inline">Tax withheld: 0%</span>
            <span className="sm:hidden">Tax: 0%</span>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION (Responsive Scroll) --- */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 w-12"></th>
                <th className="px-1 py-4 text-[11px] font-bold text-slate-600 uppercase ">Host Info</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-600 uppercase ">Performance</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Level</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Calculated Payout</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Balance</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Backup Wallet</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-600 uppercase  text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty State */}
              <tr className="border-t border-gray-50/50">
                <td colSpan="8" className="px-6 py-24 text-center">
                   <div className="flex flex-col items-center justify-center">
                      <p className="text-[15px] font-normal text-gray-400">No salary records to display</p>
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

export default SalaryManagement
import React, { useState, useEffect } from 'react'
import { Search, Star, Globe, Users, ArrowRight, Palette, Save, ImageIcon, ArrowLeft, DollarSign, Calendar, TrendingUp } from 'lucide-react'

const AgencyRevenue = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState(null);

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

  // --- Agency Detail View ---
  if (selectedAgency) {
    return (
      <div className="space-y-6 pb-10 animate-in fade-in duration-500">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
          <button 
            onClick={() => setSelectedAgency(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-slate-700 font-bold text-sm hover:bg-gray-50 transition-all uppercase shadow-sm"
          >
            <ArrowLeft size={18} /> Back to List
          </button>
          <span className="text-gray-400 font-black text-xs uppercase ">Revenue Intelligence</span>
        </div>

        {/* Agency Profile Card */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-100 uppercase">
              {selectedAgency.initial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">{selectedAgency.name}</h1>
                <div className="bg-blue-500 text-white p-1 rounded-full"><Star size={12} fill="currentColor"/></div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase ">Active</span>
                <span className="text-gray-400 text-xs font-bold uppercase">ID: {selectedAgency.id}</span>
              </div>
            </div>
          </div>
          <div className="text-right hidden md:block">
             <p className="text-blue-600 font-black text-xs uppercase  mb-1">Agency Management</p>
             <h2 className="text-2xl font-black text-slate-800 ">{selectedAgency.id}...</h2>
             <p className="text-gray-400 text-[10px] font-medium">Created: Feb 21, 2026</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: '$0', icon: <DollarSign className="text-blue-600" />, trend: '+12.4%' },
            { label: 'Monthly Earnings', value: '$0', icon: <TrendingUp className="text-indigo-600" /> },
            { label: 'Total Hosts', value: '0', icon: <Users className="text-purple-600" /> },
            { label: 'Current Balance', value: '$0', icon: <Calendar className="text-slate-800" />, action: 'Request Payout' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-2xl">{stat.icon}</div>
                {stat.trend && <span className="bg-emerald-50 text-emerald-500 text-[10px] font-black px-2 py-1 rounded-lg">{stat.trend}</span>}
              </div>
              <p className="text-gray-400 text-[10px] font-black uppercase ">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{stat.value}</h3>
              {stat.action && <button className="text-blue-600 text-[10px] font-black uppercase mt-2 hover:underline ">{stat.action}</button>}
            </div>
          ))}
        </div>

        {/* Main Content: Table & Right Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Managed Talent Network Table Section */}
          <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
               <div className="flex items-center gap-2 font-black text-slate-800 uppercase text-sm ">
                 <Users size={18} className="text-blue-600" /> Managed Talent Network
               </div>
               <button className="text-blue-600 text-[10px] font-black uppercase flex items-center gap-1 hover:underline">
                  Export Data <ArrowRight size={14}/>
               </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase ">Host Profile</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase ">Earnings</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase ">Metrics</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase ">Status</th>
                  </tr>
                </thead>
              </table>
              {/* Empty State matching image */}
              <div className="py-24 text-center">
                 <p className="text-gray-400  text-sm font-medium px-4">
                   No verified talent registered under this agency.
                 </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Revenue Stream & Master Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 font-black text-slate-800 uppercase text-[10px]  mb-6 border-b border-gray-50 pb-4">
                 <Calendar size={16} className="text-blue-600" /> Revenue Stream
               </div>
               <div className="py-12 text-center">
                 <p className="text-gray-400 font-black text-[10px] uppercase ">Zero Transactions Today</p>
               </div>
            </div>

            <div className="bg-[#24294e] p-8 rounded-[32px] shadow-xl shadow-blue-50/50 relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                  <Star size={120} fill="white" />
               </div>
               <Star className="text-yellow-400 mb-4" fill="currentColor" size={24} />
               <h3 className="text-white font-black text-xl uppercase leading-tight mb-2 ">Master Level Intelligence</h3>
               <p className="text-blue-200/70 text-xs leading-relaxed mb-8 font-medium">This agency ranks in the elite tier of contributors. Revenue sharing is currently set at 100%.</p>
               <button className="w-full bg-white text-[#24294e] py-3.5 rounded-[20px] font-black text-[11px] uppercase  hover:bg-gray-50 transition-all shadow-lg">
                  Performance Insights
               </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  
  const agencies = [
    {
      id: '50010',
      name: "ADMIN USER'S AGENCY",
      region: 'US',
      talent: 0,
      revenue: 0,
      monthlyChange: 0,
      status: 'ACTIVE',
      initial: 'A'
    }
  ]

  return (
    <div className="space-y-6 px-2 md:px-0 pb-10">
      <div className="bg-white p-4 md:p-6 rounded-[24px] md:rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">Agency Network</h1>
          <p className="text-gray-400 text-xs md:text-sm font-medium mt-1">Overview of all active agencies and their performance</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1e293b] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-700 transition-all shadow-sm active:scale-95 ">
            <Star size={18} /> Create Test
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm border border-gray-150 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-140 bg-gray-100">
                <th className="px-6 py-5 text-[11px] font-boldtext-gray-600 uppercase ">Agency</th>
                <th className="px-6 py-5 text-[11px] font-boldtext-gray-600 uppercase ">Region</th>
                <th className="px-6 py-5 text-[11px] font-boldtext-gray-600 uppercase ">Talent</th>
                <th className="px-6 py-5 text-[11px] font-boldtext-gray-600 uppercase  text-center">Revenue (USD)</th>
                <th className="px-6 py-5 text-[11px] font-boldtext-gray-600 uppercase  text-center">Status</th>
                <th className="px-6 py-5 text-[11px] font-boldtext-gray-600 uppercase  text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {agencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-lg md:text-xl font-black shadow-lg shadow-blue-100 uppercase">
                        {agency.initial}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-black text-slate-800 text-sm uppercase truncate">{agency.name}</h3>
                        <p className="text-[10px] md:text-[11px] font-bold text-gray-400 mt-1 uppercase">ID: {agency.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5"><div className="flex items-center gap-2 text-slate-700 font-bold text-sm"><Globe size={16} className="text-blue-500 shrink-0" /> {agency.region}</div></td>
                  <td className="px-6 py-5"><div className="flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg w-fit"><Users size={16} /><span className="font-black text-sm">{agency.talent}</span></div></td>
                  <td className="px-6 py-5 text-center"><div className="font-black text-slate-800 text-base">${agency.revenue}</div><div className="text-[10px] md:text-[11px] font-bold text-emerald-500 mt-0.5">Month: +${agency.monthlyChange}</div></td>
                  <td className="px-6 py-5 text-center"><span className="inline-block bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">{agency.status}</span></td>
                  <td className="px-6 py-5 text-right">
                    <button onClick={() => setSelectedAgency(agency)} className="p-2.5 rounded-xl border border-gray-100 bg-white text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-100 transition-all active:scale-90">
                      <ArrowRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AgencyRevenue
import React, { useState, useEffect } from 'react'
import { Search, Star, Globe, Users, ArrowRight } from 'lucide-react'

const AgencyRevenue = () => {
  const [searchTerm, setSearchTerm] = useState('')
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

  // Dummy data 
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
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">
            Agency Network
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-medium mt-1">
            Overview of all active agencies and their performance
          </p>
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

          
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1e293b] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-700 transition-all shadow-sm active:scale-95">
            <Star size={18} />
            Create Test
          </button>
        </div>
      </div>

      
      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm border border-gray-150 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30">
                <th className="px-6 py-5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Agency</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Talent</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-500 uppercase tracking-wider text-center">Revenue (USD)</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {agencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50/50 transition-colors group">
                  
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-lg md:text-xl font-black shadow-lg shadow-blue-100">
                        {agency.initial}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-black text-slate-800 text-sm uppercase truncate">
                          {agency.name}
                        </h3>
                        <p className="text-[10px] md:text-[11px] font-bold text-gray-400 mt-1 uppercase">
                          ID: {agency.id}
                        </p>
                      </div>
                    </div>
                  </td>

          
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                      <Globe size={16} className="text-blue-500 shrink-0" />
                      {agency.region}
                    </div>
                  </td>

                  
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg w-fit">
                      <Users size={16} />
                      <span className="font-black text-sm">{agency.talent}</span>
                    </div>
                  </td>

              
                  <td className="px-6 py-5 text-center">
                    <div className="font-black text-slate-800 text-base">${agency.revenue}</div>
                    <div className="text-[10px] md:text-[11px] font-bold text-emerald-500 mt-0.5">
                      Month: +${agency.monthlyChange}
                    </div>
                  </td>

                  
                  <td className="px-6 py-5 text-center">
                    <span className="inline-block bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      {agency.status}
                    </span>
                  </td>

                  
                  <td className="px-6 py-5 text-right">
                    <button className="p-2.5 rounded-xl border border-gray-100 bg-white text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-100 transition-all active:scale-90">
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
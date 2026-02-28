import React, { useState, useEffect } from 'react'
import { 
  FileCheck, Search, Check, X, User, Users, FileText, 
  XCircle, Shield, ChevronLeft, ChevronRight 
} from 'lucide-react'

/*  MOCK DATA GENERATOR ( KYC Records) */
const MOCK_KYC = Array.from({ length: 6 }, (_, i) => ({
  id: 50010 + i,
  name: i % 2 === 0 ? `User ${i + 1}` : `Merchant ${i + 1}`,
  email: `user${50010 + i}@masat.com`,
  role: i === 0 ? 'super_admin' : i % 3 === 0 ? 'coin_seller' : 'merchant',
  status: i % 5 === 0 ? 'approved' : i % 7 === 0 ? 'rejected' : 'pending',
  date: i % 5 === 0 ? '2024-05-12' : '—',
  document: i % 5 === 0 ? 'Verified' : 'No document'
}))

const PAGE_SIZE = 3 

const KYCVerification = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState('Pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab]);


  const filteredData = MOCK_KYC.filter(user => {
    if (activeTab === 'All') return true;
    return user.status.toLowerCase() === activeTab.toLowerCase();
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const currentItems = filteredData.slice(startIndex, startIndex + PAGE_SIZE)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans text-slate-700 pb-10 px-2 md:px-0">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Pending', count: 1, icon: <FileText className="text-amber-500" size={20} />, color: 'text-amber-600' },
          { label: 'Approved', count: 0, icon: <Check className="text-green-500" size={20} />, color: 'text-green-600' },
          { label: 'Rejected', count: 0, icon: <X className="text-red-500" size={20} />, color: 'text-red-600' },
          { label: 'Total', count: 6, icon: <Users className="text-blue-600" size={20} />, color: 'text-blue-700' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-card p-3 md:p-5 rounded-xl border border-gray-100 shadow-lg flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-[11px] md:text-[13px] font-medium mb-1 truncate">{stat.label}</p>
              <h3 className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.count}</h3>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg shrink-0">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* 2. FILTER & SEARCH BAR  */}
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center gap-4">
        <div className="flex bg-gray-50 p-1 rounded-lg gap-1 w-full md:w-auto overflow-x-auto no-scrollbar">
          {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`flex-1 md:flex-none px-4 md:px-5 py-2 rounded-md font-bold text-[12px] md:text-[14px] whitespace-nowrap transition-all ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search name, email..." 
            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-11 pr-4 text-[14px] outline-none focus:border-blue-400"
          />
        </div>
      </div>

      {/* 3. TABLE SECTION */}
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-gray-200 text-[11px] font-bold text-gray-600 uppercase">
                <th className="px-6 py-4">User</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4 text-center">Submitted At</th>
                <th className="px-4 py-4 text-center">Document</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/30 transition-colors text-[13px]">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[14px] text-slate-900">{user.name}</span>
                        <span className="text-[11px] text-gray-400 truncate max-w-[150px]">{user.email}</span>
                        <span className="text-[11px] text-gray-400 font-medium">ID: {user.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                       <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 w-fit uppercase">
                          <User size={10} />
                          {user.role}
                       </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                       <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                         user.status === 'approved' ? 'bg-green-100 text-green-700' : 
                         user.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                       }`}>
                         {user.status}
                       </span>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-400">{user.date}</td>
                    <td className="px-4 py-4 text-center text-gray-400">{user.document}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-slate-600 border border-gray-100 rounded-md"><Shield size={16}/></button>
                        <button className="bg-[#10b981] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1"><Check size={14} strokeWidth={3}/></button>
                        <button className="bg-[#ef4444] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1"><X size={14} strokeWidth={3}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-20 text-center text-gray-400 ">No records match the filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        <div className="px-4 md:px-6 py-4 bg-white border-t border-gray-50 flex justify-between items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="flex items-center gap-1 px-3 md:px-4 py-1.5 border border-gray-200 rounded text-[12px] font-bold text-gray-400 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft size={14} /> <span className="hidden sm:inline">Previous</span>
          </button>
          
          <span className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase whitespace-nowrap">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="flex items-center gap-1 px-3 md:px-4 py-1.5 border border-gray-200 rounded text-[12px] font-bold text-slate-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <span className="hidden sm:inline">Next</span> <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default KYCVerification
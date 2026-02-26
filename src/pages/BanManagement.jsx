import React, { useState, useEffect } from 'react';
import { Ban, Search, Plus, X } from 'lucide-react';

const BanManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
   
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 600);
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
    <div className="space-y-6 font-sans p-4 md:p-0">
      {/* 1. TOP STATS CARDS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-lg flex-1 sm:min-w-[140px] text-center lg:text-left">
            <p className="text-gray-600 text-[12px] font-normal">Active bans</p>
            <h3 className="text-2xl font-black text-red-500 mt-1">0</h3>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-lg flex-1 sm:min-w-[140px] text-center lg:text-left">
            <p className="text-gray-600 text-[12px] font-normal">Total records</p>
            <h3 className="text-2xl font-black text-blue-700 mt-1">0</h3>
          </div>
        </div>
        
        <div className="sm:ml-auto flex items-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl  flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
          >
            <Plus size={20} strokeWidth={3} /> Create ban
          </button>
        </div>
      </div>

      {/* 2. FILTER BAR */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-lg flex flex-col md:flex-row items-center gap-3">
        <div className="flex gap-2 w-full md:w-auto">
          <select className="flex-1 md:w-auto bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none">
            <option>All status</option>
            <option>Active</option>
          </select>
          <select className="flex-1 md:w-auto bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none">
            <option>All types</option>
          </select>
        </div>
        
        <div className="w-full md:flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500" size={18} />
          <input 
            type="text" 
            placeholder="Search userId..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-12 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* 3. DATA TABLE */}
      <div className="bg-white rounded-[24px] border border-gray-150 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50/50 border-b border-gray-200">
            <tr className="text-[11px] font-bold text-slate-600 uppercase">
              <th className="px-8 py-5 text-left">User ID</th>
              <th className="px-6 py-5 text-center">Type</th>
              <th className="px-6 py-5 text-center">Reason</th>
              <th className="px-6 py-5 text-center">Status</th>
              <th className="px-6 py-5 text-center">Start</th>
              <th className="px-6 py-5 text-center">Proof</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="py-20 text-center text-gray-400 text-[14px]">No ban records</td>
            </tr>
          </tbody>
        </table>
      </div>
{/* --- MODAL (Responsive & Fixed) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          {/* Background Overlay click to close */}
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          
          <div className="bg-white w-full max-w-[480px] rounded-[24px] shadow-2xl flex flex-col relative max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 md:p-8 pb-4 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Ban size={24} className="text-blue-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Create ban record</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Scrollable Area */}
            <div className="px-6 md:px-8 pb-6 overflow-y-auto">
              <p className="text-[13px] text-blue-600 font-medium mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 leading-relaxed">
                Task 93: User ban. Use banType "device" or "ip" and notes for device/IP until schema extends.
              </p>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-normal text-slate-700 ml-1">User ID *</label>
                  <input type="text" placeholder="Target user ID" className="w-full border border-gray-200 rounded-xl p-3.5 bg-gray-50/30 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-normal text-slate-700 ml-1">Ban type</label>
                  <select className="w-full border border-gray-200 rounded-xl p-3.5 bg-gray-50/30 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none">
                    <option>User</option>
                    <option>Device</option>
                    <option>IP</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-normal text-slate-700 ml-1">Reason *</label>
                  <textarea placeholder="Reason for ban" className="w-full border border-gray-200 rounded-xl p-3.5 bg-gray-50/30 outline-none h-24 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"></textarea>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-normal text-slate-700 ml-1">Notes</label>
                  <input type="text" placeholder="Optional identifier" className="w-full border border-gray-200 rounded-xl p-3.5 bg-gray-50/30 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
              </div>
            </div>

            {/* Modal Footer - Fixed at bottom */}
            <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-100 flex gap-3 sticky bottom-0">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="flex-1 py-3.5 font-bold border border-gray-200 rounded-xl text-slate-600 bg-white hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 py-3.5 font-bold bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
                Create ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BanManagement;
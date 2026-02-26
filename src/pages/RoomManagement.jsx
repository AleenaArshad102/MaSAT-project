import React, { useState, useEffect } from 'react'
import { Power, RefreshCw, Plus, X, Image as ImageIcon } from 'lucide-react'

const RoomManagement = () => {
  const [showModal, setShowModal] = useState(false);
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
    <div className="space-y-6 animate-in fade-in duration-500 px-4 md:px-0 pb-10">
      
      {/* --- HEADER SECTION (Mobile Optimized) --- */}
      <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-[20px] md:text-[24px] font-bold text-slate-800 flex items-center gap-3">
          <Power className="text-[#2563eb] shrink-0" size={28} strokeWidth={2.5} />
          <span>Room Management</span>
        </h1>

        <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none text-gray-600 font-medium hover:text-blue-600 transition-colors text-sm py-2">
            Refresh
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-[13px] md:text-[14px] hover:bg-blue-700 transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <Plus size={20} />
            <span>Add Room</span>
          </button>
        </div>
      </div>

      {/* --- TABLE HEADER (Responsive Scroll) --- */}
      <div className="bg-[#f8fafc] rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-5 px-6 py-4 border-b border-gray-200 bg-gray-50/50">
              <span className="text-[11px] font-bold text-slate-600 uppercase ">Room</span>
              <span className="text-[11px] font-bold text-slate-600 uppercase ">Details</span>
              <span className="text-[11px] font-bold text-slate-600 uppercase text-center">Status</span>
              <span className="text-[11px] font-bold text-slate-600 uppercase text-center">Performance</span>
              <span className="text-[11px] font-bold text-slate-600 uppercase text-right">Actions</span>
            </div>
            <div className="bg-white h-40 flex items-center justify-center p-6 text-center">
                <p className="text-gray-400 text-sm">No rooms available. Click "Add Room" to create one.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL (Responsive Grid & Height) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <h2 className="text-[18px] font-bold text-slate-800">Create New Room</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Responsive Grid) */}
            <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
              
              {/* Room Title */}
              <div>
                <label className="block text-[13px] text-slate-700 mb-1.5">Room Title</label>
                <input type="text" placeholder="Enter room title" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>

              {/* Topic & Mic Count (Stack on Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] text-slate-700 mb-1.5">Topic</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-[13px] text-slate-700 mb-1.5">Mic Count</label>
                  <input type="number" defaultValue="0" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none" />
                </div>
              </div>

              {/* Greeting Message */}
              <div>
                <label className="block text-[13px] text-slate-700 mb-1.5">Greeting Message</label>
                <textarea rows="3" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none resize-none"></textarea>
              </div>

              {/* Room Avatar & Theme (Stack on Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] text-slate-700 block mb-1.5">Room Avatar</label>
                  <input type="text" placeholder="URL or ID" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="text-[13px] text-slate-700 block mb-1.5">Room Theme (BG)</label>
                  <input type="text" placeholder="URL or ID" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none" />
                </div>
              </div>

              {/* Icons Selection (Stack on Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] text-slate-700 block mb-1.5">Left Icon</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="text-[13px] text-slate-700 block mb-1.5">Right Icon</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none" />
                </div>
              </div>

              {/* Restricted Countries */}
              <div>
                <label className="block text-[13px] text-slate-700 mb-1.5">Restricted Countries (ISO Codes, e.g. PK, IN, SA)</label>
                <input type="text" placeholder="Separate by comma" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none" />
              </div>
            </div>

            {/* Modal Footer (Sticky) */}
            <div className="p-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-3 bg-gray-50/50 shrink-0">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-white border border-transparent hover:border-gray-200 transition-all text-sm"
              >
                Cancel
              </button>
              <button className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all text-sm">
                Save Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomManagement
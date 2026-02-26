import React, { useState, useEffect } from 'react'
import { Coins, Plus, X, RefreshCw } from 'lucide-react'

const CoinPackages = () => {
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
    <div className="space-y-6 animate-in fade-in duration-500 text-[#334155] px-4 md:px-0 pb-10">
      
      {/* --- HEADER SECTION (Mobile Responsive) --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div className="flex items-center gap-3">
          <Coins className="text-[#2563eb] shrink-0" size={28} strokeWidth={2.5} />
          <h1 className="text-[20px] md:text-[24px] font-bold text-slate-800 leading-tight">
            Coin Package Management
          </h1>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2563eb] text-white px-5 py-2.5 rounded-lg font-bold text-[14px] hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          <Plus size={20} />
          <span>Add Package</span>
        </button>
      </div>

      {/* --- TABLE SECTION (Responsive Scroll) --- */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase ">Product ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Display Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Coins</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Price</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Platform</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase  text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase  text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="px-6 py-20 text-center">
                  <p className="text-gray-400 text-[14px]  font-normal">
                    No coin packages found. Click "Add Package" to create one.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CREATE COIN PACKAGE MODAL (Responsive Width & Height) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-6">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <h2 className="text-[18px] md:text-[20px] font-bold text-slate-800">Create Coin Package</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Modal Body (Scrollable with fixed footer) */}
            <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
              
              {/* Product ID */}
              <div>
                <label className="block text-[13px]  text-slate-700 mb-1">
                  Product ID <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="e.g., coins_100" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10" />
                <p className="text-[11px] text-gray-500 mt-1">Must match Google Play product ID</p>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-[13px]  text-slate-700 mb-1">
                  Display Name <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="e.g., 100 Coins" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10" />
              </div>

              {/* Coins Amount */}
              <div>
                <label className="block text-[13px]  text-slate-700 mb-1">
                  Coins <span className="text-red-500">*</span>
                </label>
                <input type="number" defaultValue="100" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
              </div>

              {/* Price */}
              <div>
                <label className="block text-[13px]  text-slate-700 mb-1">
                  Price (USD)
                </label>
                <input type="text" placeholder="0.99" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px]  text-slate-700 mb-1">
                  Description
                </label>
                <textarea rows="3" placeholder="Package description" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-none"></textarea>
              </div>

              {/* Platform Dropdown */}
              <div>
                <label className="block text-[13px]  text-slate-700 mb-1">
                  Platform
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white">
                  <option>Android</option>
                  <option>iOS</option>
                  <option>Web</option>
                </select>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-[13px]  text-slate-700 mb-1">
                  Display Order
                </label>
                <input type="number" defaultValue="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
              </div>

              {/* Checkboxes (Popular & Active) */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-[13px] font-medium text-slate-700 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  Mark as Popular
                </label>
                <label className="flex items-center gap-2 text-[13px] font-medium text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  Active
                </label>
              </div>
            </div>

            {/* Modal Footer (Sticky) */}
            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50/50">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg font-bold text-slate-600 hover:bg-gray-50 border border-gray-200 transition-all text-sm"
              >
                Cancel
              </button>
              <button className="px-8 py-2 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all text-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CoinPackages
import React, { useState, useEffect } from 'react'
import { Landmark, Plus, X } from 'lucide-react'

const BankManagement = () => {
  const [showForm, setShowForm] = useState(false);
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
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:items-center">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-bold text-slate-800 flex items-center gap-3">
            <Landmark size={28} className="text-blue-600 shrink-0" />
            Bank Management
          </h1>
          <p className="text-gray-400 text-[13px] md:text-[14px] mt-1">
            Configure bank details for manual top-ups
          </p>
        </div>

        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2563eb] text-white px-5 py-2.5 rounded-xl font-bold text-[14px] hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            <Plus size={20} />
            <span>Add New Bank</span>
          </button>
        )}
      </div>

      {/* --- CONTENT AREA --- */}
      {!showForm ? (
        /* Image 1: No Bank Details View */
        <div className="bg-white rounded-[32px] border-2 border-dashed border-gray-100 min-h-[300px] flex flex-col items-center justify-center p-6 md:p-10 text-center">
          <Landmark size={50} className="text-gray-300 mb-4" />
          <p className="text-gray-400 text-[14px] font-normal">
            No bank details added yet.
          </p>
        </div>
      ) : (
        
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-6 md:p-8 space-y-8">
            <h2 className="text-[20px] font-bold text-slate-800">Add New Bank</h2>
            
            <div className="space-y-6">
              {/* Active Toggle */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="active" 
                  defaultChecked 
                  className="w-3 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500 cursor-pointer" 
                />
                <label htmlFor="active" className="text-[12px] font-bold text-slate-500 uppercase cursor-pointer">
                  ACTIVE FOR PAYOUTS
                </label>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Bank Name */}
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-500 uppercase ">BANK NAME</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Meezan Bank" 
                    className="w-full bg-[#f8fafc] border-none rounded-xl py-3.5 px-5 text-[15px] outline-none focus:ring-2 focus:ring-blue-500/10 placeholder:text-gray-300"
                  />
                </div>

                {/* Account Name */}
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-500 uppercase ">ACCOUNT NAME</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MaSAT Official" 
                    className="w-full bg-[#f8fafc] border-none rounded-xl py-3.5 px-5 text-[15px] outline-none focus:ring-2 focus:ring-blue-500/10 placeholder:text-gray-300"
                  />
                </div>

                {/* Account Number */}
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-500 uppercase ">ACCOUNT NUMBER / IBAN</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#f8fafc] border-none rounded-xl py-3.5 px-5 text-[15px] outline-none focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* Branch Code */}
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-500 uppercase ">BRANCH CODE</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#f8fafc] border-none rounded-xl py-3.5 px-5 text-[15px] outline-none focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <label className="block text-[12px] font-bold text-slate-500 uppercase ">INSTRUCTIONS (OPTIONAL)</label>
                <textarea 
                  rows="3" 
                  placeholder="e.g. Please mention your ID in remarks" 
                  className="w-full bg-[#f8fafc] border-none rounded-xl py-4 px-5 text-[15px] outline-none focus:ring-2 focus:ring-blue-500/10 resize-none placeholder:text-gray-300"
                ></textarea>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-4 sm:gap-6 pt-4">
              <button 
                onClick={() => setShowForm(false)}
                className="w-full sm:w-auto text-[15px] font-bold text-gray-400 hover:text-gray-600 transition-colors py-2"
              >
                Cancel
              </button>
              <button className="w-full sm:w-auto bg-[#2563eb] text-white px-8 py-3 rounded-2xl font-bold text-[15px] shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
                Save Bank Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BankManagement
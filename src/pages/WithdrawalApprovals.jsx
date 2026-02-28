import React, { useState, useEffect } from 'react'
import { Banknote } from 'lucide-react'

const WithdrawalApprovals = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Pending');

  useEffect(() => {
    
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabs = ['Pending', 'Approved', 'Rejected'];

  
  const getEmptyMessage = () => {
    if (activeTab === 'Pending') return "No pending withdrawal requests.";
    if (activeTab === 'Approved') return "No approved withdrawal requests.";
    if (activeTab === 'Rejected') return "No rejected withdrawal requests.";
    return "";
  };

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
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-start gap-3">
          <Banknote className="text-blue-600 mt-1 shrink-0" size={26} strokeWidth={2.5} />
          <div>
            <h1 className="text-[22px] md:text-[26px] font-bold text-slate-800 leading-tight">Withdrawal Approvals</h1>
            <p className="text-gray-400 text-[13px] md:text-[14px] mt-1 max-w-sm md:max-w-none">
              Approve or reject user payout requests (3% fee on approval)
            </p>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="flex bg-gray-50 p-1 rounded-xl gap-1 w-full md:w-auto overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-4 md:px-5 py-2 rounded-lg font-bold text-[13px] md:text-[14px] transition-all whitespace-nowrap ${
                activeTab === tab 
                ? 'bg-[#2563eb] text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-[24px] border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-[20%] px-8 py-5 text-[11px] font-bold text-gray-600 uppercase ">User</th>
                <th className="w-[20%] px-4 py-5 text-[11px] font-bold text-gray-600 uppercase ">Amount (USD)</th>
                <th className="w-[25%] px-4 py-5 text-[11px] font-bold text-gray-600 uppercase  text-center">Bank</th>
                <th className="w-[20%] px-4 py-5 text-[11px] font-bold text-gray-600 uppercase  text-center">Requested</th>
                <th className="w-[15%] px-8 py-5 text-[11px] font-bold text-gray-600 uppercase  text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              
              <tr className="border-t border-gray-50/50">
                <td colSpan="5" className="py-24 text-center">
                   <p className="text-[15px] md:text-[16px] font-normal text-gray-400 ">
                     {getEmptyMessage()}
                   </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default WithdrawalApprovals
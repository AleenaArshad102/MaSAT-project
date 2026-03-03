import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, Coins, Banknote, Landmark, CheckCircle2, 
  BarChart3, DollarSign, FileCheck, Download, Filter, ChevronDown
} from 'lucide-react';

const Finance = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState('All Transaction Types');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const financeCards = [
    { name: 'Recharge Activity', desc: 'Events & leaderboard', path: '/recharge-activity', icon: <Wallet className="text-amber-500" />, bg: 'bg-amber-50' },
    { name: 'Coin Packages', desc: 'IAP & pricing', path: '/coin-packages', icon: <Coins className="text-yellow-600" />, bg: 'bg-yellow-50' },
    { name: 'Salary Management', desc: 'Payouts & audit', path: '/salary-management', icon: <Banknote className="text-blue-500" />, bg: 'bg-blue-50' },
    { name: 'Bank Management', desc: 'Payout details', path: '/bank-management', icon: <Landmark className="text-orange-600" />, bg: 'bg-orange-50' },
    { name: 'Top-up Approvals', desc: 'Recharge requests', path: '/topup-approvals', icon: <CheckCircle2 className="text-green-500" />, bg: 'bg-green-50' },
    { name: 'Withdrawal Approvals', desc: 'Payout requests', path: '/withdrawal-approvals', icon: <Banknote className="text-purple-500" />, bg: 'bg-purple-50' },
    { name: 'Analytics', desc: 'Users & revenue', path: '/analytics', icon: <BarChart3 className="text-indigo-500" />, bg: 'bg-indigo-50' },
    { name: 'Agency Revenue', desc: 'Per-agency detail', path: '/agency-revenue', icon: <DollarSign className="text-red-500" />, bg: 'bg-red-50' },
    { name: 'KYC Verification', desc: 'Merchant / Coin Seller', path: '/kyc-verification', icon: <FileCheck className="text-emerald-500" />, bg: 'bg-emerald-50' },
  ];

  const transactionOptions = [
    'All Transaction Types',
    'Gift Sent',
    'Gift Received',
    'Recharge (Top-up)',
    'Host Salary',
    'Store Purchase',
    'Withdrawal'
  ];

  // Dummy Data Logic
  const allData = [
    { id: '#9496CFE4', type: 'ADMIN ADD_COINS', desc: 'Admin manual addition...', from: '50010', to: '50010', coins: '10,000', value: '$0.00', date: 'Feb 21, 2026', time: '00:54:14' },
    { id: '#C8167A98', type: 'ADMIN DEDUCT_COINS', desc: 'Admin deduction...', from: '50010', to: '50010', coins: '500', value: '$0.00', date: 'Feb 21, 2026', time: '01:13:20' },
    { id: '#426660C5', type: 'ADMIN ADD_COINS', desc: 'Admin manual addition...', from: '50010', to: '50010', coins: '5,000', value: '$0.00', date: 'Feb 21, 2026', time: '02:09:29' },
    { id: '#3CD258ED', type: 'ADMIN DEDUCT_COINS', desc: 'Admin deduction...', from: '50010', to: '50010', coins: '5,000', value: '$0.00', date: 'Feb 21, 2026', time: '02:09:44' },
  ];

  
  const displayData = selectedType === 'All Transaction Types' ? allData : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500 px-2 md:px-0">
      
      {/* 1. FINANCE OVERVIEW CARD */}
     <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800">Finance Overview</h2>
          <p className="text-sm text-gray-400 mt-1">High-level access to money flows and reports.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {financeCards.map((card, idx) => (
            <button
              key={idx}
              onClick={() => navigate(card.path)}
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:shadow-md transition-all group text-center space-y-3"
            >
              <div className={`${card.bg} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-700 leading-tight">{card.name}</p>
                <p className="text-[10px] text-gray-400 mt-1">{card.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* 2. FINANCIAL LEDGER HEADER */}
      <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Financial Ledger</h2>
          <p className="text-sm text-gray-400">Track all coin transfers and platform economy</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg">
          <Download size={18} /> Export Data
        </button>
      </div>

      {/* 3. FILTER CARD WITH DROPDOWN */}
      <div className="bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm flex justify-between items-center relative z-50">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-[14px] font-bold text-slate-700 hover:bg-gray-50 transition-all min-w-[220px] justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-50 rounded-md"><Filter size={16} className="text-blue-600" /></div>
              {selectedType}
            </div>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          
          {showDropdown && (
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden py-1 animate-in zoom-in-95 duration-100">
              {transactionOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedType(option);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600 ${selectedType === option ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : 'text-slate-600'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-right px-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase ">Total Items</p>
          <p className="text-lg font-black text-slate-800 leading-none">{displayData.length}</p>
        </div>
      </div>

      {/* 4. TABLE CARD */}
      <div className="bg-white rounded-[24px] border border-gray-150 shadow-sm overflow-hidden min-h-[300px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="text-[11px] font-bold text-gray-600 uppercase  bg-gray-150">
                <th className="px-8 py-5">Transaction ID</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Involved Parties</th>
                <th className="px-6 py-5">Coins</th>
                <th className="px-6 py-5">USD Value</th>
                <th className="px-8 py-5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {displayData.length > 0 ? (
                displayData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-6 text-blue-600 font-normal hover:underline cursor-pointer">{item.id}</td>
                    <td className="px-6 py-6 font-normal text-slate-800 uppercase text-[13px]">{item.type}</td>
                    <td className="px-6 py-6 text-[11px] font-medium text-slate-500">
                      <div className="flex flex-col gap-1">
                        <div><span className="text-gray-400 uppercase text-[9px] mr-2">From:</span>{item.from}</div>
                        <div><span className="text-gray-400 uppercase text-[9px] mr-2">To:</span>{item.to}</div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <Coins size={14} className="text-yellow-600" />
                        <span className="text-base font-bold text-slate-800">{item.coins}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-bold text-slate-800 text-sm ">{item.value}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col text-[13px]  text-slate-600">
                        {item.date} <span className="text-[11px] text-gray-400">{item.time}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-32 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <p className=" text-sm">No financial activity recorded in this category.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
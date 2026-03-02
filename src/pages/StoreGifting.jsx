import React, { useState , useEffect} from 'react';
import { 
  Gift, Store, Grid, List, Plus, Search, 
  Image as ImageIcon, X, Save, RotateCcw, Upload, Package, Box, Clock
} from 'lucide-react';

const StoreGifting = () => {
    const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Gifts'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isFreeGift, setIsFreeGift] = useState(false);
  const [validity, setValidity] = useState('7D');


  // Styling helper for Input Labels
  const labelClass = "text-[13px] font-medium text-slate-600 block mb-1.5";
  // Styling helper for Input Fields
  const inputClass = "w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-sm text-gray-600 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all";

  const tabs = [
    { name: 'Gifts', icon: Gift },
    { name: 'Store Items', icon: Store },
    { name: 'Gift Cats', icon: Grid },
    { name: 'Item Types', icon: List }
  ];

  const validityOptions = ['1D', '7D', '15D', '30D', '∞'];
  
  useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
        </div>
      );
    }
  

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      
      {/* --- TOP COMPONENT (Tabs & Add New) --- */}
      <section className="bg-white p-3 rounded-[12px] border border-gray-150 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.name 
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:opacity-90 transition-all"
        >
          <Plus size={20} /> Add New
        </button>
      </section>

      {/* --- FILTER COMPONENT (Updated based on tab) --- */}
      <section className="bg-white p-4 rounded-[12px] border border-gray-150 shadow-sm flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input type="text" placeholder={`Search ${activeTab.toLowerCase()}...`} className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-120 rounded-xl outline-none text-sm" />
        </div>
        
        {/* Conditional Dropdown Options */}
        {(activeTab === 'Store Items' || activeTab === 'Gifts') && (
          <select className="p-2.5 bg-white border border-gray-120 rounded-xl text-sm outline-none min-w-[160px] font-normal text-slate-800">
            {activeTab === 'Store Items' && (
              <>
                <option>All Types</option>
                <option>Frames</option>
                <option>Vehicles</option>
                <option>Chat Bubbles</option>
                <option>Room Lock</option>
                <option>Themes</option>
                <option>Relationships</option>
              </>
            )}
            {activeTab === 'Gifts' && (
              <>
                <option>All Categories</option>
                <option>General</option>
                <option>CP</option>
                <option>Lucky</option>
                <option>Activity</option>
                <option>National</option>
                <option>Exclusive</option>
              </>
            )}
          </select>
        )}

        {(activeTab === 'Store Items' || activeTab === 'Gifts') && (
          <select className="p-2.5 bg-white border border-gray-120 rounded-xl text-sm outline-none min-w-[160px] font-normal text-slate-800">
            <option>All (Free & Paid)</option>
            <option>Free Only</option>
            <option>Paid Only</option>
          </select>
        )}
        
        <button className="flex items-center gap-2 px-4 py-2.5 text-slate-800 hover:text-red-500 font-norma text-sm">
          <RotateCcw size={16} /> Clear Filters
        </button>
      </section>

      {/* --- DYNAMIC MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white flex-shrink-0">
              <h2 className="text-xl font-bold text-slate-950">
                {activeTab === 'Store Items' && 'Create items'}
                {activeTab === 'Gifts' && 'Create gifts'}
                {activeTab === 'Gift Cats' && 'Create gift Category'}
                {activeTab === 'Item Types' && 'Create item Type'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body - Fixed height for scrolling */}
            <div className="p-8 space-y-8 overflow-y-auto flex-grow">
              
              {/* Row 1: Name and Display Order (Cats & Types Specific) */}
              {(activeTab === 'Gift Cats' || activeTab === 'Item Types') ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Name / Title</label>
                    <input type="text" placeholder="Enter display name" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Dislay Order</label>
                    <input type="number" placeholder="0" className={inputClass} />
                  </div>
                </div>
              ) : (
                /* Name & Cost Row for Gifts/Items */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Name / Title</label>
                    <input type="text" placeholder="Enter display name" className={inputClass} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className={`${labelClass} mb-0`}>Cost Strategy</label>
                      <div className="flex items-center gap-2">
                          <input type="checkbox" id="free-gift" checked={isFreeGift} onChange={(e) => setIsFreeGift(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
                          <label htmlFor="free-gift" className="text-xs font-bold text-slate-600">Is Free Gift?</label>
                      </div>
                    </div>
                    <input type="number" placeholder="Enter price" disabled={isFreeGift} className={`${inputClass} ${isFreeGift ? 'bg-gray-100 cursor-not-allowed' : ''}`} />
                  </div>
                </div>
              )}

              {/* Conditional Row: Description for Item Types */}
              {activeTab === 'Item Types' && (
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea placeholder="Enter description" className={`${inputClass} h-24 resize-none`} />
                </div>
              )}

              {/* 2nd Row: Category / Item Type based on tab */}
              {(activeTab === 'Store Items' || activeTab === 'Gifts') && (
                <div>
                  <label className={labelClass}>{activeTab === 'Store Items' ? 'Item Type' : 'Category'}</label>
                  <select className={`${inputClass} font-normal`}>
                    <option>Select a category</option>
                    {activeTab === 'Store Items' ? (
                      <>
              <option>Frames</option>
              <option>Vehicles</option>
              <option>Chat Bubbles</option>
            <option>Room Lock</option>
                <option>Themes</option>
                <option>Relationships</option></>
                    ) : (
                      <>
                        <option>General</option>
                        <option>CP</option>
                        <option>Lucky</option>
                        <option>Activity</option>
                        <option>National</option>
                        <option>Exclusive</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              {/* Conditional Row: Validity Duration for Store Items */}
              {activeTab === 'Store Items' && (
                <div>
                  <label className={labelClass}>Validity Duration</label>
                  <div className="flex flex-wrap gap-2">
                    {validityOptions.map(option => (
                      <button 
                        key={option} 
                        onClick={() => setValidity(option)}
                        className={`px-12 py-3 rounded-xl text-sm font-bold transition-all ${
                          validity === option 
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Impact & Rewards - Visible for Gifts/Items */}
              {(activeTab === 'Store Items' || activeTab === 'Gifts') && (
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-150">
                  <label className="text-[13px] font-medium text-gray-600 block mb-5">Impact & Rewards</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { label: 'WEALTH', color: 'text-blue-600' },
                      { label: 'CHARM', color: 'text-pink-500' },
                      { label: 'ROOM EXP', color: 'text-green-500' }
                    ].map(item => (
                      <div key={item.label} className="space-y-1.5">
                        <label className={`text-[11px] font-bold ${item.color} `}>{item.label}</label>
                        <input type="number" placeholder="0" className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none text-base font-medium" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4th Row: Media Assets */}
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-150">
                <label className="text-[13px] font-medium text-gray-600 block mb-5">Media Assets</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Icon/Preview */}
                  <div className="space-y-3">
                    <div className='flex justify-between items-center'>
                      <label className="text-[12px] font-medium text-gray-400 ">Icon / Preview</label>
                      <button className='px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-blue-600 bg-white'>Change</button>
                    </div>
                    <div className="w-full h-40 flex items-center justify-center bg-white border-2 border-dashed border-gray-200 rounded-3xl">
                      <ImageIcon size={48} className="text-gray-300" strokeWidth={1}/>
                    </div>
                  </div>
                  {/* Animation/Asset - Hidden for Gift Cats & Item Types */}
                  {(activeTab !== 'Gift Cats' && activeTab !== 'Item Types') && (
                    <div className="space-y-3">
                      <div className='flex justify-between items-center'>
                        <label className="text-[12px] font-medium text-gray-400 ">Animation / Asset</label>
                        <button className='px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-blue-600 bg-white'>Change</button>
                      </div>
                      <div className="w-full h-40 flex items-center justify-center bg-white border-2 border-dashed border-gray-200 rounded-3xl">
                        <Box size={48} className="text-gray-300" strokeWidth={1}/>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 5th Row: Status (Toggle Switch) */}
              <div className="p-6 bg-gray-50 rounded-3xl flex items-center gap-5">
                <button 
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${isActive ? 'translate-x-8' : 'translate-x-1'}`} />
                </button>
                <span className={`text-base font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                  Status: {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-white grid grid-cols-2 gap-4 border-t border-gray-100 flex-shrink-0">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 text-md font-medium text-slate-500 hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-md font-medium shadow-sm hover:opacity-90 active:scale-95 transition-all">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreGifting;
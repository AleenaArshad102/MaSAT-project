import React, { useState, useEffect} from 'react'
import { 
  RotateCcw, RotateCw,  Trophy, Crown, Heart, Home, 
  Building2, Upload, Cloud, ChevronLeft, ChevronRight, RefreshCw, Medal
} from 'lucide-react'
import { useNavigate } from 'react-router-dom';

/* ---------------- MOCK DATA GENERATOR (125 Levels) ---------------- */
const MOCK_LEVELS = Array.from({ length: 125 }, (_, i) => ({
  level: `Lv.${i}`,
  wealthBadge: null,
  wealthThreshold: i === 0 ? 0 : i * 500000,
  charmBadge: null,
  charmThreshold: i === 0 ? 0 : i * 500000,
}))

const PAGE_SIZE = 25

const RankingManagement = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const totalPages = Math.ceil(MOCK_LEVELS.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const currentLevels = MOCK_LEVELS.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <div className="space-y-4 pb-10 text-[#334155] px-2 md:px-0">
      
      {/* 1. TOP HEADER - Responsive Stack */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="text-[#9333ea] shrink-0" size={20} />
          <h1 className="text-[18px] md:text-[22px] font-bold text-slate-800 leading-tight">
            Ranking Management <span className="text-gray-400 text-[10px] md:text-[12px] font-normal block sm:inline">(Levels 0-100)</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#9333ea] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] hover:bg-purple-700 transition-all shadow-md active:scale-95"
        >
          <RefreshCw size={16} />
          Generate Defaults
        </button>
      </div>

      {/* 2. TRIBE SECTION - Responsive Button */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="text-[#f59e0b] shrink-0" size={20} />
            <h2 className="text-[15px] md:text-[16px] font-bold text-slate-800">Tribe Ranking</h2>
          </div>
          <button 
            onClick={() => navigate('/tribes')} 
            className="flex items-center justify-center gap-2 bg-[#f59e0b] text-white px-3 py-2 rounded-md font-bold text-[12px] hover:bg-orange-600 transition-all active:scale-95 w-full sm:w-auto"
          >
            <Medal size={16} /> 
            <span>View Tribes & Levels</span>
          </button>
        </div>
        <p className="text-gray-500 text-[13px] leading-relaxed">
          Configure tribe levels and view tribes. Daily/Weekly/Monthly tribe rankings are available in the Tribe Management page.
        </p>
      </div>

      {/* 3. WCR RANKINGS - Grid 1 col on mobile, 3 on desktop */}
      <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Crown className="text-[#f59e0b] shrink-0" size={20} />
            <h2 className="text-[15px] md:text-[16px] font-bold text-slate-800">WCR Rankings</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="flex-1 min-w-[100px] px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] bg-white outline-none">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <input type="text" placeholder="Country" className="flex-1 min-w-[100px] px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] outline-none" />
            <button className="w-full sm:w-auto bg-[#f59e0b] text-white px-4 py-1.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-1">
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Wealth', 'Charm', 'Room'].map((type, i) => (
            <div key={type} className={`border rounded-xl overflow-hidden ${i===0 ? 'border-blue-100' : i===1 ? 'border-pink-100' : 'border-emerald-100'}`}>
              <div className={`p-2.5 flex items-center gap-2 border-b ${i===0 ? 'bg-blue-50 border-blue-100' : i===1 ? 'bg-pink-50 border-pink-100' : 'bg-emerald-50 border-emerald-100'}`}>
                {i===0 ? <Crown size={14} className="text-blue-600"/> : i===1 ? <Heart size={14} className="text-pink-600"/> : <Home size={14} className="text-emerald-600"/>}
                <span className={`text-[12px] md:text-[13px] font-bold ${i===0 ? 'text-blue-700' : i===1 ? 'text-pink-700' : 'text-emerald-700'}`}>{type} (Top 15)</span>
              </div>
              <div className="py-8 text-center text-gray-400 text-[12px]">No data</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TOP AGENCY SECTION */}
      <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="text-[#7c3aed] shrink-0" size={20} />
            <h2 className="text-[15px] md:text-[16px] font-bold text-slate-800 ">TOP Agency Ranking</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] bg-white outline-none"><option>Weekly</option><option>Monthly</option></select>
            <input type="text" placeholder="Country" className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] outline-none" />
            <button className="w-full sm:w-auto bg-[#7c3aed] text-white px-4 py-1.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-1"><RefreshCw size={14} /> Refresh</button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="bg-[#f3f0ff] p-3 grid grid-cols-4 text-[11px] font-bold text-[#7c3aed] px-6 border-b border-gray-200 uppercase">
                <span>#</span>
                <span>Agency</span>
                <span>Owner ID</span>
                <span className="text-right">Points</span>
              </div>
              <div className="min-h-[100px] flex items-center justify-center">
                <span className="text-gray-400 text-[12px]">No data available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. LEVELS TABLE - Safe Scroll */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Wealth Badge</th>
                <th className="px-6 py-4">Wealth Threshold</th>
                <th className="px-6 py-4 text-pink-600">Charm Badge</th>
                <th className="px-6 py-4 text-pink-600">Charm Threshold</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentLevels.map((item) => (
                <tr key={item.level} className="text-[13px] hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 font-bold text-slate-700">{item.level}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200 shrink-0"></div>
                       <div className="flex flex-col text-[10px] font-bold text-blue-500 uppercase">
                          <button className="flex items-center gap-1 hover:text-blue-700"><Upload size={10}/> Upload</button>
                          <button className="flex items-center gap-1 text-purple-500 hover:text-purple-700"><Cloud size={10}/> S3 Select</button>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1.5 w-32 bg-white focus-within:ring-2 focus-within:ring-blue-100">
                      <span className="text-[10px]">💎</span>
                      <input type="number" defaultValue={item.wealthThreshold} className="w-full text-blue-600 font-bold outline-none bg-transparent" />
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-6 bg-pink-50 rounded border border-pink-100 shrink-0"></div>
                       <div className="flex flex-col text-[10px] font-bold text-blue-500 uppercase">
                          <button className="flex items-center gap-1 hover:text-blue-700"><Upload size={10}/> Upload</button>
                          <button className="flex items-center gap-1 text-purple-500 hover:text-purple-700"><Cloud size={10}/> S3 Select</button>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1.5 w-32 bg-white focus-within:ring-2 focus-within:ring-pink-100">
                      <Heart size={12} className="text-pink-500 fill-pink-500" />
                      <input type="number" defaultValue={item.charmThreshold} className="w-full text-pink-600 font-bold outline-none bg-transparent" />
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button className="text-gray-300 hover:text-blue-600 transition-colors">
                      <RefreshCw size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION - Mobile Stackable */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 border border-gray-200 rounded text-[12px] font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          
          <span className="text-[11px] font-bold text-gray-500 uppercase order-first sm:order-none">
            Page {currentPage} of {totalPages}
          </span>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 border border-gray-200 rounded text-[12px] font-bold text-slate-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* MODAL - Fully Responsive */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[4px]" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-[24px] md:rounded-[32px] shadow-2xl w-full max-w-[400px] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#f5f0ff] rounded-full flex items-center justify-center mb-6">
                <RefreshCw size={30} className="text-[#a855f7]" />
              </div>
              <h3 className="text-[20px] md:text-[22px] font-black text-[#1e293b] leading-tight uppercase tracking-tight mb-3">
                Generate Defaults?
              </h3>
              <p className="text-slate-500 text-[14px] font-medium px-2 mb-6">
                This will overwrite levels <span className="text-[#9333ea] font-bold">0-100</span> with the default formula.
              </p>
              <div className="w-full bg-[#fff1f2] py-2.5 rounded-xl mb-8 border border-rose-100">
                <span className="text-[#f43f5e] text-[10px] font-black uppercase tracking-wider">
                  This action cannot be undone!
                </span>
              </div>
              <div className="flex w-full gap-3">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 border-2 border-slate-100 rounded-2xl text-slate-500 font-bold text-[14px] hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-[#a855f7] text-white rounded-2xl font-bold text-[14px] shadow-lg shadow-purple-200 hover:bg-[#9333ea] transition-all active:scale-95">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RankingManagement
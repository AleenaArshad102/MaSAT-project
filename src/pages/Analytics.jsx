import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Activity, Users, Shield, Star, 
  DollarSign, Mic2, Gift, FileText 
} from 'lucide-react';

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Charts Data
  const barData = [
    { name: 'AGENCY OWNER', value: 1 },
    { name: 'SUPER ADMIN', value: 1 },
    { name: 'USER', value: 1 },
  ];

  const pieData = [
    { name: 'Active Users', value: 3, color: '#3b82f6' },   
    { name: 'Banned', value: 1, color: '#ef4444' },         
    { name: 'Suspended', value: 1, color: '#f59e0b' },      
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500 px-2 md:px-0">
      
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-white p-6 md:p-10 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
             <Activity className="text-blue-600" size={32} />
             <h1 className="text-2xl md:text-4xl font-black text-slate-800  uppercase">Platform Analytics</h1>
          </div>
          <p className="text-gray-400 font-medium text-sm md:text-lg">Real-time ecosystem metrics and system intelligence</p>
        </div>
        
        <div className="bg-blue-600 text-white px-8 py-4 rounded-[20px] shadow-xl shadow-blue-200 text-center min-w-[220px]">
          <p className="text-[10px] uppercase font-bold  opacity-80 mb-1">System Health</p>
          <p className="text-xl font-bold">99.9% OPERATIONAL</p>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Network" value="3" icon={<Users size={20}/>} iconBg="bg-blue-600" />
        <StatCard label="Active Pulse" value="3" icon={<Activity size={20}/>} iconBg="bg-emerald-500" />
        <StatCard label="Restricted" value="0" icon={<Shield size={20}/>} iconBg="bg-red-500" />
        <StatCard label="Under Review" value="0" icon={<Star size={20}/>} iconBg="bg-amber-500" />
      </div>

      {/* 3. SECONDARY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Revenue" value="$0.00" subText="Sum of last 200 transactions" icon={<DollarSign size={20}/>} iconBg="bg-emerald-500" />
        <StatCard label="Rooms" value="1" subText="1 live now" icon={<Mic2 size={20}/>} iconBg="bg-purple-500" />
        <StatCard label="Gifts" value="0" subText="0 coins in sample" icon={<Gift size={20}/>} iconBg="bg-orange-500" />
      </div>

      {/* 4. CHARTS SECTION (Role vs Compliance) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Role Distribution */}
        <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-8 uppercase ">Role Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rangeen Filled Pie Chart */}
        <div className="bg-white p-6 md:p-8 rounded-[28px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-8 uppercase">System Compliance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. HIERARCHY INSIGHT TABLE */}
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-50 bg-white sticky top-0">
          <h3 className="text-lg font-black text-slate-800 uppercase">Detailed Hierarchy Insight</h3>
          <span className="text-[10px] font-bold bg-blue-50 px-3 py-1.5 rounded-full text-blue-600 uppercase ">Live View</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase  bg-gray-50">
                <th className="px-8 py-4">Hierarchy Level</th>
                <th className="px-8 py-4 text-center">Live Members</th>
                <th className="px-8 py-4">Composition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <HierarchyRow label="AGENCY OWNER" value="1" percent="33.3%" color="bg-blue-600" />
              <HierarchyRow label="SUPER ADMIN" value="1" percent="33.3%" color="bg-blue-500" />
              <HierarchyRow label="USER" value="1" percent="33.3%" color="bg-blue-400" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatCard = ({ label, value, subText, icon, iconBg }) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex justify-between items-center group hover:border-blue-100 transition-all">
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase  mb-2">{label}</p>
      <h3 className="text-3xl font-black text-slate-800">{value}</h3>
      {subText && <p className="text-[10px] text-gray-400 mt-1">{subText}</p>}
    </div>
    <div className={`${iconBg} p-4 rounded-2xl text-white shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
  </div>
);

const HierarchyRow = ({ label, value, percent, color }) => (
  <tr className="group hover:bg-gray-50/50 transition-colors">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-slate-50 text-blue-600 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600">
          <Shield size={16} />
        </div>
        <span className="text-sm font-black text-slate-700  uppercase">{label}</span>
      </div>
    </td>
    <td className="px-8 py-6 text-center font-black text-slate-800">{value}</td>
    <td className="px-8 py-6">
      <div className="flex items-center gap-4 min-w-[150px]">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full`} style={{ width: percent }}></div>
        </div>
        <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-600">{percent}</span>
      </div>
    </td>
  </tr>
);

export default Analytics;
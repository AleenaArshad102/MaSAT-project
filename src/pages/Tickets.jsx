import React, { useState, useEffect } from 'react';
import { Ticket, FileText } from 'lucide-react';

const Tickets = () => {
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
    <div className="space-y-6 px-2 md:px-0 pb-10 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-slate-700" size={24} strokeWidth={2.5} />
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 ">
          Tickets / Reports
        </h1>
      </div>

      {/* Empty State Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm min-h-[300px] flex items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Subtle Icon Background */}
          <div className="mb-4 p-4 bg-gray-80 rounded-full">
            <Ticket size={40} className="text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm md:text-base font-normal">
            No tickets yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
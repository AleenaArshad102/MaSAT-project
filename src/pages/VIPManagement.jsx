import React, { useState , useEffect} from 'react';
import { Crown, Save, Image as ImageIcon, Plus, Trash2, RotateCcw, X } from 'lucide-react';

const VIPManagement = () => {
    const [loading, setLoading] = useState(true);

  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false);
  const [isSVIPModalOpen, setIsSVIPModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  
const [catalogPrivileges, setCatalogPrivileges] = useState([
  { id: 1, key: 'rank_invisible', level: '2', title: 'Rank Invisible', description: 'You can activate stealth mode.' }
]);

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


const addPrivilege = () => {
  const newRow = { id: Date.now(), key: '', level: '1', title: '', description: '' };
  setCatalogPrivileges([...catalogPrivileges, newRow]);
};

const removePrivilege = (id) => {
  setCatalogPrivileges(catalogPrivileges.filter(p => p.id !== id));
};

  return (
    <div className="space-y-8">
      {/* 1. VIP Levels (1-8) Table Section */}
<section className="bg-white p-4 md:p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-4">
  <div className="flex items-center gap-2 text-primary-blue font-bold text-lg">
    <Crown size={22} className="text-orange-500" /> <h2>VIP Levels (1–8)</h2>
  </div>
  <p className="text-sm text-gray-500">Coins, duration, theme/badge, full-screen background and center media, plus Exclusive Props & Privileges per level. Use Config to edit privileges section color and lists..</p>

  <div className="overflow-x-auto -mx-4 px-4">
    <table className="w-full text-left text-sm min-w-[900px]"> 
      <thead>
        <tr className="text-slate-600 border-b border-gray-50">
          <th className="py-3 font-semibold">Level</th>
          <th className="py-3 font-semibold">Coins</th>
          <th className="py-3 font-semibold">Duration</th>
          <th className="py-3 font-semibold">Theme</th>
          <th className="py-3 font-semibold">Badge</th>
          <th className="py-3 font-semibold">Background</th>
          <th className="py-3 font-semibold">Center</th>
          <th className="py-3 font-semibold">Config</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((lvl) => (
          <tr key={lvl} className="group hover:bg-gray-50/50 transition-colors">
            <td className="py-4 font-bold text-slate-700">{lvl}</td>
            <td className="py-4">
              <input 
                type="number" 
                placeholder="0" 
                className="w-28 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary-blue transition-all" 
              />
            </td>
            <td className="py-4">
              <input 
                type="number" 
                placeholder="0" 
                className="w-20 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary-blue transition-all" 
              />
            </td>
            <td className="py-4">
              <button className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:text-blue-700">
                <ImageIcon size={14}/> Select
              </button>
            </td>
            <td className="py-4">
              <button className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:text-blue-700">
                <ImageIcon size={14}/> Select
              </button>
            </td>
            <td className="py-4">
              <button className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:text-blue-700">
                <ImageIcon size={14}/> Select
              </button>
            </td>
            <td className="py-4">
              <button className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:text-blue-700">
                <ImageIcon size={14}/> Select
              </button>
            </td>
            <td className="py-4">
              <button 
                onClick={() => {setSelectedLevel(lvl); setIsVIPModalOpen(true)}} 
                className="text-primary-blue underline font-bold text-xs whitespace-nowrap"
              >
                Props & Privileges
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

      {/* 2. VIP Rules Section */}
      <section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-bold text-primary-blue">VIP Rules</h3>
        <p className="text-sm text-gray-500 font-normal">Shown in the app when user taps Rules (?) on VIP screen.</p>
        <textarea 
          className="w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl min-h-[100px] outline-none text-md"
          defaultValue="VIP levels unlock exclusive props and privileges. Higher levels offer more benefits and longer duration. Purchase with coins or receive as a gift."
        />
      </section>

      {/* 3. SVIP Levels (1-5) Section */}
      <section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-primary-blue font-bold text-lg">
          <Crown size={22} className="text-yellow-500" /> <h2>SVIP Levels (1–5)</h2>
        </div>
        <p className="text-sm text-gray-500">Points, validity, theme/badge, background and center media, Identification (props) and Exclusive Privileges per level. Use Config to edit.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-600 border-b border-gray-50">
                <th className="py-3 font-semibold">Level</th>
                <th className="py-3 font-semibold">Points</th>
                <th className="py-3 font-semibold">Validity</th>
                <th className="py-3 font-semibold">Priv.</th>
                <th className="py-3 font-semibold">Ident.</th>
                <th className="py-3 font-semibold">Theme</th>
                <th className="py-3 font-semibold">Badge</th>
                <th className="py-3 font-semibold">Background</th>
                <th className="py-3 font-semibold">Center</th>
                <th className="py-3 font-semibold">Config</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <tr key={lvl}>
                  <td className="py-4">{lvl}</td>
                <td className="py-4">
              <input 
                type="number" 
                placeholder="0" 
                className="w-28 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary-blue transition-all" 
              />
            </td>
            <td className="py-4">
              <input 
                type="number" 
                placeholder="0" 
                className="w-20 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary-blue transition-all" 
              />
            </td>
            <td className="py-4">
              <input 
                type="number" 
                placeholder="0" 
                className="w-28 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary-blue transition-all" 
              />
            </td>
            <td className="py-4">
              <input 
                type="number" 
                placeholder="0" 
                className="w-20 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary-blue transition-all" 
              />
            </td>
                  <td className="text-primary-blue font-semibold"><button className="flex items-center gap-1"><ImageIcon size={14}/> Select</button></td>
                  <td className="text-primary-blue font-semibold"><button className="flex items-center gap-1"><ImageIcon size={14}/> Select</button></td>
                  <td className="text-primary-blue font-semibold"><button className="flex items-center gap-1"><ImageIcon size={14}/> Select</button></td>
                  <td className="text-primary-blue font-semibold"><button className="flex items-center gap-1"><ImageIcon size={14}/> Select</button></td>
                  <td><button onClick={() => {setSelectedLevel(lvl); setIsSVIPModalOpen(true)}} className="text-primary-blue underline font-medium">Props & Privileges</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. SVIP Rules & Catalog Section */}
      <section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-primary-blue">SVIP Rules</h3>
          <p className="text-sm text-gray-500 font-normal">Shown in the app when user taps Rules (?) on SVIP screen.</p>
  
          <textarea 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl min-h-[120px] outline-none text-sm"
            defaultValue={`SVIP Introduction:\nSVIP is a user system where levels are determined by the amount recharged. Higher levels grant access to additional features and privileges.
1. You can earn SVIP points by purchasing coins. (1 Coin = 1 Point)
2. The more coins you purchase, the more points you earn - helping you level up your SVIP status.
3. If you refund a purchase, the SVIP Points earned from that purchase will be deducted.

SVIP Levels:
SVIP users at different levels receive different privileges based on their status.

SVIP Validity:
1. Each SVIP level has a maintenance period. To keep your current level, you must recharge the required amount within that time.
2. Successful maintenance opens the next period and counts toward upgrades. If it fails, your level drops by one and experience resets.

Notice:
1. MaSAT reserves the right of final interpretation.
2. Stay tuned for more SVIP levels and privileges coming soon.`}
          />
        </div>
        </section>


        
          {/* SVIP Privileges Catalog Section */}
<section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
  <div className="space-y-4 pt-4 border-t border-gray-50">
    <h3 className="font-bold text-primary-blue">SVIP Privileges Catalog</h3>
    <p className="text-sm text-gray-500">List of togglable privileges shown on the Privileges Setting screen.</p>
    
    {catalogPrivileges.map((item, index) => (
      <div key={item.id} className="p-4 border border-gray-100 rounded-2xl bg-gray-50/30 space-y-3 animate-in fade-in slide-in-from-top-1">
        <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
          <input 
            type="text" 
            placeholder="id (e.g. rank_invisible)" 
            defaultValue={item.key} 
            className="flex-1 min-w-[150px] p-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-primary-blue bg-white" 
          />
          <input 
            type="number" 
            placeholder="1" 
            defaultValue={item.level} 
            className="w-20 p-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-primary-blue bg-white" 
          />
          
          <input 
            type="text" 
            placeholder="Title" 
            defaultValue={item.title} 
            className="flex-[2] min-w-[200px] p-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-primary-blue bg-white" 
          />
          <button 
            onClick={() => removePrivilege(item.id)}
            className="text-red-500 text-xs font-bold hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
          >
            Remove
          </button>
        </div>
        
        <input 
          type="text" 
          placeholder="Description" 
          defaultValue={item.description} 
          className="w-full p-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-primary-blue bg-white" 
        />
      </div>
    ))}

    <button 
      onClick={addPrivilege} 
      className="text-primary-blue font-medium text-sm flex items-center gap-1 hover:underline"
    >
      + Add privilege
    </button>
  </div>
</section>

<div className="flex justify-end gap-3 pt-6">
  <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 font-medium text-slate-600 hover:bg-gray-50 bg-white shadow-sm transition-all active:scale-95">
    <RotateCcw size={18} /> Reset to defaults
  </button>
  <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-blue to-indigo-600 text-white font-medium shadow-md hover:opacity-90 active:scale-95 transition-all">
    <Save size={18} /> Save VIP & SVIP config
  </button>
</div>
      {/* --- MODALS --- */}
      {isVIPModalOpen && <PrivilegeModal title={`VIP Level ${selectedLevel}`} onClose={() => setIsVIPModalOpen(false)} />}
      {isSVIPModalOpen && <PrivilegeModal title={`SVIP Level ${selectedLevel}`} onClose={() => setIsSVIPModalOpen(false)} isSVIP={true}/>}
    </div>
  );
};

// Sub-component for the Modal (Reuse for VIP and SVIP)
const PrivilegeModal = ({ title, onClose, isSVIP }) => {
  // Logic to add/remove rows dynamically
  const [privileges, setPrivileges] = useState([{ id: 1 }]); 
  const [props, setProps] = useState([{ id: 1 }]);

  const addRow = (type) => {
    if (type === 'priv') setPrivileges([...privileges, { id: Date.now() }]);
    else setProps([...props, { id: Date.now() }]);
  };

  const removeRow = (id, type) => {
    if (type === 'priv') setPrivileges(privileges.filter(row => row.id !== id));
    else setProps(props.filter(row => row.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 md:p-4">
      <div className="bg-white w-full max-w-2xl rounded-[20px] md:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
          <h2 className="text-lg md:text-xl font-bold text-primary-blue truncate mr-2">{title} </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-5 md:p-8 space-y-8 overflow-y-auto">
          {/* Color Picker Section - Better Spacing */}
          <div className="space-y-3">
            <label className="text-[15px] font-medium text-gray-500 ">
              Exclusive Privileges section background color
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                defaultValue="#0D7A6B" 
                className="w-28 md:w-32 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-mono text-sm" 
              />
              
            </div>
          </div>

          {/* Dynamic Privileges List */}
          <div className="space-y-4">
            <label className="text-[15px] font-medium text-gray-500 block">
              Exclusive Privileges (name + media)
            </label>
            {privileges.map((row) => (
              <div key={row.id} className="flex flex-wrap md:flex-nowrap gap-2 items-center pb-2 border-b border-gray-50 md:border-none">
                <input 
                  type="text" 
                  placeholder="Label" 
                  className="flex-1 min-w-[150px] p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-primary-blue" 
                />
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button className="text-primary-blue  text-xs flex items-center gap-1 px-3 py-2 bg-blue-50 rounded-lg">
                    <ImageIcon size={14}/> Select
                  </button>
                  {privileges.length > 1 && (
                    <button onClick={() => removeRow(row.id, 'priv')} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16}/>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button 
              onClick={() => addRow('priv')}
              className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:underline pt-1"
            >
              + Add privilege
            </button>
          </div>

          {/* Dynamic Props List */}
          <div className="space-y-4 pt-4 border-t border-gray-50">
            <label className="text-[15px] font-medium text-gray-500  block">
              Exclusive Props (name + media)
            </label>
            {props.map((row) => (
              <div key={row.id} className="flex flex-wrap md:flex-nowrap gap-2 items-center">
                <input 
                  type="text" 
                  placeholder="Label" 
                  className="flex-1 min-w-[150px] p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-primary-blue" 
                />
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button className="text-primary-blue  text-xs flex items-center gap-1 px-3 py-2 bg-blue-50 rounded-lg">
                    <ImageIcon size={14}/> Select
                  </button>
                  {props.length > 1 && (
                    <button onClick={() => removeRow(row.id, 'prop')} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16}/>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button 
              onClick={() => addRow('prop')}
              className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:underline pt-1"
            >
              + Add prop
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/80 border-t border-gray-100 flex justify-center sticky bottom-0">
          <button 
            onClick={onClose} 
            className="w-full max-w-sm py-3 md:py-4 bg-primary-blue text-white font-bold rounded-2xl shadow-sm hover:shadow-primary-blue/20 transition-all active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
export default VIPManagement;
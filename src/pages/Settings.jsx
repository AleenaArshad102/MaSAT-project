import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Save, Plus, Trash2, Edit, 
  ExternalLink, Eye, Image as ImageIcon, Palette, Mic2, 
  ShoppingBag, ChevronRight, X, Database
} from 'lucide-react';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [showIAPSecret, setShowIAPSecret] = useState(false);
  const [showAgoraCertificate, setShowAgoraCertificate] = useState(false);
  const [roomThemeImage, setRoomThemeImage] = useState(null);
const [tintColor, setTintColor] = useState('#0F1423');
  
const [rankingData, setRankingData] = useState({
  Wealth: { color: '#AA2006', image: null },
  Charm: { color: '#024D9C', image: null },
  Room: { color: '#A76202', image: null }
});
  

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
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="text-primary-blue" size={28} />
        <h1 className="text-3xl font-bold text-slate-800 ">General Settings</h1>
      </div>

     {/* 1. In-App Purchase (IAP) Settings -  */}
<section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
  
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-primary-blue font-bold text-lg">
      <ShoppingBag size={22} /> 
      <h2>In-App Purchase (IAP) Settings</h2>
    </div>
    <p className="text-[13px] text-gray-500 leading-relaxed">
      Configure Google Play and/or Apple App Store for in-app purchase verification. 
      The verifyIAPPurchase Lambda reads these from AppSettings (no hardcoding).
    </p>
  </div>

  <div className="space-y-8">

    {/* --- Google Play Section --- */}
    <div className="space-y-4 pt-2">
      <h3 className="font-bold text-slate-700 text-md">Google Play (Android)</h3>
      
      {/* Package Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-800 ">Google Play Package Name</label>
        <input 
          type="text" 
          placeholder="com.yourcompany.masat" 
          className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" 
        />
        <p className="text-[11px] text-gray-600 font-normal">Package name from Google Play Console</p>
      </div>

      {/* Service Account Key */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-800 ">Google Service Account Key (JSON)</label>
        <div className="relative">
          <textarea 
            rows="5" 
            placeholder='{"type": "service_account", "project_id": "...", ...}' 
            className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-mono" 
          />
          
        </div>
        <p className="text-[11px] text-gray-600 font-normal">Full JSON key for server-side verification</p>
      </div>
    </div>

    {/* --- Apple App Store Section --- */}
    <div className="space-y-4 pt-4 border-t border-gray-50">
      <h3 className="font-bold text-slate-700 text-md">Apple App Store (iOS)</h3>
      
      {/* Shared Secret */}
     <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-800">App Store Shared Secret</label>
              <div className="relative">
                
                <input 
                  type={showIAPSecret ? "text" : "password"} 
                  placeholder="App-Specific Shared Secret" 
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none pr-12 text-sm" 
                />
                
                <button 
                  type="button"
                  onClick={() => setShowIAPSecret(!showIAPSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-blue transition-colors"
                >
                  <Eye size={20} />
                </button>
              </div>
              <p className="text-xs text-slate-600">Used by verifyIAPPurchase Lambda for receipt verification.</p>
            </div>
      {/* Bundle ID */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-800 u">Apple Bundle ID (optional)</label>
        <input 
          type="text" 
          placeholder="com.yourcompany.masat" 
          className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none text-sm focus:ring-2 focus:ring-blue-500" 
        />
        <p className="text-[11px] text-gray-600 font-normal">iOS app bundle ID; can help with validation</p>
      </div>
    </div>
  </div>

  {/* Footer Section */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 gap-4">
    <div className="flex items-center gap-2">
       <span className="text-amber-500">⚠️</span>
       <p className="text-[11px]  text-orange-300 font-medium ">
         Sensitive data. Configure at least Google or Apple; both can be set. Lambda reads from AppSettings (admin-only).
       </p>
    </div>
    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-95 whitespace-nowrap">
      <Save size={18} /> Save IAP Settings
    </button>
  </div>
</section>

      {/* 2. Agora Voice Settings */}
<section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
      {/* Header Section */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-primary-blue font-bold text-lg">
          <Mic2 size={22} /> <h2>Agora Voice (RTC Token)</h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed max-w-1xl">
          Used by the getAgoraRtcToken Lambda so Flutter can join voice channels securely. Set these in AppSettings (not hardcoded).
        </p>
      </div>

    
      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800">Agora App ID</label>
          <input type="text" placeholder="e.g. fd69ec8e801f4b9e82dcda645ddc2f7f" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none text-sm" />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800">Agora App Certificate</label>
          <div className="relative">
        
            <input 
              type={showAgoraCertificate ? "text" : "password"} 
              placeholder="From Agora Console → Project → Certificate" 
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none pr-10 text-sm" 
            />
            <button
              type="button"
              onClick={() => setShowAgoraCertificate(!showAgoraCertificate)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-blue transition-colors"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>
      </div>

      <button className="bg-primary-blue text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-95">
        <Save size={18} /> Save Agora Settings
      </button>
    </section>

    {/* 3. Home Banner Setting - */}
<section className="bg-white p-4 sm:p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
  {/* Header Section: */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-primary-blue font-bold text-lg">
        <ImageIcon size={22} /> 
        <h2>Home Banner Setting</h2>
      </div>
      <p className="text-xs text-gray-400">Manage promotional banners for the app home screen.</p>
    </div>
    
    <button 
      onClick={() => setIsBannerModalOpen(true)} 
      className="w-full sm:w-auto bg-primary-blue text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md active:scale-95"
    >
      <Plus size={18} /> Add Banner
    </button>
  </div>

  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    
    {/* Banner Item Template*/}
    {[
      { title: "Merchant Settings", color: "e67e22", order: 6 },
      { title: "Top Agencies", color: "27ae60", order: 7 }
    ].map((banner, index) => (
      <div key={index} className="border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group bg-white">
        {/* Banner Image Container */}
        <div className="relative">
          <img 
            src={`https://placehold.co/600x300/${banner.color}/ffffff?text=${banner.title}`} 
            alt="Banner" 
            className="w-full h-40 sm:h-36 object-cover" 
          />
         
        </div>

        {/* Banner Content */}
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              Active
            </span>
            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
              Order: {banner.order}
            </span>
          </div>

          <div className="flex items-center gap-2 py-1">
             <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
               <Database size={14}/>
             </div>
             <div>
                <p className="text-[10px] text-gray-400  font-bold leading-none"> Screen</p>
                <p className="text-xs font-bold text-slate-700 ">HOME</p>
             </div>
          </div>

          {/* Action Buttons: Hamesha side-by-side rahenge mobile par bhi */}
          <div className="flex gap-2 pt-1">
            <button className="flex-1 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
              <Edit size={14}/> Edit
            </button>
            <button className="flex-1 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
              <Trash2 size={14}/> Delete
            </button>
          </div>
        </div>
      </div>
    ))}

  </div>
</section>
{/* 4. Room Theme Settings */}
<section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
  {/* Header Section */}
  <div className="space-y-1.5">
    <div className="flex items-center gap-2 text-primary-blue font-bold text-lg">
      <Palette size={22} />
      <h2>Room Theme Settings</h2>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed max-w-1xl">
      Configure the default background theme image for Live Room screens. This image will be used when a room doesn't have its own background image set.
    </p>
  </div>

  {/* MAIN FORM */}
  <div className="space-y-6">
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-800">Default Room Theme Image (S3)</label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-2">
          <button className="bg-primary-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-95">
            <ImageIcon size={18} /> S3 Select
          </button>
          
          {/* Clear Button added here */}
          <button 
            onClick={() => setRoomThemeImage(null)}
            className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
          >
            Clear
          </button>
        </div>
        <span className="text-xs text-gray-400">
          {roomThemeImage ? "Custom theme selected." : "No theme image selected. Rooms will use placeholder."}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800">Overlay Opacity (0-1)</label>
        <input 
          type="text" 
          placeholder="0" 
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none text-sm focus:ring-2 focus:ring-blue-100" 
        />
        <p className="text-xs text-gray-500">Background image opacity (0.0 = transparent, 1.0 = opaque)</p>
      </div>
      
      {/* Tint Color with Preview Box */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800">Tint Color (Hex)</label>
        <div className="flex gap-3">
          <input 
            type="text" 
            value={tintColor}
            onChange={(e) => setTintColor(e.target.value)}
            placeholder="#0F1423" 
            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none text-sm font-mono focus:ring-2 focus:ring-blue-100" 
          />
          {/* Color Preview Box */}
          <div 
            className="w-12 h-12 rounded-xl border border-gray-100 shadow-sm shrink-0 transition-colors duration-200" 
            style={{ backgroundColor: tintColor }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">Background color used as fallback/overlay</p>
      </div>
    </div>

    {/* Default Room Seat Icon (S3) */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-800">Default Room Seat Icon (S3)</label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button className="bg-primary-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-95">
          <ImageIcon size={18} /> S3 Select
        </button>
        
        <p className="text-xs text-gray-400">Icon shown for empty mic seats in the room on mobile. Same S3 bucket as theme.</p>
      </div>
    </div>
  </div>

  {/* Button */}
  <div className="flex justify-end pt-4">
    <button className="bg-primary-blue text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-95">
      <Save size={18} /> Save Room Theme
    </button>
  </div>
</section>

      {/* 5. Rankings Defaults  */}
<section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
  {/* Main Header */}
  <div className="space-y-1.5">
    <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
      <Palette size={22} /> <h2>Rankings Defaults</h2>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed max-w-1xl">
      Configure dynamic background image and card/screen color for each ranking tab (Wealth, Charm, Room). Used by the Flutter app Ranking screen.
    </p>
  </div>

  <div className="space-y-6">
    {['Wealth', 'Charm', 'Room'].map((tab) => (
      <div key={tab} className="p-5 border border-gray-200 rounded-[20px] bg-white space-y-4">
        <h3 className="font-bold text-slate-800 text-base">{tab}</h3>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Image Selection Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 ">Background Image (S3)</label>
            <div className="flex items-center gap-3">
              {rankingData[tab].image && (
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                  <img src={rankingData[tab].image} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex gap-2">
                <button 
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-700 shadow-sm transition-all"
                  onClick={() => {/* Yahan aapka image upload logic aayega */}}
                >
                  <ImageIcon size={14}/> Select
                </button>
                <button 
                  onClick={() => setRankingData(prev => ({ ...prev, [tab]: { ...prev[tab], image: null } }))}
                  className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
            <p className="text-[11px] text-gray-400">
              {rankingData[tab].image ? 'Custom image selected.' : 'No image. App will use default.'}
            </p>
          </div>

          {/* Color Selection Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 ">Screen / Card Color (Hex)</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={rankingData[tab].color}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setRankingData(prev => ({
                      ...prev,
                      [tab]: { ...prev[tab], color: newColor }
                    }));
                  }}
                  placeholder="#ffffff" 
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white outline-none text-sm font-mono focus:ring-2 focus:ring-blue-100" 
                />
              </div>

              <div 
                className="w-11 h-11 rounded-xl border border-gray-100 shadow-sm shrink-0 transition-colors duration-200" 
                style={{ backgroundColor: rankingData[tab].color }}
              ></div>
            </div>
            <p className="text-[11px] text-gray-400 font-medium ">Background color for ranking list cards</p>
          </div>

        </div>
      </div>
    ))}
  </div>

  <div className="flex justify-end pt-4">
    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm shadow-blue-100 active:scale-95">
      <Save size={18} /> Save Rankings Defaults
    </button>
  </div>
</section>

      {/* 6. All Settings Table */}
      <section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 ">All Settings</h2>
          <p className="text-xs text-gray-600 font-normal  mt-1">View all application settings</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="text-[10px] font-black text-gray-500 uppercase  border-b border-gray-50">
                <th className="py-4 px-4">Key</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Value Preview</th>
                <th className="py-4 px-4">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { key: 'DEFAULT_ROOM_THEME_IMAGE_KEY', cat: 'THEME', val: 'MaSAT Assets/Default_Customized_Mic Themes/Default...', date: '2/21/2026' },
                { key: 'SVIP_LEVELS_JSON', cat: 'VIP_SVIP', val: '[{"level":1, "svipPointsRequired":3500000,...', date: '2/24/2026' },
                { key: 'RANKING_WEALTH_SCREEN_COLOR', cat: 'RANKING', val: '#AA2006', date: '2/21/2026' },
                { key: 'DEFAULT_ROOM_THEME_OVERLAY_OPACITY', cat: 'THEME', val: '0.2', date: '2/21/2026' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4"><span className="bg-gray-100 text-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-bold">{item.key}</span></td>
                  <td className="py-4 px-4"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold">{item.cat}</span></td>
                  <td className="py-4 px-4 text-xs font-normal text-gray-500 max-w-[200px] truncate">{item.val}</td>
                  <td className="py-4 px-4 text-[11px] font-normal text-slate-400">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/*  MODAL */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsBannerModalOpen(false)}></div>
          <div className="bg-white rounded-[28px] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-50">
              <h3 className="text-xl font-bold text-slate-800 ">Create Banner</h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={24}/></button>
            </div>
            
            <div className="p-6 space-y-5">
               <div className="space-y-2">
                 <div className="flex justify-between items-center">
                   <label className="text-[15px] font-normal text-gray-600 ">Banner Image</label>
                   <button className="text-[10px] font-black text-primary-blue flex items-center gap-1 "><ImageIcon size={12}/> S3 Select</button>
                 </div>
                 <input type="text" placeholder="Paste S3 URL or select" className="w-full p-3 rounded-xl border border-gray-200 outline-none text-sm " />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[15px] font-normal text-gray-600 ">Display Order</label>
                    <input type="number" defaultValue="0" className="w-full p-3 rounded-xl border border-gray-200 outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-normal text-gray-600 ">Status</label>
                    <select className="w-full p-3 rounded-xl border border-gray-200 outline-none text-sm font-normal text-slate-700 bg-white">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[15px] font-normal text-gray-600 ">Navigation Type</label>
                 <select className="w-full p-3 rounded-xl border border-gray-200 outline-none text-sm  text-slate-700 bg-white">
                   <option>Screen (In-App)</option>
                   <option>WhatsApp Externel</option>
                   <option>Other Links</option>
                 </select>
               </div>

               <div className="space-y-2">
                 <label className="text-[15px] font-normal text-gray-600 ">Navigation Target</label>
                 <select className="w-full p-3 rounded-xl border border-gray-200 outline-none text-sm  text-slate-700 bg-white">
                   <option>Select Screen</option>
                   <option>Home</option>
                   <option>Profile</option>
                   <option>Store</option>
                   <option>Ranking</option>
                   <option>Wallet</option>
                   <option>Search</option>
                 </select>
               </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button onClick={() => setIsBannerModalOpen(false)} className="flex-1 py-3 bg-white border border-gray-200 text-slate-600 rounded-xl font-medium text-md  hover:bg-gray-100 transition-all">Cancel</button>
              <button className="flex-1 py-3 bg-primary-blue text-white rounded-xl font-medium  text-md hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all active:scale-95">Save Banner</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
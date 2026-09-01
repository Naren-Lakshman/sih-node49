import React, { useState } from 'react';
import { 
  Building2, Truck, ShieldCheck, ArrowUpRight, ArrowDownRight, 
  CheckCircle, Loader2, QrCode, CreditCard, Languages, Plus, X 
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('EN');
  const [activeTab, setActiveTab] = useState('buyer'); // 'farmer' or 'buyer'
  
  // Crop Lots State
  const [lots, setLots] = useState([
    { id: 1, crop: 'Nashik Red Onions', volume: '50 Quintals', price: '₹2,400/Q', location: 'Nashik, MH', grade: 'Grade A', status: 'Available' },
    { id: 2, crop: 'Pune Tomatoes', volume: '30 Quintals', price: '₹1,800/Q', location: 'Pune, MH', grade: 'Grade B', status: 'Available' },
    { id: 3, crop: 'Nagpur Cotton', volume: '100 Quintals', price: '₹6,200/Q', location: 'Nagpur, MH', grade: 'Grade A', status: 'Available' }
  ]);

  // Modal & Payment State
  const [selectedLot, setSelectedLot] = useState(null);
  const [paymentStep, setPaymentStep] = useState('select'); // 'select', 'processing', 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Custom UI Modals State
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [showCreateLotModal, setShowCreateLotModal] = useState(false);
  const [newCropName, setNewCropName] = useState('');
  const [newVolume, setNewVolume] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleOpenPayment = (lot) => {
    setSelectedLot(lot);
    setPaymentStep('select');
  };

  const handleConfirmPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      setLots(prev => prev.map(l => l.id === selectedLot.id ? { ...l, status: 'Escrow Locked' } : l));
    }, 2000);
  };

  const handleCreateLotSubmit = (e) => {
    e.preventDefault();
    if (!newCropName || !newVolume || !newPrice) return;
    
    const newLotItem = {
      id: lots.length + 1,
      crop: newCropName,
      volume: `${newVolume} Quintals`,
      price: `₹${newPrice}/Q`,
      location: 'Maharashtra, MH',
      grade: 'Grade A',
      status: 'Available'
    };

    setLots([newLotItem, ...lots]);
    setShowCreateLotModal(false);
    setNewCropName('');
    setNewVolume('');
    setNewPrice('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Top Navigation */}
      <header className="bg-emerald-800 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              {lang === 'EN' ? 'Govt of Maharashtra — Krishi Vikas Portal' : 'महाराष्ट्र शासन — कृषि विकास पोर्टल'}
            </h1>
            <p className="text-xs text-emerald-200">SIH • Market Linkages & Escrow System</p>
          </div>
          <button 
            onClick={() => setLang(lang === 'EN' ? 'MR' : 'EN')}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 px-3 py-1.5 rounded-lg text-sm transition"
          >
            <Languages className="w-4 h-4" />
            <span>{lang === 'EN' ? 'मराठी' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        
        {/* Mandi Live Ticker */}
        <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Live Mandi Prices</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg border">
              <span className="text-xs text-gray-500">Nashik Onion</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-lg">₹2,450/Q</span>
                <span className="text-emerald-600 text-xs flex items-center font-semibold"><ArrowUpRight className="w-3 h-3"/> +2.4%</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <span className="text-xs text-gray-500">Pune Tomato</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-lg">₹1,800/Q</span>
                <span className="text-red-500 text-xs flex items-center font-semibold"><ArrowDownRight className="w-3 h-3"/> -1.1%</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <span className="text-xs text-gray-500">Nagpur Cotton</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-lg">₹6,200/Q</span>
                <span className="text-emerald-600 text-xs flex items-center font-semibold"><ArrowUpRight className="w-3 h-3"/> +0.8%</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <span className="text-xs text-gray-500">Latur Soybean</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-lg">₹4,350/Q</span>
                <span className="text-emerald-600 text-xs flex items-center font-semibold"><ArrowUpRight className="w-3 h-3"/> +1.5%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="flex bg-gray-200 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('farmer')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${activeTab === 'farmer' ? 'bg-emerald-800 text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Farmer / FPO Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('buyer')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${activeTab === 'buyer' ? 'bg-emerald-800 text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Verified Buyer Portal
          </button>
        </div>

        {/* FARMER DASHBOARD TAB */}
        {activeTab === 'farmer' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">AI Sale-Window Recommendation</span>
                <h3 className="text-lg font-bold text-amber-900">Hold Nashik Onion Lots for 4 Days</h3>
                <p className="text-xs text-amber-700">Demand in Mumbai processing hubs is forecasted to rise by 8% this Friday.</p>
              </div>
              <button 
                onClick={() => setShowForecastModal(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-2 rounded-lg font-semibold transition shadow-sm"
              >
                View Forecast
              </button>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Your Active Crop Listings</h2>
              <button 
                onClick={() => setShowCreateLotModal(true)}
                className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-emerald-800 transition"
              >
                <Plus className="w-4 h-4"/> Create New Lot
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lots.map(lot => (
                <div key={lot.id} className="bg-white border rounded-xl p-4 shadow-sm relative">
                  <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-bold ${lot.status === 'Escrow Locked' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {lot.status}
                  </span>
                  <h3 className="font-bold text-gray-900">{lot.crop}</h3>
                  <p className="text-xs text-gray-500 mt-1">{lot.location} • {lot.grade}</p>
                  <div className="mt-4 pt-3 border-t flex justify-between items-center">
                    <span className="text-sm font-semibold">{lot.volume}</span>
                    <span className="text-lg font-bold text-emerald-800">{lot.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUYER PORTAL TAB */}
        {activeTab === 'buyer' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Procurement Feed (Verified Lots)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lots.map(lot => (
                <div key={lot.id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">{lot.crop}</h3>
                      <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded font-semibold border border-emerald-200">{lot.grade}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{lot.location}</p>
                    <div className="my-4">
                      <div className="text-sm text-gray-600">Available: <span className="font-semibold text-gray-900">{lot.volume}</span></div>
                      <div className="text-lg font-bold text-emerald-800">{lot.price}</div>
                    </div>
                  </div>

                  {lot.status === 'Escrow Locked' ? (
                    <div className="w-full bg-purple-50 text-purple-700 border border-purple-200 py-2 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Escrow Funds Locked
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleOpenPayment(lot)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 rounded-lg text-sm transition shadow-sm"
                    >
                      Deposit to Escrow
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* AI FORECAST MODAL */}
      {showForecastModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setShowForecastModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-amber-900 mb-2">AI Price Forecast (7 Days)</h3>
            <p className="text-xs text-gray-600 mb-4">
              Prices for Nashik Red Onion are expected to peak by Friday due to heavy festival demand spikes in Mumbai markets.
            </p>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-800 mb-4 font-semibold">
              Recommended Action: Hold stock for 3–4 days to maximize profit margins.
            </div>
            <button 
              onClick={() => setShowForecastModal(false)}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* CREATE NEW LOT MODAL */}
      {showCreateLotModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setShowCreateLotModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-emerald-900 mb-2">Create New Crop Lot</h3>
            <p className="text-xs text-gray-500 mb-4">List your harvest for verified institutional buyers across Maharashtra.</p>
            
            <form onSubmit={handleCreateLotSubmit} className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-600">Crop Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Solapur Pomegranate" 
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg mt-1"
                  required 
                />
              </div>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="text-xs font-semibold text-gray-600">Volume (Quintals)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 40" 
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    className="w-full text-xs p-2.5 border rounded-lg mt-1"
                    required 
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-xs font-semibold text-gray-600">Price per Quintal (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3200" 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full text-xs p-2.5 border rounded-lg mt-1"
                    required 
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm shadow transition mt-2"
              >
                Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIMULATED ESCROW PAYMENT MODAL */}
      {selectedLot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setSelectedLot(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            {paymentStep === 'select' && (
              <div>
                <div className="flex items-center gap-2 text-emerald-800 mb-2">
                  <ShieldCheck className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Escrow Payment Gateway</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">Funds will be held securely in escrow until delivery and quality are verified.</p>
                
                <div className="bg-gray-50 p-3 rounded-lg border mb-4">
                  <div className="text-xs text-gray-500">Selected Item</div>
                  <div className="font-bold text-gray-900">{selectedLot.crop} ({selectedLot.volume})</div>
                  <div className="text-emerald-700 font-bold">{selectedLot.price}</div>
                </div>

                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1 ${paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'text-gray-600'}`}
                  >
                    <QrCode className="w-4 h-4"/> UPI / QR
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1 ${paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'text-gray-600'}`}
                  >
                    <CreditCard className="w-4 h-4"/> Dummy Card
                  </button>
                </div>

                {paymentMethod === 'upi' ? (
                  <div className="text-center my-4 p-4 border border-dashed rounded-xl bg-gray-50">
                    <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center text-xs text-gray-500 font-mono">
                      [ MOCK UPI QR ]
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Scan with any UPI App to test</p>
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    <input type="text" className="w-full text-xs p-2.5 border rounded-lg bg-gray-100" readOnly value="4111 1111 1111 1111" />
                    <div className="flex gap-2">
                      <input type="text" className="w-1/2 text-xs p-2.5 border rounded-lg bg-gray-100" readOnly value="12/28" />
                      <input type="text" className="w-1/2 text-xs p-2.5 border rounded-lg bg-gray-100" readOnly value="123" />
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleConfirmPayment}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm shadow transition"
                >
                  Confirm Test Payment
                </button>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 text-emerald-700 animate-spin mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 text-base">Processing Escrow Deposit...</h4>
                <p className="text-xs text-gray-500 mt-1">Verifying simulated bank transaction</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center py-6">
                <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-xl text-gray-900">Payment Successful!</h4>
                <p className="text-xs text-gray-600 mt-1">Funds have been safely locked into the Escrow Smart Contract.</p>
                <button 
                  onClick={() => setSelectedLot(null)}
                  className="mt-6 w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  Close & View Status
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
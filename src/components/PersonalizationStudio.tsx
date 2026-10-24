import React, { useState } from 'react';
import { Product, CustomizationOption } from '../types';
import {
  Sparkles,
  Type,
  Gift,
  Check,
  X,
  Eye,
  MessageSquareHeart,
  ShieldCheck,
  Crown,
  Palette,
  Stamp
} from 'lucide-react';

interface PersonalizationStudioProps {
  product: Product;
  initialCustomization?: CustomizationOption;
  onSave: (customization: CustomizationOption) => void;
  onClose: () => void;
}

export const PersonalizationStudio: React.FC<PersonalizationStudioProps> = ({
  product,
  initialCustomization,
  onSave,
  onClose
}) => {
  const [engravedText, setEngravedText] = useState(
    initialCustomization?.engravedText || 'Sneha & Rohan'
  );
  const [fontFamily, setFontFamily] = useState(
    initialCustomization?.fontFamily || 'Dancing Script'
  );
  const [giftNote, setGiftNote] = useState(
    initialCustomization?.giftNote || 'Wishing you a lifetime of joy, laughter, and celebrated memories together!'
  );
  const [ribbonColor, setRibbonColor] = useState(
    initialCustomization?.ribbonColor || 'Rose Gold Silk'
  );
  const [boxWrapStyle, setBoxWrapStyle] = useState(
    initialCustomization?.boxWrapStyle || 'Blush Pink with Gold Foil'
  );
  const [waxSealColor, setWaxSealColor] = useState<'crimson' | 'gold' | 'navy' | 'emerald'>('gold');
  const [activeTab, setActiveTab] = useState<'engrave' | 'giftnote' | 'packaging'>('engrave');

  const fontOptions = [
    { name: 'Dancing Script', label: 'Calligraphy Romance', className: 'font-script italic text-2xl' },
    { name: 'Playfair Display', label: 'Royal Serif Monogram', className: 'font-serif text-xl tracking-wider' },
    { name: 'Plus Jakarta Sans', label: 'Modern Minimalist', className: 'font-sans font-bold text-lg uppercase tracking-widest' },
    { name: 'Alex Brush', label: 'Vintage Hand-Etched', className: 'font-script text-2xl' }
  ];

  const ribbonColors = [
    { name: 'Rose Gold Silk', bg: 'bg-[#b76e79]', border: 'border-[#914d57]' },
    { name: 'Champagne Gold', bg: 'bg-[#dfba73]', border: 'border-[#b59247]' },
    { name: 'Burgundy Velvet', bg: 'bg-[#58111a]', border: 'border-[#3c0910]' },
    { name: 'Midnight Navy', bg: 'bg-[#1b2a47]', border: 'border-[#0f172a]' },
    { name: 'Emerald Forest', bg: 'bg-[#1b4332]', border: 'border-[#081c15]' }
  ];

  const waxSeals = [
    { id: 'gold', name: '24K Antique Gold', bg: 'bg-[#C5A059]', ring: 'ring-[#D4AF37]' },
    { id: 'crimson', name: 'Imperial Crimson', bg: 'bg-[#881337]', ring: 'ring-[#9F1239]' },
    { id: 'navy', name: 'Royal Peacock Navy', bg: 'bg-[#1E293B]', ring: 'ring-[#334155]' },
    { id: 'emerald', name: 'Maharani Emerald', bg: 'bg-[#064E3B]', ring: 'ring-[#047857]' }
  ];

  const boxOptions = [
    { id: 'Blush Pink with Gold Foil', label: 'Blush Pink & Gold Foil Lid', desc: 'Handcrafted rigid keepsake case with 24K hot-stamped gold trim' },
    { id: 'Midnight Matte Rigid Box', label: 'Midnight Matte Royal Case', desc: 'High-density luxury magnetic closure case with satin bed' },
    { id: 'Vintage Wooden Keepsake Crate', label: 'Artisanal Pine Wood Crate', desc: 'Sustainably sourced pine wood slider box with brass latch (+₹150)' }
  ];

  const handleApply = () => {
    onSave({
      engravedText,
      fontFamily,
      giftNote,
      ribbonColor,
      boxWrapStyle
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-amber-300/40 overflow-hidden my-6">
        
        {/* Atelier Top Header */}
        <div className="bg-gradient-to-r from-[#2A080C] via-[#481219] to-[#2A080C] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shadow-xs">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold tracking-tight">Ajmer Bespoke Atelier</h3>
                <span className="text-[9.5px] bg-amber-400/20 text-amber-200 border border-amber-400/40 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                  Fiber Laser 0.05mm
                </span>
              </div>
              <p className="text-xs text-rose-200">
                Personalizing: <span className="font-semibold text-white">{product.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-rose-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body: Split View */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          
          {/* Left Column: Live Realistic Hot-Foil & Engraving Simulation */}
          <div className="md:col-span-6 bg-gradient-to-b from-[#FAF5F2] to-[#F5ECE6] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8D8D0]">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1.5 font-bold text-[#4A0E17]">
                  <Eye className="w-3.5 h-3.5 text-[#A21D32]" />
                  <span>Real-time Laser & Foil Simulation</span>
                </span>
                <span className="text-[10px] bg-white px-2.5 py-0.5 rounded-full border border-amber-300/80 text-amber-900 font-medium">
                  24K Gold Deboss
                </span>
              </div>

              {/* Mockup Canvas */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-slate-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Simulated Engraved / Hot-Foil Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none">
                  {engravedText && (
                    <div className="backdrop-blur-[2px] bg-black/40 px-5 py-2.5 rounded-2xl text-center shadow-2xl border border-amber-300/40 transform -rotate-1 max-w-[85%] transition-all">
                      <div
                        className="text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide font-normal foil-deboss"
                        style={{
                          fontFamily: fontFamily.includes('Script') ? "'Dancing Script', cursive" : fontFamily.includes('Serif') ? "'Playfair Display', serif" : "'Plus Jakarta Sans', sans-serif"
                        }}
                      >
                        <span className="text-xl sm:text-2xl font-bold text-gold-gradient">{engravedText}</span>
                      </div>
                      <div className="text-[8.5px] text-amber-200/90 tracking-[0.25em] uppercase mt-1">
                        ✦ Hand-finished in Rajasthan ✦
                      </div>
                    </div>
                  )}
                </div>

                {/* Ribbon Tag Pill */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-slate-800 font-semibold shadow-xs border border-rose-100 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#A21D32]" />
                  <span>{ribbonColor} Silk</span>
                </div>
              </div>
            </div>

            {/* Deckle Edge Handmade Cotton Greeting Card Preview */}
            <div className="mt-4 p-4 rounded-2xl bg-[#FFFDF8] border border-amber-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-bold text-[#4A0E17] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <MessageSquareHeart className="w-3.5 h-3.5 text-[#A21D32]" />
                  <span>300 GSM Textured Cotton Card</span>
                </span>
                
                {/* Simulated Wax Seal Motif */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-500 font-normal">Sealed with:</span>
                  <div className={`w-4 h-4 rounded-full ${
                    waxSealColor === 'gold' ? 'bg-[#C5A059]' :
                    waxSealColor === 'crimson' ? 'bg-[#881337]' :
                    waxSealColor === 'navy' ? 'bg-[#1E293B]' : 'bg-[#064E3B]'
                  } shadow-xs border border-white flex items-center justify-center text-[8px] text-white font-bold`}>
                    ✦
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-slate-700 font-script text-base italic leading-relaxed pl-2 border-l-2 border-[#A21D32]">
                "{giftNote || 'No message provided'}"
              </p>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between">
            <div>
              {/* Step Tabs with Gold Underline */}
              <div className="flex border-b border-[#E8D8D0] gap-4 mb-5 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('engrave')}
                  className={`pb-2.5 transition-all flex items-center gap-1.5 border-b-2 ${
                    activeTab === 'engrave'
                      ? 'border-[#A21D32] text-[#A21D32]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>1. Monogram / Name</span>
                </button>
                <button
                  onClick={() => setActiveTab('giftnote')}
                  className={`pb-2.5 transition-all flex items-center gap-1.5 border-b-2 ${
                    activeTab === 'giftnote'
                      ? 'border-[#A21D32] text-[#A21D32]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <MessageSquareHeart className="w-3.5 h-3.5" />
                  <span>2. Greeting Card</span>
                </button>
                <button
                  onClick={() => setActiveTab('packaging')}
                  className={`pb-2.5 transition-all flex items-center gap-1.5 border-b-2 ${
                    activeTab === 'packaging'
                      ? 'border-[#A21D32] text-[#A21D32]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>3. Box & Ribbon</span>
                </button>
              </div>

              {/* Tab 1: Engraving */}
              {activeTab === 'engrave' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Enter Name or Custom Inscription
                    </label>
                    <input
                      type="text"
                      maxLength={32}
                      value={engravedText}
                      onChange={(e) => setEngravedText(e.target.value)}
                      placeholder="e.g. Sneha & Rohan or Good Vibes Only"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCC7BE] focus:outline-hidden focus:ring-2 focus:ring-[#A21D32]/30 text-sm font-semibold text-slate-900"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>Laser engraved permanently with zero fading</span>
                      <span>{engravedText.length}/32 chars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Typography & Script
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {fontOptions.map((font) => (
                        <button
                          key={font.name}
                          type="button"
                          onClick={() => setFontFamily(font.name)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            fontFamily === font.name
                              ? 'border-[#A21D32] bg-rose-50/60 shadow-xs ring-1 ring-[#A21D32]'
                              : 'border-slate-200 hover:border-amber-300'
                          }`}
                        >
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            {font.label}
                          </div>
                          <div className={font.className}>
                            {engravedText || 'Sneha & Rohan'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Greeting Card & Wax Seal */}
              {activeTab === 'giftnote' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Personal Message for Gift Card
                    </label>
                    <textarea
                      rows={4}
                      maxLength={200}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your heartfelt note here..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCC7BE] focus:outline-hidden focus:ring-2 focus:ring-[#A21D32]/30 text-sm font-medium text-slate-900"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>Printed on textured 300 GSM ivory cardstock</span>
                      <span>{giftNote.length}/200 chars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Hand-Poured Wax Seal Color
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {waxSeals.map((ws) => (
                        <button
                          key={ws.id}
                          type="button"
                          onClick={() => setWaxSealColor(ws.id as any)}
                          className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs font-semibold transition-all ${
                            waxSealColor === ws.id
                              ? 'border-[#A21D32] bg-rose-50/60 ring-1 ring-[#A21D32] text-slate-900'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full ${ws.bg} shadow-xs border border-white`} />
                          <span className="text-[11px]">{ws.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Packaging & Ribbon */}
              {activeTab === 'packaging' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Pure Mulberry Silk Ribbon
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ribbonColors.map((r) => (
                        <button
                          key={r.name}
                          type="button"
                          onClick={() => setRibbonColor(r.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                            ribbonColor === r.name
                              ? 'border-[#A21D32] bg-rose-50 text-[#881337] ring-1 ring-[#A21D32] font-bold'
                              : 'border-slate-200 text-slate-700 hover:border-amber-300'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full ${r.bg} ${r.border} border`} />
                          <span>{r.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Gift Keepsake Box Style
                    </label>
                    <div className="space-y-2">
                      {boxOptions.map((box) => (
                        <label
                          key={box.id}
                          onClick={() => setBoxWrapStyle(box.id)}
                          className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                            boxWrapStyle === box.id
                              ? 'border-[#A21D32] bg-rose-50/50 ring-1 ring-[#A21D32]'
                              : 'border-slate-200 hover:border-amber-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="boxWrapStyle"
                            checked={boxWrapStyle === box.id}
                            onChange={() => setBoxWrapStyle(box.id)}
                            className="mt-1 text-[#A21D32] focus:ring-[#A21D32]"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{box.label}</div>
                            <div className="text-[11px] text-slate-500">{box.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApply}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#881337] to-[#A21D32] hover:from-[#3A0A11] hover:to-[#881337] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-950/20 flex items-center gap-2 transition-all transform active:scale-95"
              >
                <Check className="w-4 h-4 text-amber-300" />
                <span>Save Bespoke Customization</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

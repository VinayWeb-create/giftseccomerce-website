import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = '919829084721',
  defaultMessage = 'Hello Ajmer Gift Charm! I would like to inquire about personalized gifts and corporate bulk orders.'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const encodedDefaultMsg = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedDefaultMsg}`;

  const handleSendCustomMsg = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = userMsg.trim() ? encodeURIComponent(userMsg) : encodedDefaultMsg;
    window.open(`https://wa.me/${phoneNumber}?text=${finalMsg}`, '_blank', 'noopener,noreferrer');
    setUserMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* Interactive Quick Chat Drawer / Tooltip Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-84 rounded-3xl bg-white shadow-2xl border border-rose-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 text-white font-serif font-black text-sm">
                  AG
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>

              <div>
                <div className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Ajmer Gift Concierge</span>
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </div>
                <div className="text-[11px] text-emerald-100">
                  Online • Typically replies in 2 mins
                </div>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] space-y-3">
            <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-xs max-w-[90%] text-xs text-slate-800 space-y-1">
              <div className="font-semibold text-[#075E54] text-[11px]">
                Namaste! 🙏
              </div>
              <p className="leading-relaxed">
                Welcome to Ajmer Gift Charm. Need help customizing a gift, tracking an order, or getting bulk corporate GST pricing?
              </p>
              <div className="text-[9.5px] text-slate-400 text-right pt-0.5">
                Just now
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi! I need help personalizing a gift with custom photo/text.')}`,
                    '_blank'
                  );
                }}
                className="w-full text-left text-[11px] font-semibold text-slate-700 bg-white/90 hover:bg-white p-2 rounded-xl border border-white/60 transition-all hover:border-emerald-500 hover:text-emerald-800 shadow-2xs"
              >
                ✨ Help me customize a personalized gift
              </button>
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hello! Looking for corporate bulk gifting catalog and GST invoice quotation.')}`,
                    '_blank'
                  );
                }}
                className="w-full text-left text-[11px] font-semibold text-slate-700 bg-white/90 hover:bg-white p-2 rounded-xl border border-white/60 transition-all hover:border-emerald-500 hover:text-emerald-800 shadow-2xs"
              >
                💼 Corporate bulk order with GST quotation
              </button>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendCustomMsg} className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message on WhatsApp..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-full border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-colors shadow-xs shrink-0"
              title="Open WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Circle Button with Real Authentic WhatsApp App Icon */}
      <div className="relative group">
        
        {/* Subtle Ping Animation Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-xs animate-ping pointer-events-none opacity-40 group-hover:opacity-75" />

        {/* Small Tooltip on Hover (When Closed) */}
        {!isOpen && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-full bg-[#2F0B10]/90 backdrop-blur-md text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Chat on WhatsApp</span>
          </div>
        )}

        {/* Real Circular WhatsApp Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] flex items-center justify-center transition-all duration-300 transform hover:scale-108 active:scale-95 focus:outline-hidden border-2 border-white"
          aria-label="Chat with Ajmer Gift Charm on WhatsApp"
        >
          {/* Authentic Official WhatsApp Icon SVG */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.507 14.307l-.009.075c-.238-.12-1.406-.693-1.624-.772-.218-.08-.377-.12-.536.12-.16.24-.616.772-.755.932-.14.16-.279.18-.517.06-.239-.12-1.008-.372-1.92-1.185-.709-.633-1.188-1.415-1.328-1.654-.14-.24-.015-.369.105-.488.108-.108.239-.279.359-.419.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.537-1.295-.736-1.774-.194-.467-.392-.404-.537-.411l-.458-.008c-.16 0-.418.06-.637.299-.219.24-.836.817-.836 1.993 0 1.176.856 2.312.976 2.472.12.16 1.684 2.571 4.079 3.604.57.246 1.015.393 1.363.504.573.182 1.094.156 1.506.095.459-.069 1.406-.575 1.605-1.13.199-.556.199-1.032.14-1.132-.06-.101-.219-.161-.458-.281zM12.012 2.002c-5.518 0-9.998 4.48-9.998 10 0 1.763.46 3.486 1.332 5.006L2 22l5.127-1.319a9.98 9.98 0 0 0 4.885 1.321h.004c5.517 0 9.998-4.48 9.998-10 0-5.52-4.481-10-9.998-10h-.004zm0 18.318h-.004a8.314 8.314 0 0 1-4.238-1.162l-.304-.18-3.149.81.84-3.07-.198-.315a8.31 8.31 0 0 1-1.277-4.4c0-4.59 3.736-8.327 8.33-8.327 2.224 0 4.315.867 5.887 2.44 1.571 1.573 2.436 3.665 2.436 5.89 0 4.59-3.736 8.324-8.326 8.324z"/>
          </svg>
        </button>

      </div>

    </div>
  );
};

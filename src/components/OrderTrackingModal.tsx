import React from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import {
  X,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Sparkles,
  FileText,
  ShieldCheck
} from 'lucide-react';

interface OrderTrackingModalProps {
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ onClose }) => {
  const { orders, selectedOrder, setSelectedOrder, setActiveModal } = useApp();

  const currentOrder: Order = selectedOrder || orders[0];

  const steps = [
    { title: 'Order Placed', desc: 'Payment verified & order booked' },
    { title: 'Artwork Approval', desc: 'Laser typography preview verified' },
    { title: 'In Customization', desc: 'Laser etching / UV printing in Ajmer Craft Lab' },
    { title: 'Quality Check', desc: 'Tamper-proof gift packaging & wax seal' },
    { title: 'Dispatched', desc: 'Handed to express logistics courier' },
    { title: 'In Transit', desc: 'On route to destination delivery hub' },
    { title: 'Delivered', desc: 'Safely handed over to recipient' }
  ];

  const getStepIndex = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Order Placed': return 0;
      case 'Artwork Approval': return 1;
      case 'In Customization': return 2;
      case 'Quality Check': return 3;
      case 'Dispatched': return 4;
      case 'In Transit': return 5;
      case 'Delivered': return 6;
      default: return 0;
    }
  };

  const activeIdx = getStepIndex(currentOrder.orderStatus);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-700/60 flex items-center justify-center text-amber-300">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Live Shipment Tracking</h3>
              <p className="text-xs text-rose-200">
                Courier Partner: <span className="text-white font-semibold">{currentOrder.courierPartner || 'BlueDart Air Express'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-rose-200 hover:text-white hover:bg-rose-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Order Selector (if multiple exist) */}
          {orders.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 font-semibold shrink-0">Switch Order:</span>
              {orders.map(o => (
                <button
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className={`px-3 py-1 rounded-full font-mono font-semibold transition-all shrink-0 ${
                    currentOrder.id === o.id
                      ? 'bg-rose-700 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {o.orderNumber}
                </button>
              ))}
            </div>
          )}

          {/* Shipment Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div>
                <span className="text-slate-500">AWB Tracking #</span>
                <div className="font-mono font-bold text-sm text-slate-900">{currentOrder.awbNumber || 'PENDING-GEN'}</div>
              </div>
              <div className="text-right">
                <span className="text-slate-500">Estimated Delivery Date</span>
                <div className="font-bold text-emerald-700 text-sm">{currentOrder.estimatedDeliveryDate}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-600">
              <span>Destination: {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} ({currentOrder.shippingAddress.pincode})</span>
              <span>Recipient: {currentOrder.shippingAddress.name}</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {steps.map((st, idx) => {
              const isDone = idx <= activeIdx;
              const isCurrent = idx === activeIdx;

              return (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Step circle */}
                  <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent
                      ? 'bg-rose-600 text-white ring-4 ring-rose-100 animate-pulse'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold ${isCurrent ? 'text-rose-950 font-serif text-sm' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                      {st.title}
                      {isCurrent && (
                        <span className="ml-2 text-[10px] bg-rose-100 text-rose-800 font-normal px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Current Stage
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                setSelectedOrder(currentOrder);
                onClose();
                setActiveModal('invoice_view');
              }}
              className="text-rose-700 font-semibold hover:underline flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Download Tax Invoice</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

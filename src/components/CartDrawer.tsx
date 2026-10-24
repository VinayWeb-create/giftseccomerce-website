import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Users,
  Gift,
  Crown
} from 'lucide-react';

interface CartDrawerProps {
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onClose,
  onProceedToCheckout
}) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= 999 || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 99;
  const finalDiscount = couponDiscount;
  
  // 18% GST calculation
  const taxableAmount = Math.max(0, subtotal - finalDiscount);
  const estimatedGst = taxableAmount * 0.18;
  const grandTotal = taxableAmount + estimatedGst + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-amber-300/40">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EADBCE] flex items-center justify-between bg-gradient-to-r from-rose-50/60 to-[#FAF5F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#4A0E17] text-amber-200 flex items-center justify-center font-bold shadow-xs border border-amber-300/40">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-serif font-bold text-lg text-slate-900">Your Gifting Bag</h2>
                <Crown className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <p className="text-xs text-slate-500">
                {cart.length} {cart.length === 1 ? 'bespoke item' : 'bespoke items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF4EE] px-4 py-2.5 text-xs border-b border-[#EADBCE] flex items-center justify-between">
          {subtotal >= 999 ? (
            <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Complimentary <strong>Pan-India Insured Express Shipping</strong> Unlocked!</span>
            </span>
          ) : (
            <span className="text-[#881337] font-medium">
              Add <strong>₹{(999 - subtotal).toLocaleString('en-IN')}</strong> more for complimentary delivery!
            </span>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {cart.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#A21D32] flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Your gifting bag is empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                Explore our 24K gold-rim mugs, Rajasthani brass decor, or custom corporate welcome kits.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#2F0B10] text-amber-200 text-xs font-semibold hover:bg-[#4A0E17] transition-all shadow-xs"
              >
                Browse Curated Collections
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border border-[#EADBCE] shadow-2xs flex gap-3 relative group"
              >
                {/* Item Thumbnail */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover border border-[#EADBCE] shrink-0 bg-slate-50"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-[#A21D32] p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Customization Details */}
                  {item.customization?.engravedText && (
                    <div className="mt-1 flex items-center gap-1 text-[10.5px] text-[#881337] bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-md font-mono">
                      <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">"{item.customization.engravedText}"</span>
                    </div>
                  )}

                  {/* Multi-recipient badge if bulk */}
                  {item.recipientList && item.recipientList.length > 0 && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
                      <Users className="w-3 h-3 text-blue-600" />
                      <span>{item.recipientList.length} Split Recipient Dispatches</span>
                    </div>
                  )}

                  {/* Price and Quantity modifier */}
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-sm text-slate-900">
                        ₹{item.unitPrice.toLocaleString('en-IN')}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-slate-400 ml-1">
                          x {item.quantity} = ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 text-xs rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 text-xs rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Pricing & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#EADBCE] bg-white space-y-3">
            
            {/* Coupon Code Section */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Coupon <strong>{appliedCoupon}</strong> (-₹{couponDiscount})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-700 hover:text-emerald-900 text-xs font-bold underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (FESTIVE15, WELCOME100)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs uppercase font-mono tracking-wider focus:outline-hidden focus:border-[#A21D32]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && (
              <p className="text-[11px] text-rose-600 pl-1">{couponError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900 font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {finalDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Royal Privilege Discount</span>
                  <span>-₹{finalDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Express Delivery</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                  ) : (
                    `₹${shippingCost}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Estimated GST (18% HSN calculated)</span>
                <span>₹{Math.round(estimatedGst).toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold">
                <span className="text-slate-900 text-sm">Grand Total (All Taxes Included)</span>
                <span className="font-serif text-xl text-[#2F0B10]">
                  ₹{Math.round(grandTotal).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 px-5 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#881337] to-[#A21D32] hover:from-[#3A0A11] hover:to-[#881337] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-950/20 border border-amber-300/30 transition-all transform active:scale-98 uppercase tracking-wider"
            >
              <span>Proceed to Royal Checkout</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> 256-bit SSL Protected
              </span>
              <span>•</span>
              <span>Complimentary Gift Packaging</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

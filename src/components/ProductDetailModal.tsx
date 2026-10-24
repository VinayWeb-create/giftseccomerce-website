import React, { useState } from 'react';
import { Product, CustomizationOption } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Sparkles,
  ShoppingBag,
  Building2,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Heart,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  Crown
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onOpenPersonalize: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenPersonalize
}) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    checkPincode,
    currentPincode,
    setCurrentPincode,
    setActiveModal,
    setSelectedProduct
  } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pinInput, setPinInput] = useState(currentPincode);
  const [pinResult, setPinResult] = useState<{ serviceable: boolean; message: string; city?: string; days?: number } | null>(
    () => checkPincode(currentPincode)
  );
  const [customizationData, setCustomizationData] = useState<CustomizationOption>({
    engravedText: 'Sneha & Rohan',
    fontFamily: 'Dancing Script',
    giftNote: 'Warm wishes on this joyful milestone celebration!',
    ribbonColor: 'Rose Gold Silk',
    boxWrapStyle: 'Blush Pink with Gold Foil'
  });

  const isWishlisted = wishlist.includes(product.id);

  // Calculate current unit price based on tiered bulk pricing
  const currentUnitPrice = (() => {
    if (product.bulkTiers && product.bulkTiers.length > 0) {
      for (const tier of [...product.bulkTiers].reverse()) {
        if (quantity >= tier.minQty) {
          return tier.pricePerUnit;
        }
      }
    }
    return product.basePrice;
  })();

  const subtotal = currentUnitPrice * quantity;

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkPincode(pinInput);
    setPinResult(res);
    if (res.serviceable) {
      setCurrentPincode(pinInput);
    }
  };

  const handleAddToCart = (isBuyNow = false) => {
    addToCart(
      product,
      quantity,
      product.isCustomizable ? customizationData : undefined,
      quantity > 10
    );
    if (isBuyNow) {
      onClose();
      setActiveModal('checkout');
    } else {
      onClose();
      setActiveModal('cart');
    }
  };

  const handleRequestQuote = () => {
    setSelectedProduct(product);
    onClose();
    setActiveModal('rfq');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-amber-300/40 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-slate-500 hover:text-slate-900 shadow-md flex items-center justify-center transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 p-6 bg-[#FAF5F2]/70 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EADBCE]">
            <div>
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-md border border-[#EADBCE] mb-4">
                <img
                  src={product.images[activeImgIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.badge && (
                    <span className="bg-[#2F0B10]/95 backdrop-blur-md text-amber-200 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider border border-amber-400/40 flex items-center gap-1 font-mono">
                      <Crown className="w-3 h-3 text-amber-300" />
                      <span>{product.badge}</span>
                    </span>
                  )}
                  {product.isCustomizable && (
                    <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Laser Custom Craft
                    </span>
                  )}
                </div>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center text-slate-600 hover:text-[#A21D32] transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#A21D32] text-[#A21D32]' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImgIndex === idx
                          ? 'border-[#A21D32] shadow-sm scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Origin & SKU Tag */}
            <div className="mt-4 pt-4 border-t border-[#EADBCE] flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#A21D32]" />
                SKU: {product.sku}
              </span>
              <span>Hub: {product.warehouseLocation}</span>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Options */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-bold text-[#A21D32] uppercase tracking-wider font-sans">
                  {product.category}
                </span>
                <span>/</span>
                <span>{product.subCategory || 'Royal Gifting'}</span>
              </div>

              {/* Title & Review Rating */}
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-600 italic mt-1">{product.tagline}</p>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md text-amber-900 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-slate-500 underline cursor-pointer">
                  {product.reviewsCount} verified reviews
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} units available)
                </span>
              </div>

              {/* Pricing Box */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-rose-50/60 via-[#FAF4EE] to-amber-50/60 border border-[#EADBCE] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-3xl text-[#2F0B10]">
                      ₹{currentUnitPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Save ₹{(product.mrp - currentUnitPrice).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    GST @ {product.taxRate}% included (HSN: {product.hsnCode})
                  </div>
                </div>

                {quantity > 1 && (
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Total ({quantity} units)</div>
                    <div className="font-serif font-bold text-lg text-slate-900">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                )}
              </div>

              {/* Bulk Tier Matrix */}
              {product.bulkTiers && product.bulkTiers.length > 0 && (
                <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-2">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-amber-700" />
                      Bulk Corporate Volume Discounts
                    </span>
                    <button
                      onClick={handleRequestQuote}
                      className="text-[11px] text-[#A21D32] hover:underline font-bold"
                    >
                      Need 100+ units? Request RFQ &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {product.bulkTiers.map((tier, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuantity(tier.minQty)}
                        className={`p-2 rounded-xl border transition-all ${
                          quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty)
                            ? 'bg-amber-100 border-amber-400 ring-1 ring-amber-400 font-bold text-amber-950'
                            : 'bg-white border-amber-200 text-slate-700 hover:bg-amber-50'
                        }`}
                      >
                        <div className="text-[10px] font-semibold text-slate-500">
                          {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} pcs` : `${tier.minQty}+ pcs`}
                        </div>
                        <div className="font-bold text-slate-900 font-serif">₹{tier.pricePerUnit}</div>
                        <div className="text-[9.5px] text-emerald-700 font-bold">{tier.discountPercentage}% OFF</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personalization Section */}
              {product.isCustomizable && (
                <div className="mt-4 p-3.5 rounded-2xl bg-white border border-[#EADBCE] shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        Laser Engraving & Hot-Foil Monogram
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Current Inscription: <strong className="text-[#881337]">"{customizationData.engravedText}"</strong> ({customizationData.fontFamily})
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenPersonalize(product)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#A21D32] border border-rose-200 text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <span>Customize</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Quantity & PIN Code Checker */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Select Quantity
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white shadow-2xs text-slate-700 font-bold flex items-center justify-center hover:bg-rose-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 text-center font-bold text-sm bg-transparent focus:outline-hidden"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-white shadow-2xs text-slate-700 font-bold flex items-center justify-center hover:bg-rose-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* PIN Code Checker */}
                <div className="flex-1 max-w-xs">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#A21D32]" />
                    Delivery PIN Code
                  </label>
                  <form onSubmit={handlePinCheck} className="flex gap-1.5">
                    <input
                      type="text"
                      maxLength={6}
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="e.g. 305001"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono font-medium focus:outline-hidden focus:ring-1 focus:ring-[#A21D32]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                    >
                      Verify
                    </button>
                  </form>
                </div>
              </div>

              {/* PIN Code Result */}
              {pinResult && (
                <div className={`mt-2 text-xs p-2.5 rounded-xl border flex items-start gap-2 ${
                  pinResult.serviceable
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>{pinResult.message}</div>
                </div>
              )}

              {/* Details & Specs */}
              <div className="mt-5 pt-4 border-t border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Product Details & Artisan Notes
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2">
                  {product.dimensions && <div>📐 <strong>Dimensions:</strong> {product.dimensions}</div>}
                  {product.weight && <div>⚖️ <strong>Weight:</strong> {product.weight}</div>}
                  <div>🛡️ <strong>Guarantee:</strong> 7-day transit damage replacement</div>
                  <div>🎁 <strong>Packaging:</strong> Premium rigid keepsake box included</div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap sm:flex-nowrap gap-3">
              <button
                type="button"
                onClick={() => handleAddToCart(false)}
                className="flex-1 py-3.5 px-5 rounded-full border-2 border-[#A21D32] text-[#A21D32] hover:bg-rose-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                className="flex-1 py-3.5 px-5 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#881337] to-[#A21D32] hover:from-[#3A0A11] hover:to-[#881337] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-950/20"
              >
                <span>Instant Royal Checkout</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

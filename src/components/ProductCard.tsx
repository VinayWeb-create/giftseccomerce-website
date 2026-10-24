import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Star,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Clock,
  Building2,
  Crown,
  Eye
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onOpenPersonalize: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onOpenPersonalize
}) => {
  const { wishlist, toggleWishlist, addToCart, mode } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = Math.round(
    ((product.mrp - product.basePrice) / product.mrp) * 100
  );

  return (
    <div className="group relative rounded-3xl bg-white border border-[#EADBCE] shadow-[0_4px_20px_rgba(70,25,32,0.03)] hover:shadow-[0_16px_36px_rgba(70,25,32,0.08)] hover:border-amber-400/80 transition-all duration-500 flex flex-col justify-between overflow-hidden">
      
      {/* Top Image Container */}
      <div 
        className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-[#FAF5F2] cursor-pointer"
        onClick={() => onOpenDetail(product)}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Subtle vignette gradient for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {product.badge && (
            <span className="bg-[#2F0B10]/95 backdrop-blur-md text-amber-200 text-[9.5px] font-bold px-2.5 py-1 rounded-md shadow-xs uppercase tracking-widest border border-amber-400/30 flex items-center gap-1 font-mono">
              <Crown className="w-2.5 h-2.5 text-amber-300" />
              <span>{product.badge}</span>
            </span>
          )}
          {product.isCustomizable && (
            <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[9.5px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Laser Engraved</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-slate-500 hover:text-[#A21D32] shadow-md transition-all z-10 transform active:scale-90"
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isWishlisted ? 'fill-[#A21D32] text-[#A21D32] scale-110' : ''
            }`}
          />
        </button>

        {/* Hover Quick Action: View & Customise Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-xl border border-rose-100 flex items-center justify-between gap-1 text-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(product);
              }}
              className="flex-1 py-1.5 px-2 rounded-xl text-slate-800 font-semibold hover:bg-rose-50 flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5 text-[#A21D32]" />
              <span>Quick View</span>
            </button>
            {product.isCustomizable && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPersonalize(product);
                }}
                className="flex-1 py-1.5 px-2 rounded-xl bg-gradient-to-r from-[#881337] to-[#A21D32] text-white font-semibold flex items-center justify-center gap-1 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Personalize</span>
              </button>
            )}
          </div>
        </div>

        {/* Savings Tag */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 bg-emerald-700/90 backdrop-blur-xs text-white text-[9.5px] font-bold px-2 py-0.5 rounded-md shadow-xs group-hover:opacity-0 transition-opacity">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-bold text-[#A21D32] text-[10px] uppercase tracking-widest font-sans">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-200/60 px-1.5 py-0.5 rounded text-amber-800 font-bold text-[10.5px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="font-serif font-bold text-sm sm:text-base text-slate-900 line-clamp-1 hover:text-[#A21D32] cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* Subtitle / Tagline */}
          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 italic">
            {product.tagline}
          </p>

          {/* Bulk Tier Hint (if in B2B or product has tiers) */}
          {product.bulkTiers && product.bulkTiers.length > 0 && (
            <div className="mt-2 text-[10.5px] text-slate-700 bg-amber-50/50 border border-amber-200/60 rounded-xl px-2.5 py-1 flex items-center justify-between">
              <span className="flex items-center gap-1 text-[#2F0B10] font-semibold">
                <Building2 className="w-3 h-3 text-amber-700" />
                <span>Bulk Corporate:</span>
              </span>
              <span className="font-bold text-[#A21D32]">
                From ₹{product.bulkTiers[product.bulkTiers.length - 1].pricePerUnit}/pc
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Add Button */}
        <div className="pt-3 border-t border-[#F2E5DD] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-lg text-slate-900">
                ₹{product.basePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-[9.5px] text-slate-500 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-slate-400" />
              <span>Ships in {product.estimatedDispatchDays} {product.estimatedDispatchDays === 1 ? 'day' : 'days'}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="p-2.5 rounded-full bg-gradient-to-r from-[#D1395E] to-[#B31D45] hover:from-[#B31D45] hover:to-[#911335] text-white shadow-md shadow-rose-950/20 transition-all transform active:scale-90"
              title="Add to Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

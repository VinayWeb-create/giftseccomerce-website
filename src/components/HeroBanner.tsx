import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Lock,
  RefreshCw,
  Award,
  Crown,
  Gift,
  CheckCircle2,
  Sliders,
  Compass,
  Star,
  Cake,
  Heart,
  Briefcase,
  Users
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setMode, setActiveCategory, setActiveOccasion } = useApp();

  const [conciergeRecipient, setConciergeRecipient] = useState<string>('All');
  const [conciergeOccasion, setConciergeOccasion] = useState<string>('Anniversary');

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOccasionClick = (occ: string) => {
    setActiveOccasion(occ);
    scrollToCatalog();
  };

  const handleCategoryClick = (catKey: string) => {
    setActiveCategory(catKey);
    scrollToCatalog();
  };

  const handleConciergeSubmit = () => {
    if (conciergeOccasion !== 'All') {
      setActiveOccasion(conciergeOccasion);
    }
    scrollToCatalog();
  };

  // 6 Curated Categories matching the uploaded mockup
  const categories = [
    {
      title: 'PERSONALIZED GIFTS',
      subtitle: 'Make it truly theirs',
      categoryKey: 'Personalized Gifts',
      image: '/assets/categories/personalized.jpg',
    },
    {
      title: 'HOME DECOR',
      subtitle: 'Beautify your happy space',
      categoryKey: 'Home Decor',
      image: '/assets/categories/homedecor.jpg',
    },
    {
      title: 'SOFT TOYS',
      subtitle: 'Hugs that last forever',
      categoryKey: 'Soft Toys',
      image: '/assets/categories/softtoys.jpg',
    },
    {
      title: 'LUXURY ACCESSORIES',
      subtitle: 'Style in every detail',
      categoryKey: 'Luxury Gifts',
      image: '/assets/categories/accessories.jpg',
    },
    {
      title: 'GIFT HAMPERS',
      subtitle: 'Curated with love',
      categoryKey: 'Gift Hampers',
      image: '/assets/categories/hampers.jpg',
    },
    {
      title: 'STATIONERY ESSENTIALS',
      subtitle: 'For work & creative joy',
      categoryKey: 'Stationery & Desk',
      image: '/assets/categories/stationery.jpg',
    }
  ];

  // "Perfect For" occasions for the right floating widget
  const perfectForOccasions = [
    { name: 'Birthdays', occasionKey: 'Birthday', icon: '🎂' },
    { name: 'Anniversaries', occasionKey: 'Anniversary', icon: '💍' },
    { name: 'Weddings', occasionKey: 'Wedding', icon: '💒' },
    { name: 'Return Gifts', occasionKey: 'Corporate', icon: '🎁' },
    { name: 'Corporate Gifts', occasionKey: 'Corporate', icon: '💼' },
    { name: '& More', occasionKey: 'All', icon: '✨' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAF4EF] pt-4 pb-0">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* 1. MAIN HERO BANNER - Exact composition matching mockup   */}
        {/* ========================================================= */}
        <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(70,25,32,0.07)] border border-[#EADBCE] bg-[#FAF3EE] min-h-[500px] lg:min-h-[560px] flex items-center mb-8">
          
          {/* High-Resolution Clean Background Scene (Generated specifically without AI typos) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/luxury_gift_hero_bg.jpg"
              alt="Ajmer Gift Charm Luxury Still Life"
              className="w-full h-full object-cover object-center lg:object-right transform scale-100 hover:scale-[1.01] transition-transform duration-1000"
            />
            
            {/* Elegant multi-stop gradient overlays to guarantee pristine contrast on left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF4EF] via-[#FAF4EF]/90 via-45% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF4EF]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Hero Content Container */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Fortune 500 High-End Copy & Actions */}
              <div className="lg:col-span-7 xl:col-span-6 space-y-5 max-w-xl">
                
                {/* Eyebrow Pill matching mockup: "♥ MAKE EVERY MOMENT ♥" */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50/90 border border-rose-200/80 backdrop-blur-xs text-[#D1395E] text-[11px] font-black uppercase tracking-[0.25em]">
                  <span>♥</span>
                  <span>MAKE EVERY MOMENT</span>
                  <span>♥</span>
                </div>

                {/* Master Title: "Special" (Serif) + "with Gifts" (Luxury Script) */}
                <div className="space-y-0 leading-none">
                  <h1 className="font-serif font-black text-5xl sm:text-6xl lg:text-7xl text-[#2F0B10] tracking-tight drop-shadow-2xs">
                    Special
                  </h1>
                  <div className="font-script text-[#D1395E] text-6xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] pt-1 pl-2 filter drop-shadow-xs">
                    with Gifts
                  </div>
                </div>

                {/* Refined Fortune 500 Copywriting (Free of unwanted AI typos) */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans max-w-md pt-1">
                  Discover unique, thoughtful &amp; premium gifts for every occasion. Because every gift tells a beautiful story.
                </p>

                {/* CTA Row with Pill Button and Circular Seal */}
                <div className="flex flex-wrap items-center gap-5 pt-3">
                  
                  {/* Shop Collection Pill Button matching mockup */}
                  <button
                    onClick={scrollToCatalog}
                    className="group bg-gradient-to-r from-[#D1395E] via-[#C52B52] to-[#B31D45] hover:from-[#B31D45] hover:to-[#911335] text-white font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-full shadow-lg shadow-rose-900/25 flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>SHOP COLLECTION</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Circular "NEW ARRIVALS - SHOP NOW" Luxury Badge matching mockup */}
                  <div 
                    onClick={scrollToCatalog}
                    className="cursor-pointer relative w-20 h-20 rounded-full border-2 border-dashed border-[#D1395E]/60 bg-white/90 backdrop-blur-xs shadow-md flex flex-col items-center justify-center text-center p-1 transform hover:scale-105 hover:rotate-6 transition-all duration-300 group"
                  >
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#2F0B10] leading-tight">
                      NEW
                    </span>
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#2F0B10] leading-tight">
                      ARRIVALS
                    </span>
                    <span className="text-[7.5px] font-bold text-[#D1395E] uppercase tracking-widest mt-0.5">
                      SHOP NOW
                    </span>
                    <span className="text-[9px] text-[#D1395E] leading-none mt-0.5">
                      ♥
                    </span>
                  </div>

                </div>

              </div>

              {/* Center Spacer */}
              <div className="hidden lg:block lg:col-span-1 xl:col-span-2" />

              {/* Right Column: Floating "PERFECT FOR" Card matching uploaded mockup */}
              <div className="lg:col-span-4 xl:col-span-4 flex justify-end">
                <div className="w-full max-w-[240px] rounded-2xl bg-white/95 backdrop-blur-md border border-[#EADBCE] shadow-2xl shadow-rose-950/10 overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Card Header: "♥ PERFECT FOR ♥" in pink */}
                  <div className="bg-[#FAF2EC] border-b border-[#F0DFD7] py-2.5 px-4 text-center">
                    <span className="text-xs font-black tracking-[0.2em] text-[#D1395E] uppercase flex items-center justify-center gap-1.5">
                      <span>♥</span>
                      <span>PERFECT FOR</span>
                      <span>♥</span>
                    </span>
                  </div>

                  {/* Occasions List */}
                  <div className="divide-y divide-rose-50/70 p-1">
                    {perfectForOccasions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOccasionClick(item.occasionKey)}
                        className="w-full px-3.5 py-2.5 text-left flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#D1395E] hover:bg-rose-50/60 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                          <span className="font-sans font-medium text-[12.5px]">
                            {item.name}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#D1395E] transition-all" />
                      </button>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 2. 6 CATEGORIES STRIP - Exact layout from uploaded image  */}
        {/* ========================================================= */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.categoryKey)}
                className="group relative flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#EADBCE] shadow-xs hover:shadow-xl hover:border-[#D1395E]/50 transition-all duration-300 transform hover:-translate-y-1 focus:outline-hidden"
              >
                {/* Product/Category Photography on Soft Warm Backdrop */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#FAF4EF] mb-2.5">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                
                {/* Category Title in Bold Uppercase */}
                <h3 className="font-serif font-bold text-[11px] sm:text-xs text-slate-900 group-hover:text-[#D1395E] transition-colors uppercase tracking-tight leading-snug">
                  {cat.title}
                </h3>
                
                {/* Category Subtitle in Script / Italic style */}
                <p className="text-[10px] sm:text-[11px] text-[#8C6D68] italic font-serif mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. 5 TRUST ASSURANCE PILLARS - Matching uploaded mockup   */}
        {/* ========================================================= */}
        <div className="rounded-2xl bg-white border border-[#EADBCE] p-4 sm:p-5 shadow-xs mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#F0E4DE]">
            
            {/* Pillar 1: Premium Quality */}
            <div className="flex items-center gap-3 px-2 pt-2 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D1395E] border border-rose-200/80 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                  PREMIUM
                </div>
                <div className="text-[10px] font-bold text-[#8C6D68] uppercase tracking-wider">
                  QUALITY PRODUCTS
                </div>
              </div>
            </div>

            {/* Pillar 2: Carefully Handpicked */}
            <div className="flex items-center gap-3 px-2 pt-2 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D1395E] border border-rose-200/80 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                  CAREFULLY
                </div>
                <div className="text-[10px] font-bold text-[#8C6D68] uppercase tracking-wider">
                  HANDPICKED
                </div>
              </div>
            </div>

            {/* Pillar 3: Safe & Secure Payments */}
            <div className="flex items-center gap-3 px-2 pt-2 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D1395E] border border-rose-200/80 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                  SAFE &amp; SECURE
                </div>
                <div className="text-[10px] font-bold text-[#8C6D68] uppercase tracking-wider">
                  PAYMENTS
                </div>
              </div>
            </div>

            {/* Pillar 4: Easy Returns */}
            <div className="flex items-center gap-3 px-2 pt-2 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D1395E] border border-rose-200/80 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                  EASY RETURNS
                </div>
                <div className="text-[10px] font-bold text-[#8C6D68] uppercase tracking-wider">
                  HASSLE FREE
                </div>
              </div>
            </div>

            {/* Pillar 5: 100% Customer Satisfaction */}
            <div className="flex items-center gap-3 px-2 pt-2 md:pt-0 col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D1395E] border border-rose-200/80 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                  100% CUSTOMER
                </div>
                <div className="text-[10px] font-bold text-[#8C6D68] uppercase tracking-wider">
                  SATISFACTION
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. SIGNATURE BRAND RIBBON - Pink bar matching bottom      */}
      {/* ========================================================= */}
      <div className="w-full bg-[#D1395E] text-white py-2.5 px-4 shadow-sm border-y border-[#B31D45]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs tracking-wider uppercase font-bold">
          
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-200" />
            <span>GIFT MORE, WORRY LESS ♡</span>
          </div>

          <div className="font-serif tracking-[0.25em] text-sm font-black text-amber-100">
            AJMERGIFTCHARM.COM
          </div>

          <div className="flex items-center gap-2 text-rose-100">
            <span>♡ BECAUSE MEMORIES DESERVE THE BEST ♡</span>
          </div>

        </div>
      </div>

    </section>
  );
};

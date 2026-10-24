import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, BulkRecipient, CorporateQuotation } from '../../types';
import {
  Building2,
  FileSpreadsheet,
  Download,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Truck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Layers,
  ChevronRight,
  Send,
  DollarSign
} from 'lucide-react';

export const CorporatePortal: React.FC = () => {
  const {
    products,
    organization,
    updateOrganization,
    quotations,
    createQuotation,
    updateQuotationStatus,
    orders,
    addToCart,
    setActiveModal,
    setSelectedQuotation,
    showToast,
    checkPincode
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'bulk_order' | 'recipients' | 'rfqs' | 'onboarding'>('overview');

  // Bulk Product Builder State
  const [selectedProductId, setSelectedProductId] = useState<string>(products[4]?.id || products[0]?.id);
  const [bulkQty, setBulkQty] = useState<number>(50);
  const [companyLogoUrl, setCompanyLogoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'
  );
  const [engravedNote, setEngravedNote] = useState<string>('Welcome to the NovaTech Family');

  // Multi-recipient state
  const [recipients, setRecipients] = useState<BulkRecipient[]>([
    {
      id: 'rec-1',
      name: 'Rohan Sharma',
      email: 'rohan.s@novatech.co.in',
      phone: '+91 98201 11223',
      address: 'Flat 301, Palm Grove, Powai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400076',
      department: 'Engineering',
      customGiftNote: 'Keep shining in Q4!'
    },
    {
      id: 'rec-2',
      name: 'Priyanka Verma',
      email: 'priyanka.v@novatech.co.in',
      phone: '+91 98110 33445',
      address: 'B-12, Green Park Extension',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      department: 'Product',
      customGiftNote: 'Welcome aboard Priyanka!'
    },
    {
      id: 'rec-3',
      name: 'Karthik Ramanathan',
      email: 'karthik.r@novatech.co.in',
      phone: '+91 98450 77889',
      address: 'Plot 45, Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      department: 'Design',
      customGiftNote: 'Congratulations on 3 years at NovaTech!'
    }
  ]);

  // New recipient form row
  const [newRec, setNewRec] = useState<Partial<BulkRecipient>>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    customGiftNote: ''
  });

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Calculate bulk price
  const calculateTierPrice = (prod: Product, qty: number) => {
    if (prod.bulkTiers && prod.bulkTiers.length > 0) {
      for (const tier of [...prod.bulkTiers].reverse()) {
        if (qty >= tier.minQty) {
          return tier.pricePerUnit;
        }
      }
    }
    return prod.basePrice;
  };

  const unitBulkPrice = calculateTierPrice(selectedProduct, bulkQty);
  const bulkSubtotal = unitBulkPrice * bulkQty;
  const bulkTax = Math.round(bulkSubtotal * 0.18);
  const bulkTotal = bulkSubtotal + bulkTax;

  // Add recipient to table
  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRec.name || !newRec.pincode || !newRec.address) {
      showToast('Please fill required recipient fields', 'error');
      return;
    }
    const pinVerification = checkPincode(newRec.pincode);
    if (!pinVerification.serviceable) {
      showToast(pinVerification.message, 'error');
      return;
    }

    const recItem: BulkRecipient = {
      id: `rec-${Date.now()}`,
      name: newRec.name || 'Recipient',
      email: newRec.email || '',
      phone: newRec.phone || '+91 98000 00000',
      address: newRec.address || '',
      city: newRec.city || pinVerification.city || 'City',
      state: newRec.state || pinVerification.state || 'State',
      pincode: newRec.pincode || '305001',
      department: newRec.department || 'Corporate',
      customGiftNote: newRec.customGiftNote || 'Best wishes from the leadership team!'
    };

    setRecipients(prev => [...prev, recItem]);
    setNewRec({ name: '', phone: '', address: '', city: '', state: '', pincode: '', customGiftNote: '' });
    showToast(`Added ${recItem.name} to bulk dispatch list!`);
  };

  // Add 10 dummy employees with 1 click
  const handleLoadSampleRecipients = () => {
    const samples: BulkRecipient[] = [
      { id: `rec-s1`, name: 'Aarav Mehta', phone: '+91 98200 44551', address: 'Flat 12, Malabar Hill', city: 'Mumbai', state: 'Maharashtra', pincode: '400006', department: 'Sales', customGiftNote: 'Outstanding sales milestone!' },
      { id: `rec-s2`, name: 'Sunita Rao', phone: '+91 98451 99221', address: 'Villa 4, Palm Meadows, Whitefield', city: 'Bengaluru', state: 'Karnataka', pincode: '560066', department: 'HR', customGiftNote: 'Thank you for your dedication' },
      { id: `rec-s3`, name: 'Kabir Kapoor', phone: '+91 98110 88223', address: 'House 88, Sector 15', city: 'Gurugram', state: 'Haryana', pincode: '122001', department: 'Tech', customGiftNote: 'Happy Work Anniversary' },
      { id: `rec-s4`, name: 'Megha Iyer', phone: '+91 98300 22334', address: 'Salt Lake Sector V', city: 'Kolkata', state: 'West Bengal', pincode: '700091', department: 'Finance', customGiftNote: 'Great quarter results!' }
    ];
    setRecipients(prev => [...prev, ...samples]);
    showToast('Imported 4 verified employee addresses from CSV template!');
  };

  // Dispatch configured bulk order to Cart
  const handleSendBulkOrderToCart = () => {
    addToCart(
      selectedProduct,
      bulkQty,
      {
        engravedText: engravedNote,
        companyLogoUrl: companyLogoUrl,
        boxWrapStyle: 'Corporate Rigid Matte Box'
      },
      true,
      recipients.length > 0 ? recipients : undefined
    );
    setActiveModal('cart');
  };

  // Request Quotation (RFQ)
  const handleGenerateRFQ = () => {
    createQuotation({
      companyName: organization.companyName,
      contactPerson: organization.contactPerson,
      email: organization.businessEmail,
      phone: organization.phone,
      gstin: organization.gstin,
      items: [
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          quantity: bulkQty,
          unitPrice: unitBulkPrice,
          total: bulkSubtotal,
          customizationNote: `Custom logo printed on top lid. Engraved note: "${engravedNote}". Direct split dispatch across ${recipients.length} addresses.`
        }
      ],
      subtotal: bulkSubtotal,
      negotiatedDiscountPercent: 5,
      taxAmount: bulkTax,
      shippingAmount: 0,
      grandTotal: bulkTotal,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Sent for Review',
      notes: `Target Delivery: Festive 2026. Packaging: Custom branded satin ribbons.`,
      paymentTerms: '50% Advance + 50% on Dispatch'
    });
    setActiveTab('rfqs');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Corporate Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-rose-500 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold uppercase tracking-wider">
                Corporate Gifting Portal
              </span>
              <span className="text-xs text-rose-300">GSTIN: {organization.gstin}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              {organization.companyName}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Manage bulk employee onboarding kits, festival hampers, client appreciation gifts, multi-address recipient dispatch, and formal GST quotations.
            </p>
          </div>

          {/* Quick Credit Status Pill */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs space-y-1 sm:min-w-[240px]">
            <div className="flex justify-between text-slate-300">
              <span>Credit Facility (Net 30):</span>
              <span className="font-bold text-emerald-400">ACTIVE</span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>Credit Limit:</span>
              <strong className="text-white">₹{organization.creditLimit.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>Available Credit:</span>
              <strong className="text-emerald-300">
                ₹{(organization.creditLimit - organization.creditUsed).toLocaleString('en-IN')}
              </strong>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${(organization.creditUsed / organization.creditLimit) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Corporate Sub Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('bulk_order')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'bulk_order'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4 text-rose-600" />
            <span>Bulk Order & Pricing Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('recipients')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'recipients'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>Multi-Address Dispatch ({recipients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rfqs')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'rfqs'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Quotations & POs ({quotations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('onboarding')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'onboarding'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>GST & Company Profile</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="text-xs font-semibold text-slate-500">Corporate Orders Placed</div>
              <div className="text-2xl font-serif font-bold text-slate-900 mt-1">
                {orders.filter(o => o.type === 'B2B').length} Orders
              </div>
              <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All GST input invoices generated
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="text-xs font-semibold text-slate-500">Active Quotations</div>
              <div className="text-2xl font-serif font-bold text-slate-900 mt-1">
                {quotations.length} RFQs
              </div>
              <div className="text-[11px] text-amber-700 mt-1">
                Valid for 30 business days
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="text-xs font-semibold text-slate-500">Total Gift Dispatches</div>
              <div className="text-2xl font-serif font-bold text-slate-900 mt-1">
                68 Employees
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Across 18 tier-1/tier-2 cities</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="text-xs font-semibold text-slate-500">Dedicated Account Manager</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Vikram Sharma (Ajmer HQ)</div>
              <div className="text-[11px] text-rose-700 font-semibold mt-1">
                Direct: +91 98290 84721
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-amber-900 uppercase bg-amber-100 px-2 py-0.5 rounded-full">
                  Fast-Track Fulfillment
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-2">
                  Build Custom Bulk Hampers with Tiered Pricing
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Select products, customize with company logo, choose rigid box styles, and enjoy tiered volume discounts up to 35%.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('bulk_order')}
                className="mt-5 w-fit px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-2 shadow-xs"
              >
                <span>Launch Bulk Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-blue-900 uppercase bg-blue-100 px-2 py-0.5 rounded-full">
                  Spreadsheet Import
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-2">
                  Multi-Address Recipient Split Logistics
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Distribute 50 to 5,000 gifts directly to individual employee home doorsteps or regional branches with consolidated tracking.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('recipients')}
                className="mt-5 w-fit px-5 py-2.5 rounded-full bg-blue-800 text-white text-xs font-semibold hover:bg-blue-900 flex items-center gap-2 shadow-xs"
              >
                <span>Manage Recipient List</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BULK ORDER & PRICING CALCULATOR */}
      {activeTab === 'bulk_order' && (
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Corporate Bulk Gifting & Tiered Pricing Builder
            </h2>
            <p className="text-xs text-slate-500">
              Configure products, custom corporate branding, and receive immediate volume-discounted quotations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Product Choice & Quantity */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Gifting Product / Kit
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProductId(p.id)}
                      className={`p-3 rounded-2xl border text-left flex gap-3 transition-all ${
                        selectedProductId === p.id
                          ? 'border-rose-600 bg-rose-50/50 ring-2 ring-rose-500'
                          : 'border-slate-200 hover:border-rose-200'
                      }`}
                    >
                      <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                        <div className="text-[11px] text-slate-500">{p.category}</div>
                        <div className="text-xs font-serif font-bold text-rose-900 mt-1">
                          Base: ₹{p.basePrice}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Select Quantity: <span className="text-rose-700 text-sm font-bold font-mono">{bulkQty} Units</span>
                  </label>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Tier Unit Price: ₹{unitBulkPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={bulkQty}
                  onChange={(e) => setBulkQty(parseInt(e.target.value))}
                  className="w-full accent-rose-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>10 units (15% off)</span>
                  <span>50 units (25% off)</span>
                  <span>100 units (30% off)</span>
                  <span>200+ units (35% off)</span>
                </div>
              </div>

              {/* Custom Corporate Branding */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Corporate Customization & Note
                </label>
                
                <div>
                  <span className="text-xs text-slate-600 block mb-1">Company Laser Engraving / Tagline</span>
                  <input
                    type="text"
                    value={engravedNote}
                    onChange={(e) => setEngravedNote(e.target.value)}
                    placeholder="e.g. Welcome to NovaTech Team"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <span className="text-xs text-slate-600 block mb-1">Company Logo URL / Asset</span>
                  <input
                    type="text"
                    value={companyLogoUrl}
                    onChange={(e) => setCompanyLogoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono text-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Right: Live Quotation Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#FFFDFB] to-rose-50/50 p-6 rounded-3xl border border-rose-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-rose-200 pb-3 mb-4">
                  <div className="text-sm font-serif font-bold text-slate-900">
                    Live Commercial Summary
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                    PRE-APPROVED
                  </span>
                </div>

                {/* Preview Image with mock overlay */}
                <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-white shadow-xs mb-4">
                  <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-center shadow-lg border border-white/50">
                      <div className="text-xs font-bold text-slate-900 font-mono">{organization.companyName}</div>
                      <div className="text-[11px] text-rose-700 italic font-serif">"{engravedNote}"</div>
                    </div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Selected Product:</span>
                    <strong className="text-slate-900">{selectedProduct.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <strong>{bulkQty} units</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Negotiated Unit Price:</span>
                    <strong className="text-rose-900">₹{unitBulkPrice} <span className="text-slate-400 line-through">₹{selectedProduct.mrp}</span></strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{bulkSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18% ITC Eligible):</span>
                    <span>₹{bulkTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Shipping (Consolidated / Split):</span>
                    <strong>FREE (Pan-India)</strong>
                  </div>

                  <div className="pt-3 border-t border-rose-200 flex justify-between items-baseline font-bold text-base">
                    <span className="text-slate-900">Total Commercial Value:</span>
                    <span className="font-serif text-2xl text-rose-950">₹{bulkTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-rose-200 space-y-2.5">
                <button
                  type="button"
                  onClick={handleSendBulkOrderToCart}
                  className="w-full py-3 rounded-full bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {bulkQty} Units to Cart & Checkout</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateRFQ}
                  className="w-full py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Generate Formal RFQ Quotation</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RECIPIENTS LOGISTICS */}
      {activeTab === 'recipients' && (
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Multi-Address Recipient Split Logistics
              </h2>
              <p className="text-xs text-slate-500">
                Upload recipient lists, validate Indian PIN codes, and dispatch individual gifts with custom notes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSampleRecipients}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Import Sample CSV</span>
              </button>
            </div>
          </div>

          {/* Quick Add Row */}
          <form onSubmit={handleAddRecipient} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-rose-600" />
              Add Single Recipient Dispatch
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Recipient Full Name *"
                value={newRec.name || ''}
                onChange={(e) => setNewRec({ ...newRec, name: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden"
              />
              <input
                type="text"
                placeholder="Phone (Mobile) *"
                value={newRec.phone || ''}
                onChange={(e) => setNewRec({ ...newRec, phone: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden"
              />
              <input
                type="text"
                placeholder="6-Digit PIN Code *"
                maxLength={6}
                value={newRec.pincode || ''}
                onChange={(e) => setNewRec({ ...newRec, pincode: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:outline-hidden"
              />
              <input
                type="text"
                placeholder="Department (e.g. Sales)"
                value={newRec.department || ''}
                onChange={(e) => setNewRec({ ...newRec, department: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Street Address / Society *"
                value={newRec.address || ''}
                onChange={(e) => setNewRec({ ...newRec, address: e.target.value })}
                className="sm:col-span-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden"
              />
              <input
                type="text"
                placeholder="Custom Gift Note for this recipient"
                value={newRec.customGiftNote || ''}
                onChange={(e) => setNewRec({ ...newRec, customGiftNote: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save to Dispatch Roster</span>
              </button>
            </div>
          </form>

          {/* Recipients Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Recipient Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">City / State</th>
                  <th className="p-3">PIN Code</th>
                  <th className="p-3">Personal Message</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recipients.map((rec, idx) => (
                  <tr key={rec.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-semibold text-slate-900">
                      <div>{rec.name}</div>
                      <div className="text-[10px] text-slate-400">{rec.phone}</div>
                    </td>
                    <td className="p-3">{rec.department || 'General'}</td>
                    <td className="p-3">
                      <div>{rec.city}, {rec.state}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">{rec.address}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-800">{rec.pincode}</td>
                    <td className="p-3 italic text-slate-600 max-w-xs truncate">
                      "{rec.customGiftNote || 'Best wishes'}"
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setRecipients(prev => prev.filter(r => r.id !== rec.id))}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove recipient"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: RFQs & PURCHASE ORDERS */}
      {activeTab === 'rfqs' && (
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Corporate Quotations & Purchase Orders
            </h2>
            <p className="text-xs text-slate-500">
              Review formal GST quotes, accept terms, download PDF quotations, and convert to production purchase orders.
            </p>
          </div>

          <div className="space-y-4">
            {quotations.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-rose-100 bg-[#FFFDFB] shadow-2xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">{q.rfqNumber}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        q.status === 'Customer Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.status === 'Sent for Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {q.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Created on: {q.createdAt} | Valid Until: <strong>{q.validUntil}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-500">Total Quotation Value</div>
                    <div className="font-serif font-bold text-xl text-rose-950">
                      ₹{q.grandTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Items in Quotation */}
                <div className="space-y-2">
                  {q.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-50">
                      <div>
                        <div className="font-bold text-slate-900">{item.productName}</div>
                        <div className="text-[11px] text-slate-500">{item.customizationNote}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.quantity} pcs @ ₹{item.unitPrice}</div>
                        <div className="text-slate-500 text-[11px]">Total: ₹{item.total.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Terms and Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
                  <div className="text-slate-600">
                    <span>Payment Terms: </span>
                    <strong className="text-slate-800">{q.paymentTerms}</strong>
                    <span className="text-slate-400 ml-2">| Tax Rate: 18% IGST included</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedQuotation(q);
                        setActiveModal('invoice_view');
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-rose-600" />
                      <span>Print Official GST Quote</span>
                    </button>

                    {q.status !== 'Customer Accepted' && (
                      <button
                        onClick={() => updateQuotationStatus(q.id, 'Customer Accepted')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept Quote & Issue PO</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ONBOARDING & GST PROFILE */}
      {activeTab === 'onboarding' && (
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Corporate Entity & GST Profile
            </h2>
            <p className="text-xs text-slate-500">
              Registered business details for automated Tax Invoicing, Purchase Orders, and Net 30 Credit approval.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Legal Name</label>
              <input
                type="text"
                value={organization.companyName}
                onChange={(e) => updateOrganization({ companyName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={organization.gstin}
                onChange={(e) => updateOrganization({ gstin: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Procurement Email</label>
              <input
                type="email"
                value={organization.businessEmail}
                onChange={(e) => updateOrganization({ businessEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={organization.phone}
                onChange={(e) => updateOrganization({ phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector</label>
              <input
                type="text"
                value={organization.industry}
                onChange={(e) => updateOrganization({ industry: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Annual Gifting Budget</label>
              <input
                type="text"
                value={organization.annualBudget}
                onChange={(e) => updateOrganization({ annualBudget: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

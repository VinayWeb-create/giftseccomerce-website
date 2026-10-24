import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Order, SupportTicket } from '../../types';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Building2,
  FileText,
  AlertTriangle,
  Plus,
  Truck,
  CheckCircle2,
  Search,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Warehouse,
  ShieldAlert,
  Printer
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    quotations,
    updateQuotationStatus,
    tickets,
    addTicketReply,
    setSelectedOrder,
    setActiveModal,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'orders' | 'inventory' | 'quotations' | 'tickets'>('overview');
  
  // New Product Modal Form State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Personalized Gifts');
  const [newProdBasePrice, setNewProdBasePrice] = useState(1499);
  const [newProdMrp, setNewProdMrp] = useState(2199);
  const [newProdStock, setNewProdStock] = useState(100);
  const [newProdWarehouse, setNewProdWarehouse] = useState('Ajmer Central Warehouse');
  const [newProdSku, setNewProdSku] = useState('AJM-NEW-101');
  const [newProdTagline, setNewProdTagline] = useState('Artisanal personalized gift handcrafted in Ajmer');
  const [newProdImage, setNewProdImage] = useState(
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
  );

  // Financial calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.grandTotal, 0);
  const b2bRevenue = orders.filter(o => o.type === 'B2B').reduce((acc, o) => acc + o.grandTotal, 0);
  const b2cRevenue = orders.filter(o => o.type === 'B2C').reduce((acc, o) => acc + o.grandTotal, 0);
  const totalItemsSold = orders.reduce((acc, o) => acc + o.items.reduce((ia, i) => ia + i.quantity, 0), 0);
  const lowStockProducts = products.filter(p => p.stock < 100);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      name: newProdName,
      tagline: newProdTagline,
      description: 'Handcrafted luxury gift with premium laser engraving or packaging.',
      category: newProdCategory,
      occasion: ['Festival', 'Corporate', 'Anniversary'],
      recipient: ['Colleague', 'Friends', 'Family'],
      basePrice: newProdBasePrice,
      mrp: newProdMrp,
      hsnCode: '69120010',
      taxRate: 18,
      rating: 5.0,
      reviewsCount: 1,
      images: [newProdImage],
      isCustomizable: true,
      customizationType: 'engraving',
      stock: newProdStock,
      sku: newProdSku,
      warehouseLocation: newProdWarehouse,
      estimatedDispatchDays: 1,
      badge: 'New Arrival'
    });

    setShowAddProductModal(false);
    setNewProdName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-mono font-bold uppercase">
              Operations Control Center
            </span>
            <span className="text-xs text-slate-400">Ajmer Central Gifting Hub</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-900 mt-1">
            Store & Warehouse Administration
          </h1>
        </div>

        <button
          onClick={() => setShowAddProductModal(true)}
          className="px-4 py-2.5 rounded-full bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-rose-200 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product to Catalog</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeAdminTab === 'overview'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Revenue & KPIs</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeAdminTab === 'orders'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Order Fulfillment ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('inventory')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeAdminTab === 'inventory'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Warehouse className="w-4 h-4" />
          <span>Inventory & Warehouses ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('quotations')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeAdminTab === 'quotations'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Corporate RFQ Review ({quotations.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('tickets')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeAdminTab === 'tickets'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Support Desk ({tickets.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Total Gross Sales</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-serif font-bold text-slate-900 mt-2">
                ₹{totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                B2B: ₹{b2bRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })} | B2C: ₹{b2cRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Total Orders</span>
                <Package className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-serif font-bold text-slate-900 mt-2">
                {orders.length} Dispatches
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">
                {totalItemsSold} gift units processed
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Pending RFQ Inquiries</span>
                <Building2 className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-serif font-bold text-slate-900 mt-2">
                {quotations.filter(q => q.status === 'Sent for Review').length} Awaiting Review
              </div>
              <div className="text-[11px] text-amber-700 mt-1">
                Potential value: ₹{quotations.reduce((a, q) => a + q.grandTotal, 0).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Low Stock SKU Alerts</span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-serif font-bold text-rose-700 mt-2">
                {lowStockProducts.length} Items Low
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Reorder trigger: &lt;100 units
              </div>
            </div>

          </div>

          {/* Low Stock Warning Alert Bar */}
          {lowStockProducts.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  <strong>Warehouse Inventory Alert:</strong> The following products need urgent restock at Ajmer Central: {lowStockProducts.map(p => `${p.name} (${p.stock} left)`).join(', ')}.
                </span>
              </div>
              <button
                onClick={() => setActiveAdminTab('inventory')}
                className="text-xs font-bold underline hover:text-amber-950"
              >
                Manage Stock
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ORDER FULFILLMENT PIPELINE */}
      {activeAdminTab === 'orders' && (
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Order Fulfillment & Logistics Pipeline
              </h2>
              <p className="text-xs text-slate-500">
                Update operational status, assign courier AWB tracking, inspect personalization artwork, and print GST Tax Invoices.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Order # & Date</th>
                  <th className="p-3">Customer & Channel</th>
                  <th className="p-3">Products & Customization</th>
                  <th className="p-3">Amount & Payment</th>
                  <th className="p-3">Fulfillment Status</th>
                  <th className="p-3">Logistics AWB</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/50">
                    <td className="p-3">
                      <div className="font-mono font-bold text-slate-900">{ord.orderNumber}</div>
                      <div className="text-[11px] text-slate-400">{ord.date}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-900">{ord.customerName}</div>
                      <div className="text-[11px] text-slate-400">
                        {ord.type === 'B2B' ? `🏢 ${ord.organizationName}` : '🛍️ Individual Customer'}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-slate-800">
                        {ord.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                      </div>
                      {ord.items[0]?.customization?.engravedText && (
                        <div className="text-[10px] text-rose-700 font-mono italic">
                          Engraving: "{ord.items[0].customization.engravedText}"
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="font-serif font-bold text-slate-900">
                        ₹{ord.grandTotal.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold">{ord.paymentStatus}</div>
                    </td>
                    <td className="p-3">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['orderStatus'])}
                        className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:outline-hidden"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Artwork Approval">Artwork Approval</option>
                        <option value="In Customization">In Customization (Laser/Print)</option>
                        <option value="Quality Check">Quality Check</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      <div>{ord.awbNumber || 'Generating...'}</div>
                      <div className="text-[10px] text-slate-400">{ord.courierPartner}</div>
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedOrder(ord);
                          setActiveModal('invoice_view');
                        }}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 inline-flex items-center gap-1 font-semibold"
                        title="View & Print GST Tax Invoice"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Tax Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: INVENTORY & WAREHOUSES */}
      {activeAdminTab === 'inventory' && (
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Warehouse Stock & SKU Management
              </h2>
              <p className="text-xs text-slate-500">
                Monitor real-time inventory counts across Ajmer, Jaipur, and Delhi hubs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-3"
              >
                <div className="flex gap-3">
                  <img src={prod.images[0]} alt={prod.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-400 block">{prod.sku}</span>
                    <h4 className="font-serif font-bold text-xs text-slate-900 truncate">{prod.name}</h4>
                    <span className="text-[11px] text-slate-500 block">{prod.category}</span>
                    <span className="text-xs font-serif font-bold text-rose-900 mt-1 block">₹{prod.basePrice}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Stock Count:</span>
                    <strong className={`text-sm font-bold font-mono ${prod.stock < 100 ? 'text-rose-600' : 'text-slate-900'}`}>
                      {prod.stock} units
                    </strong>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateProduct(prod.id, { stock: Math.max(0, prod.stock - 10) })}
                      className="px-2 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 font-bold"
                      title="Adjust down -10"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => updateProduct(prod.id, { stock: prod.stock + 50 })}
                      className="px-2 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold"
                      title="Restock +50"
                    >
                      +50
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Warehouse: {prod.warehouseLocation.split(' ')[0]}</span>
                  <span>HSN: {prod.hsnCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CORPORATE RFQS */}
      {activeAdminTab === 'quotations' && (
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Corporate Quotations (RFQ) Desk
            </h2>
            <p className="text-xs text-slate-500">
              Review corporate pricing proposals and approve custom discount structures.
            </p>
          </div>

          <div className="space-y-4">
            {quotations.map(q => (
              <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{q.rfqNumber}</span>
                    <span className="font-bold text-slate-700">{q.companyName}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold uppercase">{q.status}</span>
                  </div>
                  <div className="text-slate-500 mt-1">
                    Contact: {q.contactPerson} ({q.email} | {q.phone}) • GSTIN: {q.gstin}
                  </div>
                  <div className="text-slate-600 italic mt-1">
                    Notes: "{q.notes}"
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-slate-500 text-[11px]">Commercial Total</div>
                    <div className="font-serif font-bold text-base text-rose-950">₹{q.grandTotal.toLocaleString('en-IN')}</div>
                  </div>

                  <button
                    onClick={() => updateQuotationStatus(q.id, 'Customer Accepted', 'Commercial quote formally approved by Ajmer Sales Desk')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve RFQ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SUPPORT DESK */}
      {activeAdminTab === 'tickets' && (
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Customer Support & Concierge Tickets
            </h2>
            <p className="text-xs text-slate-500">
              Resolve personalization adjustments, order status queries, and delivery instructions.
            </p>
          </div>

          <div className="space-y-4">
            {tickets.map(t => (
              <div key={t.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-rose-700">{t.ticketNumber}</span>
                    <span className="text-xs font-bold text-slate-800">{t.subject}</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold uppercase">{t.status}</span>
                </div>

                <div className="space-y-2 text-xs">
                  {t.messages.map((m, idx) => (
                    <div key={idx} className={`p-2.5 rounded-xl ${m.sender === 'agent' ? 'bg-rose-50 text-rose-950 ml-6' : 'bg-slate-50 text-slate-800 mr-6'}`}>
                      <div className="font-bold text-[10px] uppercase text-slate-400 mb-0.5">
                        {m.sender === 'agent' ? 'Ajmer Support Desk' : t.customerName} • {m.time}
                      </div>
                      <div>{m.text}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type official reply to customer..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addTicketReply(t.id, e.currentTarget.value.trim(), 'agent');
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.currentTarget.previousSibling as HTMLInputElement);
                      if (input && input.value.trim()) {
                        addTicketReply(t.id, input.value.trim(), 'agent');
                        input.value = '';
                      }
                    }}
                    className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-slate-900">Add New Product to Catalog</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Royal Rajputana Scented Candle Crate"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Personalized Gifts">Personalized Gifts</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Soft Toys">Soft Toys</option>
                    <option value="Luxury Gifts">Luxury Gifts</option>
                    <option value="Gift Hampers">Gift Hampers</option>
                    <option value="Corporate Kits">Corporate Kits</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newProdBasePrice}
                    onChange={(e) => setNewProdBasePrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={newProdMrp}
                    onChange={(e) => setNewProdMrp(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Warehouse Hub</label>
                <select
                  value={newProdWarehouse}
                  onChange={(e) => setNewProdWarehouse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Ajmer Central Warehouse">Ajmer Central Warehouse (Rajasthan)</option>
                  <option value="Jaipur Logistics Hub">Jaipur Logistics Hub</option>
                  <option value="Delhi Hub & Fulfillment Center">Delhi Hub & Fulfillment Center</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-700 text-white font-semibold hover:bg-rose-800"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

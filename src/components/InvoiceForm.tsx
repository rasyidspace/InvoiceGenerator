import { Plus, Trash2, Upload, X } from 'lucide-react';
import type { InvoiceData, InvoiceItem, BankAccount } from '../types/invoice';

interface InvoiceFormProps {
  data: InvoiceData;
  updateData: (updates: Partial<InvoiceData>) => void;
  resetData: () => void;
}

export function InvoiceForm({ data, updateData, resetData }: InvoiceFormProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateData({ logoUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateData({ logoUrl: null });
  };

  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateData({ customStampUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeStamp = () => {
    updateData({ customStampUrl: null });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substring(7),
      component: '',
      description: '',
      cost: 0,
    };
    updateData({ items: [...data.items, newItem] });
  };

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    updateData({
      items: data.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    });
  };

  const removeItem = (id: string) => {
    updateData({ items: data.items.filter((item) => item.id !== id) });
  };

  const addBankAccount = () => {
    if (data.bankAccounts.length >= 2) return;
    const newAccount: BankAccount = {
      id: Math.random().toString(36).substring(7),
      bankName: '',
      accountName: '',
      accountNumber: '',
    };
    updateData({ bankAccounts: [...data.bankAccounts, newAccount] });
  };

  const updateBankAccount = (id: string, updates: Partial<BankAccount>) => {
    updateData({
      bankAccounts: data.bankAccounts.map((acc) => (acc.id === id ? { ...acc, ...updates } : acc)),
    });
  };

  const removeBankAccount = (id: string) => {
    updateData({ bankAccounts: data.bankAccounts.filter((acc) => acc.id !== id) });
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold tracking-tight">Invoice Editor</h2>
        <button
          onClick={resetData}
          className="text-sm px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-medium transition-colors"
        >
          Reset Data
        </button>
      </div>

      {/* Branding */}
      <section className="space-y-4">
        <h3 className="font-semibold text-gray-900">Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
            <div className="flex items-center gap-4">
              {data.logoUrl ? (
                <div className="relative inline-block">
                  <img src={data.logoUrl} alt="Logo" className="h-16 object-contain border rounded-md p-1 bg-gray-50" />
                  <button
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow hover:bg-gray-100 text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-600 transition-colors">
                  <Upload size={16} />
                  Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Studio Name</label>
            <input
              type="text"
              value={data.studioName}
              onChange={(e) => updateData({ studioName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="text"
              value={data.website}
              onChange={(e) => updateData({ website: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Invoice Details */}
      <section className="space-y-4">
        <h3 className="font-semibold text-gray-900">Invoice Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Codename</label>
            <input
              type="text"
              value={data.codename || ''}
              onChange={(e) => updateData({ codename: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Number (3 digit)</label>
            <input
              type="text"
              maxLength={3}
              value={data.projectNumber || ''}
              onChange={(e) => updateData({ projectNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Issued To</label>
            <textarea
              value={data.issuedTo}
              onChange={(e) => updateData({ issuedTo: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => updateData({ date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              value={data.projectName}
              onChange={(e) => updateData({ projectName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Items</h3>
          <button
            onClick={addItem}
            className="flex items-center gap-1 text-sm px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 border border-gray-100 rounded-lg space-y-3 relative group">
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Component</label>
                  <input
                    type="text"
                    value={item.component}
                    onChange={(e) => updateItem(item.id, { component: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Cost (IDR)</label>
                  <input
                    type="number"
                    value={item.cost}
                    onChange={(e) => updateItem(item.id, { cost: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div className="col-span-full">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          ))}
          {data.items.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
              No items added yet.
            </div>
          )}
        </div>
      </section>

      {/* Payment Details */}
      <section className="space-y-4">
        <h3 className="font-semibold text-gray-900">Payment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={data.paymentStatus}
              onChange={(e) => updateData({ paymentStatus: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
            >
              <option value="UNPAID">Unpaid</option>
              <option value="PARTIAL">Partial</option>
              <option value="PAID">Paid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (IDR)</label>
            <input
              type="number"
              min="0"
              value={data.downPayment || 0}
              onChange={(e) => updateData({ downPayment: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Term</label>
            <input
              type="text"
              value={data.paymentTerm}
              onChange={(e) => updateData({ paymentTerm: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div className="col-span-full space-y-3 mt-2">
            <label className={`flex items-center gap-2 ${data.paymentStatus !== 'PAID' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
              <input
                type="checkbox"
                checked={data.showPaidStamp}
                onChange={(e) => updateData({ showPaidStamp: e.target.checked })}
                disabled={data.paymentStatus !== 'PAID'}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black disabled:cursor-not-allowed"
              />
              <span className="text-sm font-medium text-gray-700">Show PAID stamp on invoice</span>
            </label>

            {data.showPaidStamp && data.paymentStatus === 'PAID' && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pl-6">
                {data.customStampUrl ? (
                  <div className="relative inline-block w-fit">
                    <img src={data.customStampUrl} alt="Custom Stamp" className="h-16 object-contain border rounded-md p-1 bg-gray-50" />
                    <button
                      onClick={removeStamp}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow hover:bg-gray-100 text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-600 transition-colors w-fit">
                    <Upload size={16} />
                    Upload Custom Stamp
                    <input type="file" accept="image/*" onChange={handleStampUpload} className="hidden" />
                  </label>
                )}
                {!data.customStampUrl && (
                  <span className="text-xs text-gray-500">Default stamp will be used if none uploaded.</span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bank Accounts */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Bank Accounts</h3>
          {data.bankAccounts.length < 2 && (
            <button
              onClick={addBankAccount}
              className="flex items-center gap-1 text-sm px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <Plus size={16} /> Add Account
            </button>
          )}
        </div>
        <div className="space-y-3">
          {data.bankAccounts.map((acc) => (
            <div key={acc.id} className="p-4 bg-gray-50 border border-gray-100 rounded-lg space-y-3 relative group">
              <button
                onClick={() => removeBankAccount(acc.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
                <div className="col-span-full md:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={acc.bankName}
                    onChange={(e) => updateBankAccount(acc.id, { bankName: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div className="col-span-full md:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={acc.accountNumber}
                    onChange={(e) => updateBankAccount(acc.id, { accountNumber: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div className="col-span-full">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Account Name</label>
                  <input
                    type="text"
                    value={acc.accountName}
                    onChange={(e) => updateBankAccount(acc.id, { accountName: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          ))}
          {data.bankAccounts.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
              No bank accounts added yet.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="space-y-4 pt-4 border-t border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Footer Contact Info</label>
          <input
            type="text"
            value={data.footerContact}
            onChange={(e) => updateData({ footerContact: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          />
        </div>
      </section>
    </div>
  );
}

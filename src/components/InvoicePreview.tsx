import { forwardRef } from 'react';
import type { InvoiceData } from '../types/invoice';
import { formatIDR, generateInvoiceNumber } from '../utils/format';
import paidStampImg from '../assets/meshlab_paid_stamp.png';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data }, ref) => {
  const subtotal = data.items.reduce((sum, item) => sum + item.cost, 0);
  const downPaymentAmount = data.downPayment || 0;
  const remainingPayment = subtotal - downPaymentAmount;

  const getBankAccountGridClass = () => {
    const count = data.bankAccounts.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    return 'grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div ref={ref} className="bg-white text-black shadow-lg" style={{ width: '794px', minHeight: '1123px', margin: '0 auto', position: 'relative' }}>
      <div className="p-12 h-full flex flex-col bg-white" style={{ minHeight: '1123px' }}>
        
        {/* Header */}
        <header className="flex justify-between items-start mb-16">
          <div>
            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Logo" className="h-12 object-contain mb-4" />
            ) : (
              <div className="h-12 mb-4" />
            )}
            <h1 className="text-4xl font-bold tracking-tight uppercase">{data.title}</h1>
            <p className="text-gray-500 text-sm mt-1"># {generateInvoiceNumber(data.codename, data.date, data.projectNumber)}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">{data.studioName}</h2>
            <p className="text-gray-500 text-sm mt-1">{data.website}</p>
          </div>
        </header>

        {/* Client & Project Info */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 border-t border-black pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Issued To</h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{data.issuedTo}</p>
          </div>
          <div className="col-span-1 border-t border-black pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Date</h3>
            <p className="text-sm">{data.date}</p>
          </div>
          <div className="col-span-1 border-t border-black pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project</h3>
            <p className="text-sm font-medium">{data.projectName}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12 flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-black pb-3 text-xs font-bold uppercase tracking-wider w-1/3">Component</th>
                <th className="border-b-2 border-black pb-3 text-xs font-bold uppercase tracking-wider">Description</th>
                <th className="border-b-2 border-black pb-3 text-xs font-bold uppercase tracking-wider text-right w-1/4">Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id} className={index !== data.items.length - 1 ? "border-b border-gray-200" : ""}>
                  <td className="py-4 align-top pr-4">
                    <span className="font-medium text-sm">{item.component}</span>
                  </td>
                  <td className="py-4 align-top pr-4">
                    <span className="text-sm text-gray-600">{item.description}</span>
                  </td>
                  <td className="py-4 align-top text-right">
                    <span className="text-sm font-medium">{formatIDR(item.cost)}</span>
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-400 text-sm">No items</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary & Payment Info */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          {/* Payment Info */}
          <div>
            {data.bankAccounts.length > 0 && (
              <>
                <h3 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-2 mb-4">Pay To</h3>
                <div className={`grid gap-4 ${getBankAccountGridClass()}`}>
                  {data.bankAccounts.map((acc) => (
                    <div key={acc.id} className="text-sm">
                      <p className="font-bold">{acc.bankName}</p>
                      <p className="text-gray-600 mt-1">{acc.accountNumber}</p>
                      <p className="text-gray-500 text-xs mt-1">{acc.accountName}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {data.paymentTerm && (
              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Payment Terms</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{data.paymentTerm}</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="relative">
            <div className="border-t border-black pt-4 space-y-3 relative z-10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatIDR(subtotal)}</span>
              </div>
              
              {(data.downPayment || 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Down Payment</span>
                  <span className="font-medium">-{formatIDR(downPaymentAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
                <span className="font-bold text-lg">Total Due</span>
                <span className="font-bold text-xl">{formatIDR(remainingPayment)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end relative z-10">
              <div className="inline-block border border-gray-200 rounded px-3 py-1.5 text-xs font-bold tracking-wider uppercase bg-white/80">
                Status: <span className={data.paymentStatus === 'PAID' ? 'text-green-600' : data.paymentStatus === 'PARTIAL' ? 'text-orange-500' : 'text-red-500'}>{data.paymentStatus}</span>
              </div>
            </div>

            {/* PAID Stamp overlay */}
            {data.showPaidStamp && data.paymentStatus === 'PAID' && (
              <div className="absolute bottom-2 right-28 pointer-events-none opacity-80 z-0">
                <img src={data.customStampUrl || paidStampImg} alt="PAID Stamp" className="w-32 h-auto object-contain" />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-black pt-6 text-center">
          <p className="text-xs text-gray-500 tracking-wide">{data.footerContact}</p>
        </footer>


      </div>
    </div>
  );
});

InvoicePreview.displayName = 'InvoicePreview';

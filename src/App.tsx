import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useInvoiceState } from './hooks/useInvoiceState';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { generateInvoiceNumber } from './utils/format';

function App() {
  const { data, updateData, resetData } = useInvoiceState();
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    
    try {
      setIsExporting(true);
      
      // Temporarily make it visible for html2canvas to capture it
      printRef.current.style.position = 'absolute';
      printRef.current.style.left = '0';
      printRef.current.style.top = '0';
      printRef.current.style.zIndex = '-9999';
      printRef.current.style.visibility = 'visible';
      printRef.current.style.opacity = '1';
      
      // Add a small delay to ensure rendering is complete
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(printRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
      });

      // Hide it again
      printRef.current.style.visibility = 'hidden';
      printRef.current.style.opacity = '0';
      printRef.current.style.position = 'absolute';
      printRef.current.style.left = '-9999px';

      const imgData = canvas.toDataURL('image/png');
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdfHeight = Math.max(297, imgHeight);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [imgWidth, pdfHeight],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${generateInvoiceNumber(data.codename, data.date, data.projectNumber).replace(/\//g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded">
              IG
            </div>
            <h1 className="text-xl font-bold tracking-tight">InvoiceGenerator</h1>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium shadow-sm"
          >
            <Download size={18} />
            {isExporting ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Left Column: Form Editor */}
          <div className="w-full xl:w-[500px] 2xl:w-[600px] shrink-0">
            <InvoiceForm 
              data={data}
              updateData={updateData}
              resetData={resetData}
            />
          </div>

          {/* Right Column: Live Preview */}
          <div className="w-full xl:flex-1 overflow-x-auto bg-gray-200/50 p-4 sm:p-8 rounded-xl border border-gray-200 flex justify-center items-start min-h-[calc(100vh-8rem)]">
            <div className="shadow-2xl transition-transform origin-top scale-[0.6] sm:scale-75 lg:scale-90 xl:scale-100">
              <InvoicePreview data={data} />
            </div>
          </div>
          
        </div>
      </main>

      {/* Hidden print container - strictly for html2canvas */}
      <div 
        ref={printRef} 
        style={{ 
          position: 'absolute', 
          left: '-9999px',
          top: 0,
          visibility: 'hidden', 
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        <InvoicePreview data={data} />
      </div>
    </div>
  );
}

export default App;

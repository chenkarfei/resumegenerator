'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ResumeEditor } from '@/components/ResumeEditor';
import { ResumePreview } from '@/components/ResumePreview';
import { ThemeSelector } from '@/components/ThemeSelector';
import { ExternalLink } from 'lucide-react';

export default function Home() {
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handlePrint = () => {
    try {
      if (window.self !== window.top) {
        setShowPrintModal(true);
        return;
      }
    } catch (e) {
      // Catch DOMException if cross-origin access blocks window.top check
      setShowPrintModal(true);
      return;
    }
    
    // Natively trigger print to generate perfectly paginated PDF
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 h-screen overflow-hidden font-sans text-slate-800">
      <div className="no-print">
        <Navbar />
      </div>
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Column: Editor */}
        <section className="w-full md:w-1/2 lg:w-[45%] h-full overflow-y-auto border-r border-white/40 bg-white/40 backdrop-blur-sm z-0 no-print">
          <div className="p-4 md:p-6 lg:p-8">
            <ResumeEditor onPrint={handlePrint} />
          </div>
        </section>

        {/* Right Column: Preview */}
        <section className="flex flex-col w-full md:w-1/2 lg:w-[55%] h-full bg-slate-200/50 overflow-hidden relative print:bg-white print:w-screen print:h-auto print:overflow-visible print:absolute print:inset-0 print:z-50 print:m-0 print:p-0">
          <div className="no-print">
            <ThemeSelector />
          </div>
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex items-start justify-center printable-area relative print:p-0 print:m-0 print:block print:overflow-visible print:w-screen print:max-w-none">
            <div className="scale-[0.85] xl:scale-100 origin-top print:scale-100 print:transform-none print:w-screen print:max-w-none print:p-0 print:m-0">
              <ResumePreview />
            </div>
          </div>
        </section>
      </main>

      {/* Iframe Print Warning Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 no-print transition-all">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <div className="flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-4">
              <ExternalLink className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Notice: Preview Environment</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              The browser&apos;s native paginated PDF generator is blocked within this embedded designer. 
              <br /><br />
              Please open the app natively by clicking the <strong>Open App in New Tab (↗)</strong> button at the top right of your workspace to download your PDF!
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setShowPrintModal(false)}
                className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Okay, I'll open a new tab!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

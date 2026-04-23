'use client';

import { Navbar } from '@/components/Navbar';
import { ResumeEditor } from '@/components/ResumeEditor';
import { ResumePreview } from '@/components/ResumePreview';
import { ThemeSelector } from '@/components/ThemeSelector';

export default function Home() {
  const handlePrint = () => {
    // Legacy fallback, logic heavily moved to client-side pdf generator
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
        <section className="flex flex-col w-full md:w-1/2 lg:w-[55%] h-full bg-slate-200/50 overflow-hidden relative print:bg-white print:w-full print:h-auto print:overflow-visible">
          <div className="no-print">
            <ThemeSelector />
          </div>
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex items-start justify-center printable-area relative print:p-0 print:overflow-visible print:block">
            <div className="scale-[0.85] xl:scale-100 origin-top print:scale-100 print:transform-none">
              <ResumePreview />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

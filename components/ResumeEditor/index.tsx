import React, { useState } from 'react';
import { useResumeStore } from '@/hooks/use-resume-store';
import { useAIAssistant } from '@/hooks/use-ai-assistant';
import { Plus, Trash2, Wand2, Download, UploadCloud, ChevronDown, ChevronUp, Loader2, Sparkles, Briefcase } from 'lucide-react';
import { AIImportModal } from '@/components/AIImportModal';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export function ResumeEditor({ onPrint }: { onPrint: () => void }) {
  const { data, coverLetter, jobMatches, setPersonal, setSummary, addExperience, updateExperience, removeExperience, addEducation, updateEducation, removeEducation, setSkills, setCoverLetter, setJobMatches } = useResumeStore();
  const [activeSection, setActiveSection] = useState<string | null>('personal');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { enhanceSummary, enhanceBullets, isSummarizing, isEnhancingBullets, generateCoverLetter, isGeneratingCoverLetter, generateCareerMatches, isMatchingCareers } = useAIAssistant();

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview-document');
    if (!element) return;
    
    setIsDownloading(true);
    try {
      // Dynamically import html2pdf to prevent Next.js SSR crashes
      // @ts-ignore - html2pdf doesn't always have perfect types but it works safely
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt: any = {
        margin:       [10, 0, 10, 0], // Top, Right, Bottom, Left margins in mm
        filename:     `${data.personal.fullName ? data.personal.fullName.replace(/\s+/g, '_') : 'Resume'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true,
          backgroundColor: '#ffffff'
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // The magic bullet: instructs html2pdf to naturally split pages around our protected elements!
        pagebreak:    { mode: ['css', 'legacy'], avoid: ['.break-inside-avoid', 'h1', 'h2', 'h3'] }
      };

      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback
      onPrint();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddExperience = () => {
    addExperience({
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setActiveSection('experience');
  };

  const handleAddEducation = () => {
    addEducation({
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      description: '',
    });
    setActiveSection('education');
  };

  const onEnhanceSummary = async () => {
    if (!data.personal.summary) return;
    const improved = await enhanceSummary(data.personal.summary);
    setSummary(improved);
  };

  const onEnhanceBullets = async (id: string, currentDesc: string) => {
    if (!currentDesc) return;
    const improved = await enhanceBullets(currentDesc, id);
    updateExperience(id, { description: improved });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      <AIImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-white/40 pb-6">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Editor</h2>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">Data Entry</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/60 text-indigo-700 border border-indigo-100 rounded-lg text-sm font-medium hover:bg-white/80 transition-colors shadow-sm"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">AI Import</span>
          </button>
          
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
            title="Download multi-page PDF (Smart Pagination)"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {/* Personal Details */}
        <div className="bg-white/60 backdrop-blur border text-left border-white/80 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('personal')}
            className="w-full flex justify-between items-center bg-white/40 px-6 py-4 border-b border-white/60 focus:outline-none hover:bg-white/60 transition-colors"
          >
            <h3 className="text-sm font-bold text-indigo-700 flex items-center gap-3">Personal Info</h3>
            {activeSection === 'personal' ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          
          {activeSection === 'personal' && (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) => setPersonal({ fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Job Title</label>
                <input
                  type="text"
                  value={data.personal.jobTitle}
                  onChange={(e) => setPersonal({ jobTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => setPersonal({ email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Phone</label>
                <input
                  type="tel"
                  value={data.personal.phone}
                  onChange={(e) => setPersonal({ phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Location</label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => setPersonal({ location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="New York, NY"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.personal.linkedin}
                  onChange={(e) => setPersonal({ linkedin: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="linkedin.com/in/jane"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-1">Website / Portfolio</label>
                <input
                  type="text"
                  value={data.personal.website}
                  onChange={(e) => setPersonal({ website: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="janedoe.com"
                />
              </div>
              <div className="sm:col-span-2 relative">
                <label className="block text-xs font-bold text-slate-500 mb-1 flex justify-between items-center">
                  Summary
                  <button 
                    onClick={onEnhanceSummary}
                    disabled={isSummarizing || !data.personal.summary}
                    className="text-[10px] font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {isSummarizing ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3" />} 
                    {isSummarizing ? "Enhancing..." : "Suggest Summary AI"}
                  </button>
                </label>
                <textarea
                  value={data.personal.summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]"
                  placeholder="A passionate professional with..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Experience Details */}
        <div className="bg-white/60 backdrop-blur border text-left border-white/80 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center bg-white/40 border-b border-white/60 hover:bg-white/60 transition-colors">
            <button
              onClick={() => toggleSection('experience')}
              className="flex-1 flex justify-between items-center px-6 py-4 focus:outline-none"
            >
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-3">Experience</h3>
              {activeSection === 'experience' ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
          </div>
          
          {activeSection === 'experience' && (
            <div className="p-6 space-y-8">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative p-6 bg-white/60 border border-white rounded-xl shadow-sm">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700 p-1 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Experience #{index + 1}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        disabled={exp.current}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        className={`w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none ${exp.current ? 'bg-slate-100 text-slate-400' : 'bg-white/80 focus:ring-2 focus:ring-indigo-500'}`}
                        placeholder="Present"
                      />
                      <label className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-600">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        I currently work here
                      </label>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2 relative">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-slate-500">Description & Bullets</label>
                        <button 
                          onClick={() => onEnhanceBullets(exp.id, exp.description)}
                          disabled={isEnhancingBullets === exp.id || !exp.description}
                          className="text-[10px] font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
                        >
                          {isEnhancingBullets === exp.id ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3" />} 
                          {isEnhancingBullets === exp.id ? "Fixing..." : "Smart AI Suggestion"}
                        </button>
                      </div>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px]"
                        placeholder="• Reduced server latency by 20%..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={handleAddExperience}
                className="w-full flex justify-center items-center gap-2 py-3 border border-indigo-200 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>
          )}
        </div>

        {/* Education Details */}
        <div className="bg-white/60 backdrop-blur border text-left border-white/80 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center bg-white/40 border-b border-white/60 hover:bg-white/60 transition-colors">
            <button
              onClick={() => toggleSection('education')}
              className="flex-1 flex justify-between items-center px-6 py-4 focus:outline-none"
            >
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-3">Education</h3>
              {activeSection === 'education' ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
          </div>
          
          {activeSection === 'education' && (
            <div className="p-6 space-y-8">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="relative p-6 bg-white/60 border border-white rounded-xl shadow-sm">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700 p-1 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Education #{index + 1}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">School / University</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Graduation Date</label>
                      <input
                        type="text"
                        value={edu.graduationDate}
                        onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="May 2020"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2 relative">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Minor / Coursework / Honors</label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[60px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={handleAddEducation}
                className="w-full flex justify-center items-center gap-2 py-3 border border-indigo-200 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>
          )}
        </div>

        {/* Skills Details */}
        <div className="bg-white/60 backdrop-blur border text-left border-white/80 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('skills')}
            className="w-full flex justify-between items-center bg-white/40 px-6 py-4 border-b border-white/60 focus:outline-none hover:bg-white/60 transition-colors"
          >
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-3">Skills</h3>
            {activeSection === 'skills' ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          
          {activeSection === 'skills' && (
            <div className="p-6">
              <label className="block text-xs font-bold text-slate-500 mb-2">Technical & Soft Skills (comma separated)</label>
              <textarea
                value={data.skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 bg-white/80 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
                placeholder="JavaScript, Project Management, Public Speaking..."
              />
            </div>
          )}
        </div>

        {/* AI Cover Letter & Career Matches */}
        <div className="bg-white/60 backdrop-blur border text-left border-white/80 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('ai-tools')}
            className="w-full flex justify-between items-center bg-indigo-50/50 px-6 py-4 border-b border-indigo-100 focus:outline-none hover:bg-indigo-50 transition-colors"
          >
            <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-600"/> Auto Cover Letter & Career Match</h3>
            {activeSection === 'ai-tools' ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          
          {activeSection === 'ai-tools' && (
            <div className="p-6">
              <p className="text-sm font-medium text-slate-500 mb-4">These tools use your current resume data to generate perfectly tailored text.</p>
              
              <div className="flex gap-4 mb-6">
                <button
                  onClick={async () => {
                     const result = await generateCoverLetter(data);
                     setCoverLetter(result);
                  }}
                  disabled={isGeneratingCoverLetter}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-colors flex items-center justify-center flex-1 disabled:opacity-50 shadow-md shadow-indigo-200"
                >
                  {isGeneratingCoverLetter ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Sparkles className="w-4 h-4 mr-2"/>}
                  {isGeneratingCoverLetter ? "Drafting..." : "Generate Cover Letter"}
                </button>
                <button
                  onClick={async () => {
                     const matches = await generateCareerMatches(data);
                     setJobMatches(matches);
                  }}
                  disabled={isMatchingCareers}
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center flex-1 disabled:opacity-50 shadow-md shadow-slate-300"
                >
                  {isMatchingCareers ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Briefcase className="w-4 h-4 mr-2"/>}
                  {isMatchingCareers ? "Analyzing..." : "Find Career Matches"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Cover Letter Draft</label>
                  <textarea
                    value={coverLetter || ''}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[250px]"
                    placeholder="Your generated cover letter will appear here..."
                  />
                </div>
                
                {jobMatches && jobMatches.length > 0 && (
                  <div>
                     <label className="block text-xs font-bold text-slate-500 mb-3">Recommended Jobs</label>
                     <div className="space-y-3">
                       {jobMatches.map((job, idx) => (
                         <div key={idx} className="p-3 bg-white/80 rounded-xl border border-white shadow-sm flex items-center justify-between">
                           <div>
                             <p className="text-sm font-bold text-slate-800">{job}</p>
                             <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-500">Suggested Match</p>
                           </div>
                           <button className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-md font-semibold hover:bg-slate-200">Search</button>
                         </div>
                       ))}
                     </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

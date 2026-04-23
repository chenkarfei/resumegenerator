import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useResumeStore, ResumeData } from '@/hooks/use-resume-store';
import { X, Loader2, Sparkles } from 'lucide-react';

let aiClient: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'dummy_key' });
  }
  return aiClient;
};

export function AIImportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setFullData = useResumeStore((state) => state.setFullData);
  const currentData = useResumeStore((state) => state.data);

  if (!isOpen) return null;

  const handleParse = async () => {
    if (!text.trim()) {
      setError('Please paste some text first.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const prompt = `
        You are an expert resume parser. Extract the following unstructured text into a structured JSON object representing a resume.
        Use this exact TypeScript schema:
        {
          "personal": {
            "fullName": string,
            "jobTitle": string,
            "email": string,
            "phone": string,
            "location": string,
            "linkedin": string,
            "website": string,
            "summary": string
          },
          "experience": [
            {
              "id": string (generate a random numeric string),
              "title": string,
              "company": string,
              "location": string,
              "startDate": string,
              "endDate": string,
              "current": boolean,
              "description": string (format as bullet points starting with •)
            }
          ],
          "education": [
            {
              "id": string (generate a random numeric string),
              "degree": string,
              "school": string,
              "location": string,
              "graduationDate": string,
              "description": string
            }
          ],
          "skills": string (Comma separated list of skills)
        }

        Important rules:
        - Return ONLY valid JSON block. Do not use Markdown code blocks wrapped like \`\`\`json. Just raw JSON.
        - Guess best matches if formatting is messy.
        - For experience descriptions, format as simple bullet points starting with the "• " character. Do NOT use any Markdown formatting like asterisks or bolding.

        TEXT TO PARSE:
        ${text}
      `;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      let jsonStr = response.text || '{}';
      // Clean up markdown markers if Gemini ignores the rule
      jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsedData = JSON.parse(jsonStr) as ResumeData;
      setFullData(parsedData);
      onClose();
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to parse resume. Please format it differently and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-indigo-900/20 border border-white w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/60 bg-white/40">
          <div className="flex items-center gap-2 text-indigo-600">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-800">AI Paste & Parse</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-white/60 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          <p className="text-sm font-medium text-slate-600 tracking-tight mb-4 leading-relaxed">
            Paste your entire LinkedIn profile, old resume text, or a messy bio below. 
            Our AI engine will automatically structure it into perfect form fields instantly.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 p-4 border border-slate-200 bg-white/60 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-800 font-mono tracking-tight"
            placeholder="Experience: Software Engineer at Google (2019-2022) - Led the frontend team..."
            disabled={loading}
          />
          {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
        </div>

        <div className="px-6 py-4 border-t border-white/60 bg-white/40 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-white/60 rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleParse}
            disabled={loading}
            className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 shadow-md shadow-indigo-200 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{loading ? 'Structuring Document...' : 'Parse & Apply'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

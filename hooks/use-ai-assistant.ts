import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ResumeData } from './use-resume-store';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export function useAIAssistant() {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isEnhancingBullets, setIsEnhancingBullets] = useState<string | null>(null);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [isMatchingCareers, setIsMatchingCareers] = useState(false);

  const enhanceSummary = async (currentSummary: string): Promise<string> => {
    if (!currentSummary.trim()) return currentSummary;
    setIsSummarizing(true);
    try {
      const prompt = `Rewrite this professional summary to be more impactful, concise, and engaging. Keep it around 3-4 sentences. Do not use generic buzzwords if possible.
      CRITICAL: Return PLAIN TEXT ONLY. Do NOT use ANY Markdown formatting like asterisks (*), bolding (**), or hashes.
      Current summary:
      "${currentSummary}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || currentSummary;
    } catch (e) {
      console.error(e);
      return currentSummary;
    } finally {
      setIsSummarizing(false);
    }
  };

  const enhanceBullets = async (currentBullets: string, jobId: string): Promise<string> => {
    if (!currentBullets.trim()) return currentBullets;
    setIsEnhancingBullets(jobId);
    try {
      const prompt = `Rewrite these resume experience bullet points to be highly professional. 
      Start each bullet with a strong action verb. Focus on impact and metrics where possible.
      
      CRITICAL: Return PLAIN TEXT ONLY. Do NOT use ANY Markdown formatting like asterisks (*), bolding (**), or hashes. 
      Format exactly as a list of bullet points starting with the bullet character "• ". Make it concise.

      Current bullets:
      "${currentBullets}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || currentBullets;
    } catch (e) {
      console.error(e);
      return currentBullets;
    } finally {
      setIsEnhancingBullets(null);
    }
  };

  const generateCoverLetter = async (resume: ResumeData): Promise<string> => {
    setIsGeneratingCoverLetter(true);
    try {
      const context = JSON.stringify(resume);
      const prompt = `Write a highly professional and compelling cover letter based on this resume data.
      Make sure to utilize the exact name, contact info, and recent experiences.
      Keep it around 3 paragraphs. Only return the final cover letter body (no markdown blocks).
      Resume Data:
      ${context}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || '';
    } catch (e) {
      console.error(e);
      return 'Failed to generate cover letter.';
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const generateCareerMatches = async (resume: ResumeData): Promise<string[]> => {
    setIsMatchingCareers(true);
    try {
      const context = JSON.stringify(resume);
      const prompt = `Analyze the following resume and suggest 5 specific job titles or career paths that perfectly match the skills, experience, and education level of this candidate.
      Return the result strictly as a JSON array of 5 strings and NOTHING ELSE. No extra text or markdown wrappers like \`\`\`json.
      Resume Data:
      ${context}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      let jsonStr = response.text || '[]';
      jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error(e);
      return ['Software Engineer', 'Product Manager', 'Data Analyst'];
    } finally {
      setIsMatchingCareers(false);
    }
  };

  return { 
    enhanceSummary, isSummarizing, 
    enhanceBullets, isEnhancingBullets, 
    generateCoverLetter, isGeneratingCoverLetter,
    generateCareerMatches, isMatchingCareers
  };
}

import { create } from 'zustand';

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  description: string;
};

export type ResumeData = {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string;
};

export type ThemeType = 'clean' | 'modern' | 'creative' | 'it' | 'academic' | 'minimalist' | 'editorial' | 'startup' | 'industrial' | 'luxury';
export type ColorTheme = 'slate' | 'blue' | 'emerald' | 'violet' | 'rose' | 'amber' | 'cyan' | 'indigo' | 'orange' | 'teal';

interface ResumeStore {
  data: ResumeData;
  theme: ThemeType;
  color: ColorTheme;
  coverLetter: string;
  jobMatches: string[];
  setPersonal: (data: Partial<ResumeData['personal']>) => void;
  setSummary: (summary: string) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  setSkills: (skills: string) => void;
  setTheme: (theme: ThemeType) => void;
  setColor: (color: ColorTheme) => void;
  setCoverLetter: (content: string) => void;
  setJobMatches: (matches: string[]) => void;
  setFullData: (data: ResumeData) => void;
}

const initialData: ResumeData = {
  personal: {
    fullName: 'Jane Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
    website: 'janedoe.dev',
    summary: 'A highly motivated Software Engineer with 5+ years of experience building scalable web applications. Passionate about clean code, performance optimization, and creating intuitive user experiences.',
  },
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Innovators Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      current: true,
      description: '• Spearheaded the migration of the legacy monolith to a microservices architecture, improving system scalability by 40%.\n• Mentored junior developers and instituted code review best practices.\n• Led the frontend rendering optimization, resulting in a 25% decrease in page load times.',
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'Creative Solutions LLC',
      location: 'Austin, TX',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      current: false,
      description: '• Developed and maintained multiple client-facing applications using React and Node.js.\n• Implemented responsive UI designs and integrated third-party REST APIs.\n• Collaborated closely with the design team to ensure pixel-perfect implementations.',
    }
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. in Computer Science',
      school: 'University of Technology',
      location: 'Boston, MA',
      graduationDate: 'May 2018',
      description: 'Graduated Summa Cum Laude. Key coursework: Data Structures, Algorithms, Web Development.',
    }
  ],
  skills: 'JavaScript, TypeScript, React, Next.js, Node.js, Python, PostgreSQL, MongoDB, Docker, AWS, Git, Agile Methodologies',
};

export const useResumeStore = create<ResumeStore>((set) => ({
  data: initialData,
  theme: 'clean',
  color: 'indigo',
  coverLetter: '',
  jobMatches: [],
  setPersonal: (personalUpdate) =>
    set((state) => ({ data: { ...state.data, personal: { ...state.data.personal, ...personalUpdate } } })),
  setSummary: (summary) =>
    set((state) => ({ data: { ...state.data, personal: { ...state.data.personal, summary } } })),
  addExperience: (exp) =>
    set((state) => ({ data: { ...state.data, experience: [...state.data.experience, exp] } })),
  updateExperience: (id, expUpdate) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((e) => (e.id === id ? { ...e, ...expUpdate } : e)),
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      data: { ...state.data, experience: state.data.experience.filter((e) => e.id !== id) },
    })),
  addEducation: (edu) =>
    set((state) => ({ data: { ...state.data, education: [...state.data.education, edu] } })),
  updateEducation: (id, eduUpdate) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((e) => (e.id === id ? { ...e, ...eduUpdate } : e)),
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      data: { ...state.data, education: state.data.education.filter((e) => e.id !== id) },
    })),
  setSkills: (skills) => set((state) => ({ data: { ...state.data, skills } })),
  setTheme: (theme) => set({ theme }),
  setColor: (color) => set({ color }),
  setCoverLetter: (coverLetter) => set({ coverLetter }),
  setJobMatches: (jobMatches) => set({ jobMatches }),
  setFullData: (data) => set({ data }),
}));

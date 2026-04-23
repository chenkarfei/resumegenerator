import { useState, useEffect } from 'react';
import { LogIn, LogOut, FileText, CloudUpload, Loader2 } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useResumeStore } from '@/hooks/use-resume-store';

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const { data, setFullData, theme, color, coverLetter, jobMatches } = useResumeStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Auto-load on sign in
        try {
          const docRef = doc(db, 'resumes', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const savedData = docSnap.data();
            if (savedData.resumeData) {
              setFullData(savedData.resumeData);
            }
          }
        } catch (e) {
          console.error("Error loading resume:", e);
        }
      }
    });
    return () => unsubscribe();
  }, [setFullData]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSaveToCloud = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveMsg('');
    try {
      await setDoc(doc(db, 'resumes', user.uid), {
        resumeData: data,
        theme,
        color,
        coverLetter,
        jobMatches,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setSaveMsg('Saved!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (error) {
      console.error('Error saving:', error);
      setSaveMsg('Error!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <nav className="h-20 bg-white/70 backdrop-blur-md border-b border-white/40 flex items-center justify-between px-6 z-10 w-full relative">
      <div className="flex items-center">
        <img 
          src="https://i.imghippo.com/files/QGW2373hk.png" 
          alt="Family Logo" 
          className="h-30 w-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        {user ? (
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-sm font-medium text-slate-600 hidden md:block">{user.email}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveToCloud}
                disabled={isSaving}
                className="px-3 py-2 text-xs font-bold text-indigo-700 bg-white/60 border border-indigo-100 hover:bg-white/80 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50 uppercase tracking-widest shadow-sm"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CloudUpload className="h-4 w-4" />}
                <span className="hidden sm:inline">{saveMsg || 'Save to Cloud'}</span>
              </button>
              <button
                onClick={handleSignOut}
                className="px-3 py-2 text-xs font-bold text-slate-600 bg-white/60 border border-white hover:bg-white/80 rounded-lg transition-colors flex items-center space-x-2 uppercase tracking-widest shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors flex items-center space-x-2 uppercase tracking-widest shadow-md shadow-indigo-200"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
}

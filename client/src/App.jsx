import { useState } from 'react';
import LandingPage from './components/LandingPage';
import FormWizard from './components/FormWizard';
import ResultsDashboard from './components/ResultsDashboard';

export default function App() {
  const [page, setPage] = useState('landing');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setRoadmap(data.roadmap);
      setPage('results');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRoadmap(null);
    setError(null);
    setPage('landing');
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 bg-white/80 backdrop-blur-md border-b border-outline-variant/30">
        <div className="text-headline-md font-bold tracking-tight text-primary">NeonPath</div>
        <nav className="hidden md:flex items-center gap-gutter">
          <a className="text-label-md text-primary font-semibold border-b-2 border-primary pb-1" href="#">Explore</a>
          <a className="text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">How it Works</a>
          <a className="text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">About</a>
        </nav>
        <button
          onClick={() => setPage('wizard')}
          className="bg-primary text-white px-6 py-2 rounded-lg text-label-md font-bold active:scale-95 transition-all hover:bg-primary-container"
        >
          Get Started
        </button>
      </header>

      {page === 'landing' && <LandingPage onStart={() => setPage('wizard')} />}

      {page === 'wizard' && (
        <main className="flex-grow pt-20 md:pt-32 pb-20 px-4 flex flex-col items-center justify-center">
          <div className="text-center mb-8 max-w-2xl w-full px-4">
            <h1 className="text-display-lg-mobile md:text-display-lg mb-4 text-on-surface">Craft Your Future</h1>
            <p className="text-body-lg text-on-surface-variant">Our AI mentor needs a few details to illuminate your unique professional path.</p>
          </div>
          <FormWizard onGenerate={handleGenerate} loading={loading} error={error} />
        </main>
      )}

      {page === 'results' && (
        <main className="flex-grow pt-20 md:pt-32 pb-20 px-4 md:px-16 flex flex-col items-center">
          <ResultsDashboard roadmap={roadmap} onReset={handleReset} />
        </main>
      )}

      <footer className="w-full py-8 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8 bg-white border-t border-outline-variant/30">
        <div className="text-headline-md font-bold text-on-surface">NeonPath</div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <span className="text-body-md text-on-surface-variant">&copy; 2026 NeonPath AI.</span>
        </div>
      </footer>
    </>
  );
}
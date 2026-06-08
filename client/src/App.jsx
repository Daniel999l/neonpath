import { useState } from 'react';
import FormWizard from './components/FormWizard';
import ResultsDashboard from './components/ResultsDashboard';

export default function App() {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRoadmap(null);
    setError(null);
  };

  return (
    <>
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-24 py-4 bg-white/80 backdrop-blur-md border-b border-surface-container">
        <div className="text-headline-md font-bold tracking-tight text-primary">NeonPath</div>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Explore</a>
          <a className="text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">How it Works</a>
          <a className="text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">About</a>
        </nav>
        <button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-label-md font-bold hover:bg-primary/90 transition-all">Get Started</button>
      </header>

      <main className="flex-grow pt-32 pb-20 px-4 md:px-16 flex flex-col items-center">
        {!roadmap ? (
          <>
            {/* Wizard Header */}
            <div className="text-center mb-12 max-w-2xl">
              <h1 className="text-display-lg-mobile md:text-display-lg mb-4 text-on-surface">Craft Your Future</h1>
              <p className="text-body-lg text-on-surface-variant">Our AI mentor needs a few details to illuminate your unique professional path.</p>
            </div>
            <FormWizard onGenerate={handleGenerate} loading={loading} error={error} />
          </>
        ) : (
          <ResultsDashboard roadmap={roadmap} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-8 bg-white border-t border-surface-container">
        <div className="text-headline-md font-bold text-on-surface">NeonPath</div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <span className="text-body-md text-on-surface-variant">&copy; 2024 NeonPath AI.</span>
          <div className="flex gap-4">
            <a className="text-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Privacy Policy</a>
            <a className="text-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
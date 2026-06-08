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
    <div className="min-h-screen bg-neon-dark bg-scanlines flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-display text-neon-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.7)] tracking-widest">
          NEONPATH
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Your AI career & college roadmap</p>
      </header>

      <main className="w-full max-w-2xl">
        {!roadmap ? (
          <FormWizard onGenerate={handleGenerate} loading={loading} error={error} />
        ) : (
          <ResultsDashboard roadmap={roadmap} onReset={handleReset} />
        )}
      </main>

      <footer className="mt-12 text-gray-600 text-sm">
        Built for HackMars 3.0: NEON
      </footer>
    </div>
  );
}
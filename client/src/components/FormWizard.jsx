import { useState } from 'react';

const levels = ['High School', 'Undergraduate', 'Graduate'];

export default function FormWizard({ onGenerate, loading, error }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', level: 'Undergraduate', interests: '', goals: '' });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <div className="bg-neon-card border border-neon-border rounded-xl p-8 shadow-neon">
      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-display text-neon-pink">Step 1: Who are you?</h2>
            <div>
              <label className="block text-gray-300 mb-1">Your name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="e.g. Alex"
                className="w-full px-4 py-2 rounded-lg bg-neon-dark border border-neon-border text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Current education level</label>
              <select
                value={form.level}
                onChange={e => update('level', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-neon-dark border border-neon-border text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              >
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-display text-neon-cyan">Step 2: What gets you excited?</h2>
            <div>
              <label className="block text-gray-300 mb-1">Subjects / interests</label>
              <textarea
                value={form.interests}
                onChange={e => update('interests', e.target.value)}
                placeholder="e.g. biology, coding, art, space"
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-neon-dark border border-neon-border text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan resize-none"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-display text-neon-pink">Step 3: Your big goals</h2>
            <div>
              <label className="block text-gray-300 mb-1">Life / career goals</label>
              <textarea
                value={form.goals}
                onChange={e => update('goals', e.target.value)}
                placeholder="e.g. I want to cure diseases, build a startup, or become a professor"
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-neon-dark border border-neon-border text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan resize-none"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-display text-neon-cyan">Ready to launch your future?</h2>
            <p className="text-gray-400">We'll generate a personalized roadmap based on your inputs.</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button type="button" onClick={handlePrev} className="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 rounded-lg transition">
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={handleNext} className="ml-auto px-6 py-2 bg-neon-cyan text-neon-dark font-semibold rounded-lg hover:bg-cyan-300 transition">
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="ml-auto px-6 py-2 bg-neon-pink text-white font-semibold rounded-lg glow-pink hover:bg-pink-600 transition disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Roadmap'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
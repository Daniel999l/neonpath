import { useState } from 'react';

const levels = ['High School', 'Undergraduate', 'Graduate'];

export default function FormWizard({ onGenerate, loading, error }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', level: 'Undergraduate', interests: '', goals: '' });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <div className="w-full max-w-xl">
      {/* Step Indicator */}
      <div className="flex items-center justify-center w-full mb-12 space-x-4">
        {[1,2,3].map((num) => (
          <div key={num} className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              num === step ? 'step-active' : num < step ? 'step-complete' : 'bg-surface-container-high text-on-surface-variant opacity-50'
            }`}>
              {num < step ? (
                <span className="material-symbols-outlined text-sm">check</span>
              ) : (
                num
              )}
            </div>
            <span className={`text-label-md ${num === step ? 'text-on-surface font-bold' : num < step ? 'text-on-surface' : 'text-on-surface-variant opacity-50'}`}>
              {num === 1 ? 'Identity' : num === 2 ? 'Education' : 'Vision'}
            </span>
            {num < 3 && <div className="h-px w-12 bg-outline-variant"></div>}
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl p-8 border border-surface-container shadow-sm min-h-[400px] flex flex-col justify-between">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-headline-md mb-8 text-on-surface">What should we call you?</h2>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  required
                />
              </div>
              <div className="p-4 rounded-lg bg-primary-container/10 border border-primary/10 flex gap-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <p className="text-body-md text-on-surface-variant">Your name helps our AI personalize the mentorship experience.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-headline-md mb-8 text-on-surface">Your Academic Background</h2>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-2">Current Academic Level</label>
                <div className="relative">
                  <select
                    value={form.level}
                    onChange={e => update('level', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all cursor-pointer"
                  >
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-surface-container hover:border-primary transition-colors cursor-pointer bg-surface">
                  <span className="material-symbols-outlined text-primary mb-2">school</span>
                  <p className="text-label-sm text-on-surface">Academic focus</p>
                </div>
                <div className="p-4 rounded-xl border border-surface-container hover:border-primary transition-colors cursor-pointer bg-surface">
                  <span className="material-symbols-outlined text-primary mb-2">terminal</span>
                  <p className="text-label-sm text-on-surface">Skill tracking</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-headline-md mb-8 text-on-surface">Define Your Vision</h2>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-2">Passions &amp; Interests</label>
                <textarea
                  value={form.interests}
                  onChange={e => update('interests', e.target.value)}
                  placeholder="e.g. Sustainable energy, Neural networks, Fine arts..."
                  rows={3}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-2">Future Goals</label>
                <textarea
                  value={form.goals}
                  onChange={e => update('goals', e.target.value)}
                  placeholder="e.g. Founding a tech startup, Becoming a research fellow..."
                  rows={3}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  required
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-error-container border border-error rounded text-on-error-container text-sm">
              {error}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button type="button" onClick={handlePrev} className="flex items-center gap-2 px-4 py-2 text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">arrow_back</span> Back
              </button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <button type="button" onClick={handleNext} className="ml-auto bg-primary text-on-primary px-8 py-3 rounded-lg font-bold text-label-md flex items-center gap-2 hover:bg-primary/90 transition-all">
                Next Step <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto bg-secondary text-on-secondary px-8 py-3 rounded-lg font-bold text-label-md flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Roadmap'} <span className="material-symbols-outlined">auto_awesome</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
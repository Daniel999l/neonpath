import { useState, useEffect } from 'react';

const levels = ['High School', 'Undergraduate', 'Graduate'];

export default function FormWizard({ onGenerate, loading, error, initialForm, onFormChange }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm || { name: '', level: 'Undergraduate', interests: '', goals: '' });
  const [validationError, setValidationError] = useState('');

  // Sync form changes to parent whenever form updates
  useEffect(() => {
    onFormChange(form);
  }, [form]);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!form.name.trim()) {
        setValidationError('Please enter your name before continuing.');
        return;
      }
    }
    setValidationError('');
    setStep(s => Math.min(s + 1, 3));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setValidationError('');
    setStep(s => Math.max(s - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    onGenerate(form);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && step < 3) {
      e.preventDefault();
      handleNext(e);
    }
  };

  return (
    <div className="w-full max-w-xl px-4">
      {/* Step Indicator */}
      <div className="flex items-center justify-center w-full mb-8 gap-2 md:gap-4 flex-wrap">
        {[1,2,3].map((num) => (
          <div key={num} className="flex items-center gap-1 md:gap-2">
            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-colors ${
              num === step ? 'step-active' : num < step ? 'step-complete' : 'bg-surface-container-high text-on-surface-variant opacity-50'
            }`}>
              {num < step ? (
                <span className="material-symbols-outlined text-xs md:text-sm">check</span>
              ) : (
                num
              )}
            </div>
            <span className={`text-xs md:text-label-md ${num === step ? 'text-on-surface font-bold' : num < step ? 'text-on-surface' : 'text-on-surface-variant opacity-50'}`}>
              {num === 1 ? 'Identity' : num === 2 ? 'Education' : 'Vision'}
            </span>
            {num < 3 && <div className="h-px w-6 md:w-12 bg-outline-variant"></div>}
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl p-6 md:p-8 border border-surface-container shadow-sm min-h-[300px] md:min-h-[400px] flex flex-col justify-between">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          {step === 1 && (
            <div className="space-y-5 md:space-y-6">
              <h2 className="text-lg md:text-headline-md mb-6 md:mb-8 text-on-surface">What should we call you?</h2>
              <div>
                <label className="block text-label-sm md:text-label-md text-on-surface-variant mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 md:p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  required
                />
              </div>
              <div className="p-3 md:p-4 rounded-lg bg-primary-container/10 border border-primary/10 flex gap-3 md:gap-4">
                <span className="material-symbols-outlined text-primary text-lg md:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <p className="text-body-sm md:text-body-md text-on-surface-variant">Your name helps our AI personalize the mentorship experience.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 md:space-y-6">
              <h2 className="text-lg md:text-headline-md mb-6 md:mb-8 text-on-surface">Your Academic Background</h2>
              <div>
                <label className="block text-label-sm md:text-label-md text-on-surface-variant mb-2">Current Academic Level</label>
                <div className="relative">
                  <select
                    value={form.level}
                    onChange={e => update('level', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 md:p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all cursor-pointer"
                  >
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 rounded-xl border border-surface-container hover:border-primary transition-colors cursor-pointer bg-surface">
                  <span className="material-symbols-outlined text-primary mb-1 md:mb-2">school</span>
                  <p className="text-xs md:text-label-sm text-on-surface">Academic focus</p>
                </div>
                <div className="p-3 md:p-4 rounded-xl border border-surface-container hover:border-primary transition-colors cursor-pointer bg-surface">
                  <span className="material-symbols-outlined text-primary mb-1 md:mb-2">terminal</span>
                  <p className="text-xs md:text-label-sm text-on-surface">Skill tracking</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 md:space-y-6">
              <h2 className="text-lg md:text-headline-md mb-6 md:mb-8 text-on-surface">Define Your Vision</h2>
              <div>
                <label className="block text-label-sm md:text-label-md text-on-surface-variant mb-2">Passions &amp; Interests</label>
                <textarea
                  value={form.interests}
                  onChange={e => update('interests', e.target.value)}
                  placeholder="e.g. Sustainable energy, Neural networks, Fine arts..."
                  rows={2}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 md:p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-label-sm md:text-label-md text-on-surface-variant mb-2">Future Goals</label>
                <textarea
                  value={form.goals}
                  onChange={e => update('goals', e.target.value)}
                  placeholder="e.g. Founding a tech startup, Becoming a research fellow..."
                  rows={2}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 md:p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  required
                />
              </div>
            </div>
          )}

          {(error || validationError) && (
            <div className="mt-4 p-3 bg-error-container border border-error rounded text-on-error-container text-xs md:text-sm">
              {validationError || error}
            </div>
          )}

          <div className="mt-6 md:mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button type="button" onClick={handlePrev} className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 text-label-sm md:text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-lg md:text-xl">arrow_back</span> Back
              </button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <button type="button" onClick={handleNext} className="ml-auto bg-primary text-on-primary px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold text-label-sm md:text-label-md flex items-center gap-1 md:gap-2 hover:bg-primary/90 transition-all">
                Next Step <span className="material-symbols-outlined text-lg md:text-xl">arrow_forward</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto bg-secondary text-on-secondary px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold text-label-sm md:text-label-md flex items-center gap-1 md:gap-2 hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Roadmap'} <span className="material-symbols-outlined text-lg md:text-xl">auto_awesome</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
import { useState } from 'react';

export default function ResultsDashboard({ roadmap, onReset }) {
  const [expandedProgram, setExpandedProgram] = useState(null);

  const toggleProgram = (index) => {
    setExpandedProgram(expandedProgram === index ? null : index);
  };

  return (
    <div className="w-full max-w-container-max mx-auto">
      {/* Hero Header */}
      <div className="mb-12">
        <h1 className="text-display-lg-mobile md:text-display-lg mb-6 text-on-surface">
          Your Roadmap: {roadmap.career_path}
        </h1>
        <div className="bg-surface-container-high p-8 rounded-xl max-w-4xl border border-outline-variant">
          <p className="text-body-lg text-on-surface-variant">{roadmap.summary}</p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
        {/* Skills to Learn */}
        <div className="md:col-span-8 professional-card p-6 md:p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-8 text-primary">
            <span className="material-symbols-outlined text-3xl">psychology</span>
            <h2 className="text-headline-md">Required Skills</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {roadmap.skills_to_learn?.map((skill, i) => (
              <div key={i} className="bg-surface-container p-5 rounded-lg border border-outline-variant">
                <span className="text-primary font-bold block mb-2">{skill}</span>
                <p className="text-label-sm text-on-surface-variant">Core competency for this career path.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="md:col-span-4 professional-card p-6 md:p-8 rounded-xl flex flex-col">
          <div className="mb-auto">
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <span className="material-symbols-outlined">payments</span>
              <h2 className="text-label-md uppercase tracking-widest font-semibold">Compensation Insight</h2>
            </div>
            <div className="text-display-lg-mobile font-bold text-on-surface">{roadmap.estimated_salary_range}</div>
            <p className="text-label-sm text-on-surface-variant mt-1">Average annual base salary range</p>
          </div>
          <div className="h-28 w-full mt-6 bg-surface-container-low rounded-lg p-2 border border-outline-variant/30 overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0 25 L 15 22 L 30 18 L 45 20 L 60 12 L 75 14 L 90 6 L 100 8" fill="none" stroke="#004ac6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              <path d="M0 25 L 15 22 L 30 18 L 45 20 L 60 12 L 75 14 L 90 6 L 100 8 V 30 H 0 Z" fill="#004ac6" fillOpacity="0.08"></path>
              <line stroke="#737686" strokeDasharray="2" strokeWidth="0.2" x1="0" x2="100" y1="5" y2="5"></line>
              <line stroke="#737686" strokeDasharray="2" strokeWidth="0.2" x1="0" x2="100" y1="15" y2="15"></line>
              <line stroke="#737686" strokeDasharray="2" strokeWidth="0.2" x1="0" x2="100" y1="25" y2="25"></line>
            </svg>
          </div>
        </div>

        {/* Next Steps / Milestones */}
        <div className="md:col-span-5 professional-card p-6 md:p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-8 text-secondary">
            <span className="material-symbols-outlined text-3xl">rocket_launch</span>
            <h2 className="text-headline-md">Milestones</h2>
          </div>
          <ul className="space-y-6">
            {roadmap.next_steps?.map((step, i) => (
              <li key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  i === 0 ? 'bg-secondary-container' : 'bg-surface-container-highest border border-outline'
                }`}>
                  <span className={i === 0 ? 'material-symbols-outlined text-on-secondary-container text-lg font-bold' : 'material-symbols-outlined text-outline text-lg'}>
                    {i === 0 ? 'check' : 'radio_button_unchecked'}
                  </span>
                </div>
                <div>
                  <span className="text-label-md text-on-surface font-semibold">{step}</span>
                  <p className="text-body-md text-on-surface-variant mt-1">Actionable milestone on your roadmap.</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Courses */}
        <div className="md:col-span-7 professional-card p-6 md:p-8 rounded-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-3xl">school</span>
              <h2 className="text-headline-md">Curated Learning</h2>
            </div>
          </div>
          <div className="space-y-4">
            {roadmap.recommended_courses?.map((course, i) => (
              <a
                key={i}
                href={course.url || '#'}
                target={course.url ? '_blank' : undefined}
                rel={course.url ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between p-5 bg-white rounded-xl border border-outline-variant hover:border-primary hover:bg-primary-container/10 transition-all group"
              >
                <div className="flex flex-col">
                  <span className="text-label-md text-on-surface group-hover:text-primary font-bold">{course.course_name}</span>
                  <span className="text-label-sm text-on-surface-variant">{course.platform} — {course.reason}</span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            ))}
          </div>
        </div>

        {/* College Programs with accordion */}
        <div className="md:col-span-12 professional-card p-6 md:p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-8 text-on-surface">
            <span className="material-symbols-outlined text-3xl">account_balance</span>
            <h2 className="text-headline-md">Top Academic Programs</h2>
          </div>
          <div className="space-y-4">
            {roadmap.college_programs?.map((prog, i) => (
              <div key={i} className="border border-outline-variant rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleProgram(i)}
                  className="w-full flex items-center gap-4 p-5 bg-white hover:bg-surface-container-low transition-colors text-left"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-headline-md text-on-surface">{prog.program_name}</h3>
                    <p className="text-body-md text-on-surface-variant">{prog.institution_examples?.join(', ')}</p>
                  </div>
                  <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${expandedProgram === i ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {expandedProgram === i && (
                  <div className="px-5 pb-5 pl-[72px] animate-slide-down">
                    <p className="text-body-md text-on-surface-variant">{prog.relevance}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col items-center gap-6 mt-16 border-t border-outline-variant pt-12">
        <button
          onClick={onReset}
          className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-on-primary px-10 py-3 rounded-full text-label-md font-bold active:scale-95 transition-all"
        >
          Restart Assessment
        </button>
        <p className="text-label-sm text-outline">Generated by NeonPath Intelligence • Confidential Roadmap Analysis</p>
      </div>
    </div>
  );
}
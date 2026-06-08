export default function ResultsDashboard({ roadmap, onReset }) {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-white rounded-xl p-8 border border-surface-container shadow-sm">
        <h2 className="text-headline-md text-primary mb-2">{roadmap.career_path}</h2>
        <p className="text-body-md text-on-surface-variant italic">{roadmap.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Skills to Learn" items={roadmap.skills_to_learn} />
        <Card title="Next Steps" items={roadmap.next_steps} />
      </div>

      {roadmap.recommended_courses?.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-surface-container shadow-sm">
          <h3 className="text-headline-md text-primary mb-3">Recommended Courses</h3>
          <div className="space-y-3">
            {roadmap.recommended_courses.map((course, i) => (
              <div key={i} className="border-l-4 border-primary-container pl-4">
                <p className="text-on-surface font-semibold">
                  {course.url ? (
                    <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {course.course_name} ↗
                    </a>
                  ) : (
                    course.course_name
                  )}
                </p>
                <p className="text-sm text-on-surface-variant">{course.platform} — {course.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {roadmap.college_programs?.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-surface-container shadow-sm">
          <h3 className="text-headline-md text-secondary mb-3">College Programs</h3>
          <div className="space-y-3">
            {roadmap.college_programs.map((prog, i) => (
              <div key={i} className="border-l-4 border-secondary-container pl-4">
                <p className="text-on-surface font-semibold">{prog.program_name}</p>
                <p className="text-sm text-on-surface-variant">{prog.institution_examples?.join(', ')}</p>
                <p className="text-xs text-on-surface-variant mt-1">{prog.relevance}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 border border-surface-container shadow-sm text-center">
        <h3 className="text-body-lg text-primary mb-1">Estimated Salary Range</h3>
        <p className="text-2xl font-bold text-secondary">{roadmap.estimated_salary_range}</p>
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold text-label-md hover:bg-primary/90 transition-all"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}

function Card({ title, items }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-surface-container shadow-sm border-l-4 border-primary-container">
      <h3 className="text-headline-md text-primary mb-3">{title}</h3>
      <ul className="space-y-2">
        {items?.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-on-surface-variant">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
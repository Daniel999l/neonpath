export default function ResultsDashboard({ roadmap, onReset }) {
  return (
    <div className="space-y-6">
      <div className="bg-neon-card border border-neon-border rounded-xl p-8 shadow-neon-pink">
        <h2 className="text-3xl font-display text-neon-pink mb-2">{roadmap.career_path}</h2>
        <p className="text-gray-400 italic">{roadmap.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Skills to Learn" items={roadmap.skills_to_learn} color="cyan" />
        <Card title="Next Steps" items={roadmap.next_steps} color="pink" />
      </div>

      {roadmap.recommended_courses?.length > 0 && (
        <div className="bg-neon-card border border-neon-border rounded-xl p-6">
          <h3 className="text-xl font-display text-neon-cyan mb-3">Recommended Courses</h3>
          <div className="space-y-3">
            {roadmap.recommended_courses.map((course, i) => (
              <div key={i} className="border-l-4 border-neon-cyan pl-4">
                <p className="text-white font-semibold">
                  {course.url ? (
                    <a href={course.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {course.course_name} ↗
                    </a>
                  ) : (
                    course.course_name
                  )}
                </p>
                <p className="text-gray-400 text-sm">{course.platform} — {course.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {roadmap.college_programs?.length > 0 && (
        <div className="bg-neon-card border border-neon-border rounded-xl p-6">
          <h3 className="text-xl font-display text-neon-pink mb-3">College Programs</h3>
          <div className="space-y-3">
            {roadmap.college_programs.map((prog, i) => (
              <div key={i} className="border-l-4 border-neon-pink pl-4">
                <p className="text-white font-semibold">{prog.program_name}</p>
                <p className="text-gray-400 text-sm">{prog.institution_examples?.join(', ')}</p>
                <p className="text-gray-500 text-xs mt-1">{prog.relevance}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-neon-card border border-neon-border rounded-xl p-6 text-center">
        <h3 className="text-lg font-display text-neon-cyan mb-1">Estimated Salary Range</h3>
        <p className="text-2xl font-bold text-neon-pink">{roadmap.estimated_salary_range}</p>
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
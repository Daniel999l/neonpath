import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateRoadmap({ name, interests, goals, level }) {
  const prompt = `You are an expert career and college advisor for students. Based on the following student profile, generate a concise, structured career and education roadmap in JSON format.

Student profile:
- Name: ${name}
- Current level (high school / undergraduate / graduate): ${level}
- Interests / subjects they enjoy: ${interests}
- Life goals / career ambitions: ${goals}

Output JSON with this structure:
{
  "career_path": "A specific career title",
  "summary": "A 1-2 sentence explanation of why this path suits them.",
  "skills_to_learn": ["skill 1", "skill 2", ...],
  "recommended_courses": [
    {
      "course_name": "Name of online course or program",
      "platform": "Coursera / edX / etc",
      "reason": "Why this course helps"
    }
  ],
  "college_programs": [
    {
      "program_name": "Degree or major",
      "institution_examples": ["University A", "University B"],
      "relevance": "How it prepares for the career"
    }
  ],
  "next_steps": ["step 1", "step 2", "step 3"],
  "estimated_salary_range": "$X - $Y per year (entry to mid level)"
}

Return ONLY the JSON object, no markdown formatting.`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.6,
    max_tokens: 800,
  });

  const raw = completion.choices[0]?.message?.content?.trim();
  if (!raw) throw new Error('Empty response from Groq');

  let clean = raw.trim();
  const fence = String.fromCharCode(96).repeat(3);
  clean = clean.split(fence + 'json').join('');
  clean = clean.split(fence).join('');
  clean = clean.trim();
  return JSON.parse(clean);
}
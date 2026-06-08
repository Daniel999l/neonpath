export default function LandingPage({ onStart }) {
  return (
    <main className="relative min-h-screen pt-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 px-margin-mobile md:px-margin-desktop py-16 md:py-32 flex flex-col items-center text-center max-w-container-max mx-auto">
        <div className="hero-pattern absolute inset-0 -z-10 opacity-50"></div>
        <div className="inline-flex items-center gap-2 bg-surface-container-high border border-outline-variant/50 rounded-full px-4 py-1 mb-8 shadow-sm">
          <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Professional Pathfinding Platform</span>
        </div>
        <h1 className="text-display-lg-mobile md:text-display-lg mb-6 max-w-4xl tracking-tight text-on-surface">
          Your Future, <span className="text-primary">Powered by AI.</span>
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mb-12">
          Get a personalized career and college roadmap in seconds. Data-driven insights built for student success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onStart}
            className="bg-primary text-white px-10 py-4 rounded-xl text-[18px] font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Create My Roadmap
          </button>
          <button className="bg-white border border-outline-variant text-on-surface px-10 py-4 rounded-xl text-[18px] font-semibold hover:bg-surface-container transition-all active:scale-95">
            View Demo
          </button>
        </div>
      </section>

      {/* AI Insight Panel */}
      <section className="px-margin-mobile md:px-margin-desktop py-24 bg-white/50 border-y border-outline-variant/30">
        <div className="max-w-4xl mx-auto rounded-3xl p-[1px] bg-outline-variant overflow-hidden">
          <div className="bg-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className="text-label-sm text-primary uppercase font-bold tracking-widest bg-primary/10 px-3 py-1 rounded">Analysis Preview</span>
            </div>
            <h2 className="text-[28px] leading-tight text-on-surface mb-6 font-semibold">
              &ldquo;Based on your profile, your ideal trajectory is <span className="text-primary">Quantum Computing Research</span>.&rdquo;
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-8 border-l-4 border-primary/20 pl-6 italic">
              &ldquo;Your strength in mathematics and creative problem solving aligns perfectly with emerging roles in post-quantum cryptography. We recommend a focus on linear algebra and specialized internships.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-xl">psychology</span>
              </div>
              <div>
                <p className="text-label-md text-on-surface font-semibold">NeonPath Intelligence v3.0</p>
                <p className="text-label-sm text-on-surface-variant">Confidence Score: 98%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
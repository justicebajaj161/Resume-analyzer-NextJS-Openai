'use client' // This makes it a Client Component
import Link from 'next/link'

const Landing = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to Resume Analyzer
            </h1>
            <p className="text-lg mb-6">
              Get personalized feedback on your resume and make it ATS-friendly in just a few clicks.
            </p>
            <Link 
              href="/upload"
              className="btn btn-primary py-2 px-6 rounded-full"
            >
              Analyze My Resume
            </Link>
          </div>
        </div>
      </div>
      
      
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Why Choose Resume Analyzer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">ATS Optimization</h3>
              <p>
                Make sure your resume passes through ATS filters with ease.
              </p>
            </div>
            <div className="card shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Personalized Feedback</h3>
              <p>
                Get suggestions and improvements specific to your profile.
              </p>
            </div>
            <div className="card shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Fast and Easy</h3>
              <p>
                Simply upload your resume and get instant feedback to improve your chances.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">Take the first step towards a polished resume today!</p>
          <button
            className="btn btn-accent py-2 px-6 rounded-full"
            onClick={scrollToTop}
          >
            Get Started
          </button>
        </div>
      </div>

    </div>
  );
}

export default Landing;
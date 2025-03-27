'use client'

const AnalysisResults = ({ analysis = {} }) => {
  // Default empty state matching our expected structure
  const defaultAnalysis = {
    skills: { exists: false, feedback: "", improvements: [] },
    education: { exists: false, feedback: "", improvements: [] },
    experience: { exists: false, feedback: "", improvements: [] },
    projects: { exists: false, feedback: "", improvements: [] },
    contact: { exists: false, feedback: "", improvements: [] }
  };

  // Merge with actual data
  const fullAnalysis = { ...defaultAnalysis, ...analysis };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Resume Analysis Results</h1>
        
        <div className="space-y-4">
          {Object.entries(fullAnalysis).map(([section, data]) => (
            <div key={section} className="card bg-base-200 shadow">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title capitalize">{section}</h2>
                  <span className={`badge ${data.exists ? 'badge-success' : 'badge-error'}`}>
                    {data.exists ? 'Present' : 'Missing'}
                  </span>
                </div>

                {data.exists && (
                  <>
                    <p className="mt-2">{data.feedback}</p>
                    
                    {data.improvements.length > 0 && (
                      <div className="mt-3">
                        <h3 className="font-semibold">Improvements:</h3>
                        <ul className="list-disc pl-5">
                          {data.improvements.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {!data.exists && (
                  <div className="mt-3">
                    <h3 className="font-semibold">Suggestions:</h3>
                    <ul className="list-disc pl-5">
                      {data.improvements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
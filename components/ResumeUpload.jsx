'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ResumeUpload = () => {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file first')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('filename', file.name) // Send filename for reference

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      router.push(`/results?analysis=${encodeURIComponent(JSON.stringify(data))}`)
    } catch (error) {
      console.error('Upload failed:', error)
      setError(error.message || 'Failed to analyze resume. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Upload Your Resume</h2>
          <p>We support PDF files</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs mt-4">
              <input 
                type="file" 
                className="file-input file-input-bordered w-full max-w-xs" 
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
            </div>
            
            {error && (
              <div className="alert alert-error mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div className="card-actions justify-end mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload Resume'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResumeUpload
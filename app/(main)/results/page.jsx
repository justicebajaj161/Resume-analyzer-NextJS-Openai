'use client'
import { useSearchParams } from 'next/navigation'
import AnalysisResults from '@/components/AnalysisResults'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const analysisParam = searchParams.get('analysis')
  const analysis = analysisParam ? JSON.parse(decodeURIComponent(analysisParam)) : null

  return <AnalysisResults analysis={analysis} />
}
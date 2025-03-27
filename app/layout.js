import './globals.css'

export const metadata = {
  title: 'Resume Analyzer',
  description: 'Get feedback on your resume',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="garden" suppressHydrationWarning={true}>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}

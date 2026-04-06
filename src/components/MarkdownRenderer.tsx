'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-blue max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-medium text-gray-800 mb-3 mt-4">{children}</h3>,
          p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="text-gray-700">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className
            if (isInline) {
              return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">{children}</code>
            }
            return (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                <code className="text-sm font-mono">{children}</code>
              </pre>
            )
          },
          a: ({ href, children }) => (
            <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
          th: ({ children }) => <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{children}</th>,
          td: ({ children }) => <td className="px-4 py-2 text-sm text-gray-700 border-t border-gray-200">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

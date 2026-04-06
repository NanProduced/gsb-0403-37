import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { issuesApi } from '@/lib/api'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface Props {
  params: { id: string }
}

export default async function IssuePage({ params }: Props) {
  const issue = await issuesApi.getById(params.id)

  if (!issue || issue.status !== 'approved') {
    notFound()
  }

  const displayAuthor = issue.isAnonymous ? '匿名' : issue.author
  const date = new Date(issue.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回首页
      </Link>

      <article className="bg-white rounded-lg border border-gray-200 p-8">
        <header className="mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{issue.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{displayAuthor}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </header>

        <MarkdownRenderer content={issue.content} />
      </article>
    </div>
  )
}

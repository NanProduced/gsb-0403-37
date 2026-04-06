import Link from 'next/link'
import { Issue } from '@/types'

interface Props {
  issue: Issue
}

export default function IssueCard({ issue }: Props) {
  const displayAuthor = issue.isAnonymous ? '匿名' : issue.author
  const date = new Date(issue.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/issues/${issue.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{issue.title}</h2>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{displayAuthor}</span>
        <span>•</span>
        <span>{date}</span>
      </div>
    </Link>
  )
}

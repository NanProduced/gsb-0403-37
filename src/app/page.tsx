import Link from 'next/link'
import { issuesApi } from '@/lib/api'
import IssueCard from '@/components/IssueCard'

export default async function Home() {
  const issues = await issuesApi.getApproved()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">欢迎来到周刊</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          分享你的想法，交流你的见解。支持 Markdown 格式，匿名投稿可选。
        </p>
        <div className="mt-8">
          <Link
            href="/submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            立即投稿
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">最新周刊</h2>
        {issues.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">暂无周刊，快来投稿吧！</p>
          </div>
        ) : (
          issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        )}
      </div>
    </div>
  )
}

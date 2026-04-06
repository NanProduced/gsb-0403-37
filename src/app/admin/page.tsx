'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, Check, X, LogOut } from 'lucide-react'
import { issuesApi, authApi } from '@/lib/api'
import { Issue } from '@/types'

export default function AdminPage() {
  const router = useRouter()
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadIssues()
  }, [])

  const loadIssues = async () => {
    try {
      const data = await issuesApi.getAll()
      setIssues(data)
    } catch (error) {
      console.error('加载失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    setActionLoading(id)
    try {
      await issuesApi.update(id, { status: 'approved' })
      await loadIssues()
    } catch (error) {
      console.error('审核失败:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    setActionLoading(id)
    try {
      await issuesApi.update(id, { status: 'rejected' })
      await loadIssues()
    } catch (error) {
      console.error('拒绝失败:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除吗？')) return
    setActionLoading(id)
    try {
      await issuesApi.delete(id)
      await loadIssues()
    } catch (error) {
      console.error('删除失败:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleLogout = async () => {
    try {
      await authApi.logout()
      router.push('/admin/login')
    } catch (error) {
      console.error('退出失败:', error)
    }
  }

  const pendingIssues = issues.filter((issue) => issue.status === 'pending')
  const approvedIssues = issues.filter((issue) => issue.status === 'approved')
  const rejectedIssues = issues.filter((issue) => issue.status === 'rejected')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            待审核
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            已通过
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            已拒绝
          </span>
        )
      default:
        return null
    }
  }

  const renderIssueList = (title: string, issuesList: Issue[]) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title} ({issuesList.length})</h2>
      {issuesList.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-gray-500">暂无内容</p>
        </div>
      ) : (
        <div className="space-y-4">
          {issuesList.map((issue) => (
            <div key={issue.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{issue.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{issue.isAnonymous ? '匿名' : issue.author}</span>
                    <span>•</span>
                    <span>{issue.email}</span>
                    <span>•</span>
                    <span>{new Date(issue.createdAt).toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(issue.status)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/issues/${issue.id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  查看
                </Link>

                {issue.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(issue.id)}
                      disabled={actionLoading === issue.id}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      通过
                    </button>
                    <button
                      onClick={() => handleReject(issue.id)}
                      disabled={actionLoading === issue.id}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                    >
                      <X className="w-4 h-4 mr-1" />
                      拒绝
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDelete(issue.id)}
                  disabled={actionLoading === issue.id}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">管理后台</h1>
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </button>
      </div>

      {renderIssueList('待审核', pendingIssues)}
      {renderIssueList('已通过', approvedIssues)}
      {renderIssueList('已拒绝', rejectedIssues)}
    </div>
  )
}

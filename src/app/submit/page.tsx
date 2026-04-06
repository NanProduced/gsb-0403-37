'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { issuesApi } from '@/lib/api'

interface FormData {
  title: string
  content: string
  author: string
  email: string
  isAnonymous: boolean
}

export default function SubmitPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      isAnonymous: false,
    },
  })

  const isAnonymous = watch('isAnonymous')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await issuesApi.create({
        title: data.title,
        content: data.content,
        author: data.author || '匿名',
        email: data.email,
        isAnonymous: data.isAnonymous,
        status: 'pending',
      })
      setSubmitSuccess(true)
    } catch (error) {
      console.error('提交失败:', error)
      alert('提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">提交成功！</h2>
          <p className="text-gray-600 mb-6">
            你的投稿已提交审核，审核通过后将在首页显示。
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">投稿</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              {...register('title', { required: '请输入标题' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入标题"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              正文 <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs ml-2">(支持 Markdown)</span>
            </label>
            <textarea
              id="content"
              rows={15}
              {...register('content', { required: '请输入正文' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="请输入正文内容，支持 Markdown 格式..."
            />
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAnonymous"
              {...register('isAnonymous')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
              匿名投稿
            </label>
          </div>

          {!isAnonymous && (
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                作者 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                {...register('author', { required: '请输入作者名称' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入作者名称"
              />
              {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              邮箱 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: '请输入邮箱',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '请输入有效的邮箱地址',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入邮箱地址"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            <p className="mt-1 text-xs text-gray-500">邮箱用于联系你，不会公开显示</p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '提交中...' : '提交投稿'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { Issue, User } from '@/types'

let mockIssues: Issue[] = [
  {
    id: '1',
    title: '欢迎来到周刊',
    content: `# 欢迎来到周刊

这是一个简单的周刊平台，用于分享和交流想法。

## 功能特点

- 支持 Markdown 渲染
- 匿名投稿选项
- 管理员审核机制
- 响应式设计

## 如何使用

1. 点击"投稿"按钮提交你的内容
2. 填写必要信息（可以选择匿名）
3. 等待管理员审核
4. 审核通过后即可在首页看到

祝你使用愉快！`,
    author: '系统管理员',
    email: 'admin@example.com',
    isAnonymous: false,
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    isAdmin: true,
  },
]

export const mockData = {
  issues: {
    getAll: async (): Promise<Issue[]> => {
      return [...mockIssues]
    },
    getApproved: async (): Promise<Issue[]> => {
      return mockIssues.filter(issue => issue.status === 'approved')
    },
    getById: async (id: string): Promise<Issue | null> => {
      return mockIssues.find(issue => issue.id === id) || null
    },
    create: async (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue> => {
      const newIssue: Issue = {
        ...issue,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockIssues.push(newIssue)
      return newIssue
    },
    update: async (id: string, updates: Partial<Issue>): Promise<Issue | null> => {
      const index = mockIssues.findIndex(issue => issue.id === id)
      if (index === -1) return null
      mockIssues[index] = {
        ...mockIssues[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }
      return mockIssues[index]
    },
    delete: async (id: string): Promise<boolean> => {
      const index = mockIssues.findIndex(issue => issue.id === id)
      if (index === -1) return false
      mockIssues.splice(index, 1)
      return true
    },
  },
  users: {
    getByEmail: async (email: string): Promise<User | null> => {
      return mockUsers.find(user => user.email === email) || null
    },
  },
}

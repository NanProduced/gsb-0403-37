export interface Issue {
  id: string
  title: string
  content: string
  author: string
  email: string
  isAnonymous: boolean
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  isAdmin: boolean
}

import { config } from './config'
import { mockData } from './mock-data'
import { supabase, supabaseApi } from './supabase'
import { Issue } from '@/types'

const api = config.useMock ? mockData : supabaseApi

export const issuesApi = api.issues

export const authApi = {
  login: async (email: string, password: string): Promise<{ user: any; isAdmin: boolean }> => {
    if (config.useMock) {
      if (email === config.adminEmail && password === config.adminPassword) {
        return { user: { id: '1', email }, isAdmin: true }
      }
      throw new Error('Invalid credentials')
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.user.id)
      .single()
    return { user: data.user, isAdmin: profile?.is_admin || false }
  },
  logout: async () => {
    if (config.useMock) {
      return
    }
    await supabase.auth.signOut()
  },
}

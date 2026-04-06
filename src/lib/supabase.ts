import { createClient } from '@supabase/supabase-js'
import { config } from './config'
import { Issue } from '@/types'

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey)

export const supabaseApi = {
  issues: {
    getAll: async (): Promise<Issue[]> => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
    getApproved: async (): Promise<Issue[]> => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
    getById: async (id: string): Promise<Issue | null> => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    create: async (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue> => {
      const { data, error } = await supabase
        .from('issues')
        .insert(issue)
        .select()
        .single()
      if (error) throw error
      return data
    },
    update: async (id: string, updates: Partial<Issue>): Promise<Issue | null> => {
      const { data, error } = await supabase
        .from('issues')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data
    },
    delete: async (id: string): Promise<boolean> => {
      const { error } = await supabase
        .from('issues')
        .delete()
        .eq('id', id)
      if (error) throw error
      return true
    },
  },
}

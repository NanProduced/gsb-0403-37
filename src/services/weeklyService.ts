import { mockData } from '../lib/mockData';
import { Weekly } from '../types';

const useMock = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL;

let supabase: any;
if (!useMock) {
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  supabase = createClient(supabaseUrl, supabaseKey);
}

export const weeklyService = {
  getWeeklies: async (): Promise<Weekly[]> => {
    if (useMock) {
      return mockData.getWeeklies();
    }
    
    const { data, error } = await supabase
      .from('weeklies')
      .select('*')
      .eq('status', 'approved')
      .order('createdAt', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  getWeeklyById: async (id: string): Promise<Weekly | null> => {
    if (useMock) {
      return mockData.getWeeklyById(id);
    }
    
    const { data, error } = await supabase
      .from('weeklies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return null;
    }
    
    return data;
  },
  
  getPendingWeeklies: async (): Promise<Weekly[]> => {
    if (useMock) {
      return mockData.getPendingWeeklies();
    }
    
    const { data, error } = await supabase
      .from('weeklies')
      .select('*')
      .eq('status', 'pending')
      .order('createdAt', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  createWeekly: async (weekly: Omit<Weekly, 'id' | 'createdAt' | 'updatedAt'>): Promise<Weekly> => {
    if (useMock) {
      return mockData.createWeekly(weekly);
    }
    
    const { data, error } = await supabase
      .from('weeklies')
      .insert(weekly)
      .select('*')
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  updateWeeklyStatus: async (id: string, status: 'approved' | 'rejected'): Promise<Weekly> => {
    if (useMock) {
      return mockData.updateWeeklyStatus(id, status);
    }
    
    const { data, error } = await supabase
      .from('weeklies')
      .update({ status, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  deleteWeekly: async (id: string): Promise<void> => {
    if (useMock) {
      return mockData.deleteWeekly(id);
    }
    
    const { error } = await supabase
      .from('weeklies')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
  },
};
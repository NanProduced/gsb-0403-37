export interface Weekly {
  id: string;
  title: string;
  content: string;
  author: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface SubmitFormData {
  title: string;
  content: string;
  author: string;
  email: string;
}
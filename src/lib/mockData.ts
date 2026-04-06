import { Weekly } from '../types';

let weeklies: Weekly[] = [
  {
    id: '1',
    title: '第一期周刊',
    content: '# 欢迎来到第一期周刊\n\n这是一个测试内容，使用markdown格式。\n\n## 二级标题\n\n- 列表项1\n- 列表项2\n\n```javascript\nconsole.log("Hello World");\n```',
    author: '测试用户',
    email: 'test@example.com',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '第二期周刊',
    content: '# 第二期周刊内容\n\n这是第二期的测试内容。',
    author: '匿名用户',
    email: 'anonymous@example.com',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockData = {
  getWeeklies: async (): Promise<Weekly[]> => {
    return weeklies.filter(w => w.status === 'approved');
  },
  getWeeklyById: async (id: string): Promise<Weekly | null> => {
    return weeklies.find(w => w.id === id) || null;
  },
  getPendingWeeklies: async (): Promise<Weekly[]> => {
    return weeklies.filter(w => w.status === 'pending');
  },
  createWeekly: async (weekly: Omit<Weekly, 'id' | 'createdAt' | 'updatedAt'>): Promise<Weekly> => {
    const newWeekly: Weekly = {
      ...weekly,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    weeklies.push(newWeekly);
    return newWeekly;
  },
  updateWeeklyStatus: async (id: string, status: 'approved' | 'rejected'): Promise<Weekly> => {
    const index = weeklies.findIndex(w => w.id === id);
    if (index !== -1) {
      weeklies[index] = {
        ...weeklies[index],
        status,
        updatedAt: new Date().toISOString(),
      };
      return weeklies[index];
    }
    throw new Error('Weekly not found');
  },
  deleteWeekly: async (id: string): Promise<void> => {
    weeklies = weeklies.filter(w => w.id !== id);
  },
};
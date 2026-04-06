import { weeklyService } from '../../../src/services/weeklyService';
import ReactMarkdown from 'react-markdown';
import Navbar from '../../../src/components/Navbar';

export default async function WeeklyDetail({ params }: { params: { id: string } }) {
  const weekly = await weeklyService.getWeeklyById(params.id);

  if (!weekly) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">周刊不存在</h1>
          <p className="text-gray-600">您访问的周刊不存在或已被删除。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{weekly.title}</h1>
          <div className="flex justify-between items-center mb-6 text-gray-600">
            <p>作者: {weekly.author}</p>
            <p className="text-sm">
              发布时间: {new Date(weekly.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="prose max-w-none">
            <ReactMarkdown>{weekly.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
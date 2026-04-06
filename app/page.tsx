import { weeklyService } from '../src/services/weeklyService';
import Link from 'next/link';
import Navbar from '../src/components/Navbar';

export default async function Home() {
  const weeklies = await weeklyService.getWeeklies();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">周刊列表</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeklies.map((weekly) => (
            <div key={weekly.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{weekly.title}</h2>
              <p className="text-gray-600 mb-4">作者: {weekly.author}</p>
              <p className="text-gray-500 text-sm mb-4">
                发布时间: {new Date(weekly.createdAt).toLocaleString()}
              </p>
              <Link
                href={`/weekly/${weekly.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                阅读全文
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
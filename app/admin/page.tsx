import { weeklyService } from '../../src/services/weeklyService';
import { Weekly } from '../../src/types';
import Navbar from '../../src/components/Navbar';

export default async function AdminPage() {
  const pendingWeeklies = await weeklyService.getPendingWeeklies();
  const approvedWeeklies = await weeklyService.getWeeklies();

  const handleApprove = async (id: string) => {
    try {
      await weeklyService.updateWeeklyStatus(id, 'approved');
      window.location.reload();
    } catch (error) {
      console.error('审核失败:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await weeklyService.updateWeeklyStatus(id, 'rejected');
      window.location.reload();
    } catch (error) {
      console.error('拒绝失败:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这篇周刊吗？')) {
      try {
        await weeklyService.deleteWeekly(id);
        window.location.reload();
      } catch (error) {
        console.error('删除失败:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">管理后台</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">待审核投稿</h2>
          {pendingWeeklies.length === 0 ? (
            <p className="text-gray-600">暂无待审核投稿</p>
          ) : (
            <div className="space-y-4">
              {pendingWeeklies.map((weekly) => (
                <div key={weekly.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{weekly.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(weekly.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        批准
                      </button>
                      <button
                        onClick={() => handleReject(weekly.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        拒绝
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">作者: {weekly.author}</p>
                  <p className="text-gray-500 text-sm mb-4">邮箱: {weekly.email}</p>
                  <p className="text-gray-600 mb-4">
                    提交时间: {new Date(weekly.createdAt).toLocaleString()}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700">{weekly.content.substring(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">已发布周刊</h2>
          {approvedWeeklies.length === 0 ? (
            <p className="text-gray-600">暂无已发布周刊</p>
          ) : (
            <div className="space-y-4">
              {approvedWeeklies.map((weekly) => (
                <div key={weekly.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{weekly.title}</h3>
                    <button
                      onClick={() => handleDelete(weekly.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      删除
                    </button>
                  </div>
                  <p className="text-gray-600 mb-2">作者: {weekly.author}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    发布时间: {new Date(weekly.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
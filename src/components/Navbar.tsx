import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">周刊网站</Link>
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-300">首页</Link>
          <Link href="/submit" className="hover:text-gray-300">投稿</Link>
          <Link href="/admin" className="hover:text-gray-300">管理后台</Link>
        </div>
      </div>
    </nav>
  );
}
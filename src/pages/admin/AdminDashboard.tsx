import AdminLayout from '@/components/AdminLayout'
import { Package, Newspaper, Building, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { name: '产品总数', value: '0', icon: Package, color: 'bg-blue-500' },
    { name: '新闻总数', value: '0', icon: Newspaper, color: 'bg-green-500' },
    { name: '企业信息', value: '1', icon: Building, color: 'bg-purple-500' },
    { name: '访问量', value: '0', icon: TrendingUp, color: 'bg-orange-500' },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">控制台</h1>
        <p className="text-gray-600 mt-2">欢迎使用企业后台管理系统</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm p-6 card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-4 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">快速操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Package className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">添加产品</p>
          </a>
          <a
            href="/admin/news"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Newspaper className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">发布新闻</p>
          </a>
          <a
            href="/admin/settings"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Building className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">企业设置</p>
          </a>
        </div>
      </div>
    </AdminLayout>
  )
}

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { useSeo, PageType } from '@/hooks/useSeo'

const pageConfig: { type: PageType; name: string }[] = [
  { type: 'home', name: '首页' },
  { type: 'products', name: '产品中心' },
  { type: 'cases', name: '客户案例' },
  { type: 'news', name: '新闻中心' },
  { type: 'contact', name: '联系我们' },
]

export default function AdminSeo() {
  const { seoSettings, loading, fetchSeoSettings, updateSeoSetting } = useSeo()
  const [activePage, setActivePage] = useState<PageType>('home')
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchSeoSettings()
  }, [])

  useEffect(() => {
    if (seoSettings[activePage]) {
      setTitle(seoSettings[activePage]?.title || '')
      setKeywords(seoSettings[activePage]?.keywords || '')
      setDescription(seoSettings[activePage]?.description || '')
    } else {
      setTitle('')
      setKeywords('')
      setDescription('')
    }
  }, [activePage, seoSettings])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    const success = await updateSeoSetting(activePage, {
      title,
      keywords,
      description,
    })

    if (success) {
      setMessage({ type: 'success', text: 'SEO 设置保存成功' })
    } else {
      setMessage({ type: 'error', text: 'SEO 设置保存失败' })
    }

    setSaving(false)
    setTimeout(() => setMessage(null), 3000)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">加载中...</div>
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO 优化设置</h1>
        <p className="text-gray-600">为各个页面设置标题、关键词和描述，提升搜索引擎排名</p>
      </div>

      {/* Page Tabs */}
      <div className="mb-8 border-b">
        <div className="flex space-x-4">
          {pageConfig.map((page) => (
            <button
              key={page.type}
              onClick={() => setActivePage(page.type)}
              className={`px-6 py-3 font-medium transition-colors ${
                activePage === page.type
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              页面标题 (Title)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入页面标题，建议 50-60 个字符"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={255}
            />
            <p className="mt-2 text-sm text-gray-500">
              显示在浏览器标签页和搜索结果中，当前长度：{title.length}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              关键词 (Keywords)
            </label>
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="请输入关键词，用逗号分隔，如：产品 A, 产品 B, 行业名称"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-500">
              帮助搜索引擎理解页面内容，多个关键词请用英文逗号或中文逗号分隔
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              页面描述 (Description)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入页面描述，建议 150-160 个字符"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={500}
            />
            <p className="mt-2 text-sm text-gray-500">
              显示在搜索结果下方作为摘要，当前长度：{description.length}
            </p>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? '保存中...' : '保存设置'}
            </button>

            <button
              onClick={() => {
                if (seoSettings[activePage]) {
                  setTitle(seoSettings[activePage].title || '')
                  setKeywords(seoSettings[activePage].keywords || '')
                  setDescription(seoSettings[activePage].description || '')
                }
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              重置
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-3">SEO 优化建议：</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>标题：</strong>包含核心关键词，长度控制在 50-60 个字符</li>
          <li>• <strong>关键词：</strong>选择 3-5 个与页面内容高度相关的关键词</li>
          <li>• <strong>描述：</strong>简洁明了地概括页面内容，吸引用户点击，长度控制在 150-160 个字符</li>
          <li>• <strong>独特性：</strong>每个页面应该有独特的标题和描述</li>
        </ul>
      </div>
    </div>
    </AdminLayout>
  )
}

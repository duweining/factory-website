import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react'
import { NewsS8B8A8A895Row, NewsS8B8A8A895Insert } from '@/types/database'
import { supabase } from '@/lib/supabase'

export default function AdminNews() {
  const [news, setNews] = useState<NewsS8B8A8A895Row[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsS8B8A8A895Row | null>(null)
  const [formData, setFormData] = useState<Partial<NewsS8B8A8A895Insert>>({
    title: '',
    summary: '',
    content: '',
    category: '',
    author: '',
    cover_image: '',
    view_count: 0,
    is_featured: false,
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      const { data, error } = await supabase
        .from('news_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setNews(data || [])
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      if (editingNews) {
        const { error } = await supabase
          .from('news_s_8b8a8a89_5')
          .update(formData)
          .eq('id', editingNews.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('news_s_8b8a8a89_5')
          .insert([formData])

        if (error) throw error
      }

      setShowModal(false)
      resetForm()
      fetchNews()
    } catch (error) {
      console.error('Error saving news:', error)
      alert('保存失败')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条新闻吗？')) return

    try {
      const { error } = await supabase
        .from('news_s_8b8a8a89_5')
        .update({ is_deleted: 'y' })
        .eq('id', id)

      if (error) throw error
      fetchNews()
    } catch (error) {
      console.error('Error deleting news:', error)
      alert('删除失败')
    }
  }

  const handleEdit = (item: NewsS8B8A8A895Row) => {
    setEditingNews(item)
    setFormData({
      title: item.title,
      summary: item.summary || '',
      content: item.content,
      category: item.category || '',
      author: item.author || '',
      cover_image: item.cover_image || '',
      view_count: item.view_count || 0,
      is_featured: item.is_featured || false,
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: '',
      author: '',
      cover_image: '',
      view_count: 0,
      is_featured: false,
    })
    setEditingNews(null)
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // 简化处理，使用本地预览 URL
      const imageUrl = URL.createObjectURL(file)
      setFormData({ ...formData, cover_image: imageUrl })
    } catch (error) {
      console.error('Error uploading cover:', error)
      alert('图片上传失败')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <AdminLayout><div className="flex items-center justify-center h-64">加载中...</div></AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">新闻管理</h1>
          <p className="text-gray-600 mt-2">发布和管理企业新闻</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg btn-glow font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          发布新闻
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                封面
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                分类
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                作者
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                推荐
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                阅读量
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {item.cover_image ? (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-gray-200 rounded-lg" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.category || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.author || '-'}
                </td>
                <td className="px-6 py-4">
                  {item.is_featured ? (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      头条
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.view_count || 0}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  暂无新闻数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingNews ? '编辑新闻' : '发布新闻'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  新闻标题 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    分类
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    作者
                  </label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  摘要
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  正文内容 *
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  封面图片
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    disabled={uploading}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">点击上传封面图片</p>
                  </label>
                </div>

                {formData.cover_image && (
                  <div className="mt-4">
                    <img
                      src={formData.cover_image}
                      alt="Cover"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    阅读量
                  </label>
                  <input
                    type="number"
                    value={formData.view_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        view_count: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) =>
                        setFormData({ ...formData, is_featured: e.target.checked })
                      }
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      设为头条新闻
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg btn-glow disabled:opacity-50"
                >
                  {uploading ? '保存中...' : '保存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

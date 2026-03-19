import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react'
import { CasesS8B8A8A895Row, CasesS8B8A8A895Insert } from '@/types/database'
import { supabase } from '@/lib/supabase'

const BUCKET_NAME = 'Tenant-dinga3a6b534e09b1264ffe93478753d9884'

export default function AdminCases() {
  const [cases, setCases] = useState<CasesS8B8A8A895Row[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCase, setEditingCase] = useState<CasesS8B8A8A895Row | null>(null)
  const [formData, setFormData] = useState<Partial<CasesS8B8A8A895Insert>>({
    title: '',
    description: '',
    image_url: '',
    customer_name: '',
    project_type: '',
    sort_order: 0,
    is_featured: false,
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchCases()
  }, [])

  async function fetchCases() {
    try {
      const { data, error } = await supabase
        .from('cases_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) throw error
      setCases(data || [])
    } catch (error) {
      console.error('Error fetching cases:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      if (editingCase) {
        const { error } = await supabase
          .from('cases_s_8b8a8a89_5')
          .update(formData)
          .eq('id', editingCase.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('cases_s_8b8a8a89_5')
          .insert([formData])

        if (error) throw error
      }

      setShowModal(false)
      resetForm()
      fetchCases()
    } catch (error) {
      console.error('Error saving case:', error)
      alert('保存失败')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个案例吗？')) return

    try {
      const { error } = await supabase
        .from('cases_s_8b8a8a89_5')
        .update({ is_deleted: 'y' })
        .eq('id', id)

      if (error) throw error
      fetchCases()
    } catch (error) {
      console.error('Error deleting case:', error)
      alert('删除失败')
    }
  }

  const handleEdit = (caseItem: CasesS8B8A8A895Row) => {
    setEditingCase(caseItem)
    setFormData({
      title: caseItem.title,
      description: caseItem.description || '',
      image_url: caseItem.image_url,
      customer_name: caseItem.customer_name || '',
      project_type: caseItem.project_type || '',
      sort_order: caseItem.sort_order || 0,
      is_featured: caseItem.is_featured || false,
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      customer_name: '',
      project_type: '',
      sort_order: 0,
      is_featured: false,
    })
    setEditingCase(null)
  }

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `cases/${fileName}`

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath)

    return urlData?.publicUrl || null
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const uploadedUrl = await uploadToSupabase(file)
      if (uploadedUrl) {
        setFormData({
          ...formData,
          image_url: uploadedUrl,
        })
      } else {
        alert('图片上传失败，请重试')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('图片上传失败')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setFormData({
      ...formData,
      image_url: '',
    })
  }

  if (loading) {
    return <AdminLayout><div className="flex items-center justify-center h-64">加载中...</div></AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">客户案例管理</h1>
          <p className="text-gray-600 mt-2">管理企业客户案例展示</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg btn-glow font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          添加案例
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                图片
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                客户名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                项目类型
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                推荐
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                排序
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {caseItem.image_url ? (
                    <img
                      src={caseItem.image_url}
                      alt={caseItem.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {caseItem.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {caseItem.customer_name || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {caseItem.project_type || '-'}
                </td>
                <td className="px-6 py-4">
                  {caseItem.is_featured ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      推荐
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {caseItem.sort_order}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => handleEdit(caseItem)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(caseItem.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {cases.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  暂无案例数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCase ? '编辑案例' : '添加案例'}
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
                  案例标题 *
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
                    客户名称
                  </label>
                  <input
                    type="text"
                    value={formData.customer_name || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    项目类型
                  </label>
                  <input
                    type="text"
                    value={formData.project_type || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, project_type: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  案例描述
                </label>
                <textarea
                  rows={4}
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  案例图片 *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading || !!formData.image_url}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer ${
                      formData.image_url ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      点击上传图片或拖拽到此处
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.image_url ? '已上传 1 张图片' : '支持 JPG/PNG/GIF 格式'}
                    </p>
                  </label>
                </div>

                {formData.image_url && (
                  <div className="mt-4 relative aspect-video">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    排序
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured || false}
                      onChange={(e) =>
                        setFormData({ ...formData, is_featured: e.target.checked })
                      }
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      设为推荐案例
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

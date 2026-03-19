import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Building, Key, Save, Phone, User, Clock, MessageSquare, Mail, Globe } from 'lucide-react'
import { CompaniesS8B8A8A895Row, CompaniesS8B8A8A895Insert } from '@/types/database'
import { supabase } from '@/lib/supabase'

export default function AdminSettings() {
  const [company, setCompany] = useState<CompaniesS8B8A8A895Row | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'company' | 'password'>('company')
  const [uploading, setUploading] = useState(false)

  const [companyForm, setCompanyForm] = useState<Partial<CompaniesS8B8A8A895Insert>>({
    name: '',
    logo_url: '',
    banner_url: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    contact_person: '',
    contact_phone1: '',
    contact_phone2: '',
    contact_phone3: '',
    contact_phone4: '',
    contact_phone5: '',
    wechat: '',
    qq: '',
    fax: '',
    business_hours: '',
  })

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    fetchCompany()
  }, [])

  async function fetchCompany() {
    try {
      const { data, error } = await supabase
        .from('companies_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      if (data) {
        setCompany(data)
        setCompanyForm({
          name: data.name || '',
          logo_url: data.logo_url || '',
          banner_url: data.banner_url || '',
          description: data.description || '',
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          contact_person: data.contact_person || '',
          contact_phone1: data.contact_phone1 || '',
          contact_phone2: data.contact_phone2 || '',
          contact_phone3: data.contact_phone3 || '',
          contact_phone4: data.contact_phone4 || '',
          contact_phone5: data.contact_phone5 || '',
          wechat: data.wechat || '',
          qq: data.qq || '',
          fax: data.fax || '',
          business_hours: data.business_hours || '',
        })
      }
    } catch (error) {
      console.error('Error fetching company:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      if (company) {
        const { error } = await supabase
          .from('companies_s_8b8a8a89_5')
          .update(companyForm)
          .eq('id', company.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('companies_s_8b8a8a89_5')
          .insert([companyForm])

        if (error) throw error
      }

      alert('保存成功')
      fetchCompany()
    } catch (error) {
      console.error('Error saving company:', error)
      alert('保存失败')
    } finally {
      setUploading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('两次输入的新密码不一致')
      return
    }

    try {
      const { data: user } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', localStorage.getItem('admin_username'))
        .single()

      if (!user || user.password_hash !== passwordForm.oldPassword) {
        alert('原密码错误')
        return
      }

      const { error } = await supabase
        .from('admin_users')
        .update({ password_hash: passwordForm.newPassword })
        .eq('id', user.id)

      if (error) throw error

      alert('密码修改成功')
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      console.error('Error changing password:', error)
      alert('密码修改失败')
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileName = `logo_${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('Tenant-dinga3a6b534e09b1264ffe93478753d9884')
        .upload(`public/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('Tenant-dinga3a6b534e09b1264ffe93478753d9884')
        .getPublicUrl(`public/${fileName}`)

      setCompanyForm({ ...companyForm, logo_url: urlData.publicUrl })
    } catch (error) {
      console.error('Error uploading logo:', error)
      alert('图片上传失败')
    } finally {
      setUploading(false)
    }
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileName = `banner_${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('Tenant-dinga3a6b534e09b1264ffe93478753d9884')
        .upload(`public/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('Tenant-dinga3a6b534e09b1264ffe93478753d9884')
        .getPublicUrl(`public/${fileName}`)

      setCompanyForm({ ...companyForm, banner_url: urlData.publicUrl })
    } catch (error) {
      console.error('Error uploading banner:', error)
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">系统设置</h1>
        <p className="text-gray-600 mt-2">管理企业信息和账户安全</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('company')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'company'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building className="w-5 h-5 inline mr-2" />
              企业信息
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'password'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Key className="w-5 h-5 inline mr-2" />
              修改密码
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'company' && (
            <form onSubmit={handleCompanySubmit} className="space-y-6 max-w-4xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  企业名称 *
                </label>
                <input
                  type="text"
                  required
                  value={companyForm.name}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {companyForm.logo_url ? (
                      <div className="mb-4">
                        <img
                          src={companyForm.logo_url}
                          alt="Logo"
                          className="h-20 mx-auto"
                        />
                      </div>
                    ) : null}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploading}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <p className="text-sm text-gray-600">点击上传 Logo</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner 图片
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {companyForm.banner_url ? (
                      <div className="mb-4">
                        <img
                          src={companyForm.banner_url}
                          alt="Banner"
                          className="h-20 mx-auto w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      disabled={uploading}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label htmlFor="banner-upload" className="cursor-pointer">
                      <p className="text-sm text-gray-600">点击上传 Banner</p>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  企业简介
                </label>
                <textarea
                  rows={4}
                  value={companyForm.description || ''}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公司地址
                </label>
                <input
                  type="text"
                  value={companyForm.address || ''}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系电话
                  </label>
                  <input
                    type="text"
                    value={companyForm.phone || ''}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    电子邮箱
                  </label>
                  <input
                    type="email"
                    value={companyForm.email || ''}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  官方网站
                </label>
                <input
                  type="url"
                  value={companyForm.website || ''}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, website: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary-600" />
                  详细联系方式
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      联系人
                    </label>
                    <input
                      type="text"
                      value={companyForm.contact_person || ''}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, contact_person: e.target.value })
                      }
                      placeholder="请输入联系人姓名"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      营业时间
                    </label>
                    <input
                      type="text"
                      value={companyForm.business_hours || ''}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, business_hours: e.target.value })
                      }
                      placeholder="例如：周一至周五 9:00-18:00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    联系电话（多个，非必填）
                  </label>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num}>
                        <input
                          type="text"
                          value={(companyForm as any)[`contact_phone${num}`] || ''}
                          onChange={(e) =>
                            setCompanyForm({ ...companyForm, [`contact_phone${num}`]: e.target.value })
                          }
                          placeholder={`联系电话 ${num}`}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                      微信
                    </label>
                    <input
                      type="text"
                      value={companyForm.wechat || ''}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, wechat: e.target.value })
                      }
                      placeholder="请输入微信号"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                      QQ
                    </label>
                    <input
                      type="text"
                      value={companyForm.qq || ''}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, qq: e.target.value })
                      }
                      placeholder="请输入 QQ 号"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      传真
                    </label>
                    <input
                      type="text"
                      value={companyForm.fax || ''}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, fax: e.target.value })
                      }
                      placeholder="请输入传真号码"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg btn-glow font-medium flex items-center disabled:opacity-50"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {uploading ? '保存中...' : '保存设置'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  原密码
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.oldPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  新密码
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  确认新密码
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg btn-glow font-medium"
                >
                  修改密码
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

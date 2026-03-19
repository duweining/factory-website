import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react'
import { useCompany } from '@/hooks/useCompany'
import SeoProvider from '@/components/SeoProvider'

function ContactPageContent() {
  const { company, loading } = useCompany()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">联系我们</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            我们随时为您提供专业的咨询和服务
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Address */}
            {company?.address && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">公司地址</h3>
                <p className="text-gray-600 leading-relaxed">{company.address}</p>
              </div>
            )}

            {/* Phone */}
            {company?.phone && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">联系电话</h3>
                <p className="text-gray-600 leading-relaxed">{company.phone}</p>
              </div>
            )}

            {/* Email */}
            {company?.email && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">电子邮箱</h3>
                <p className="text-gray-600 leading-relaxed">{company.email}</p>
              </div>
            )}

            {/* Website */}
            {company?.website && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">官方网站</h3>
                <p className="text-gray-600 leading-relaxed">{company.website}</p>
              </div>
            )}

            {/* Working Hours */}
            <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">工作时间</h3>
              <p className="text-gray-600 leading-relaxed">周一至周五 9:00 - 18:00</p>
            </div>
          </div>

          {/* Company Info */}
          {(company?.name || company?.description) && (
            <div className="mt-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-10">
              <div className="max-w-4xl mx-auto">
                {company?.name && (
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    {company.name}
                  </h2>
                )}
                {company?.description && (
                  <p className="text-gray-700 text-lg leading-relaxed text-center">
                    {company.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

import { MapPin, Phone, Mail, Clock, Globe, User, Wechat, MessageCircle, Fax } from 'lucide-react'
import { useCompany } from '@/hooks/useCompany'
import SeoProvider from '@/components/SeoProvider'

function ContactPageContent() {
  const { company, loading } = useCompany()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  // 收集所有联系电话
  const contactPhones = [
    company?.phone,
    company?.contact_phone1,
    company?.contact_phone2,
    company?.contact_phone3,
    company?.contact_phone4,
    company?.contact_phone5,
  ].filter(Boolean)

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

            {/* Contact Person */}
            {company?.contact_person && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <User className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">联系人</h3>
                <p className="text-gray-600 leading-relaxed">{company.contact_person}</p>
              </div>
            )}

            {/* Phone Numbers */}
            {contactPhones.length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">联系电话</h3>
                <div className="space-y-2">
                  {contactPhones.map((phone, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed">
                      {phone}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Email */}
            {company?.email && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">电子邮箱</h3>
                <p className="text-gray-600 leading-relaxed">{company.email}</p>
              </div>
            )}

            {/* Website */}
            {company?.website && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">官方网站</h3>
                <p className="text-gray-600 leading-relaxed">{company.website}</p>
              </div>
            )}

            {/* WeChat */}
            {company?.wechat && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <Wechat className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">微信</h3>
                <p className="text-gray-600 leading-relaxed">{company.wechat}</p>
              </div>
            )}

            {/* QQ */}
            {company?.qq && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">QQ</h3>
                <p className="text-gray-600 leading-relaxed">{company.qq}</p>
              </div>
            )}

            {/* Fax */}
            {company?.fax && (
              <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Fax className="w-7 h-7 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">传真</h3>
                <p className="text-gray-600 leading-relaxed">{company.fax}</p>
              </div>
            )}

            {/* Working Hours */}
            <div className="bg-white p-8 rounded-xl shadow-md hover-lift">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">营业时间</h3>
              <p className="text-gray-600 leading-relaxed">
                {company?.business_hours || '周一至周五 9:00 - 18:00'}
              </p>
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

export default function ContactPage() {
  return (
    <SeoProvider pageType="contact">
      <ContactPageContent />
    </SeoProvider>
  )
}

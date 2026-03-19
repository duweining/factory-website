import { ChevronRight, ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCompany } from '@/hooks/useCompany'

export default function HomePage() {
  const { company, loading } = useCompany()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {company?.name || '欢迎来到我们的企业'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white/90">
              {company?.description || '专业从事工业生产与制造，致力于为客户提供高品质的产品和服务。'}
            </p>
            <div className="flex space-x-4">
              <Link
                to="/products"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg btn-glow font-semibold inline-flex items-center"
              >
                查看产品
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold"
              >
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">核心优势</h2>
            <p className="text-xl text-gray-600">为什么选择我们</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '品质保证',
                description: '严格的质量控制体系，确保每一件产品都符合最高标准',
                icon: '✓',
              },
              {
                title: '技术创新',
                description: '持续研发投入，引领行业技术发展',
                icon: '⚡',
              },
              {
                title: '优质服务',
                description: '专业的售前售后服务团队，全程为您保驾护航',
                icon: '♥',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl card-hover shadow-sm"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">热门产品</h2>
            <p className="text-xl text-gray-600">探索我们的优质产品线</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl overflow-hidden shadow-sm card-hover group"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    产品名称 {item}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    产品描述文字，介绍产品的特点和优势
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                  >
                    了解更多
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg btn-glow font-semibold"
            >
              查看全部产品
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开始合作了吗？
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            立即联系我们，获取专业的产品咨询和定制化解决方案
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg btn-glow font-semibold"
          >
            立即联系
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10+', label: '年经验' },
              { number: '500+', label: '客户信赖' },
              { number: '1000+', label: '成功案例' },
              { number: '99%', label: '满意度' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

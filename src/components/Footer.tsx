import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'
import { useCompany } from '@/hooks/useCompany'

export default function Footer() {
  const { company } = useCompany()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              {company?.name || '企业名称'}
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {company?.description || '专业从事工业生产与制造，致力于为客户提供高品质的产品和服务。'}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">联系方式</h4>
            <ul className="space-y-3">
              {company?.address && (
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                  <span className="text-gray-400">{company.address}</span>
                </li>
              )}
              {company?.phone && (
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-400">{company.phone}</span>
                </li>
              )}
              {company?.email && (
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-400">{company.email}</span>
                </li>
              )}
              {company?.website && (
                <li className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-400">{company.website}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  产品中心
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">
                  新闻中心
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {company?.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

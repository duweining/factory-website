import { useState, useEffect } from 'react'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCompany } from '@/hooks/useCompany'
import { ProductsS8B8A8A895Row } from '@/types/database'
import { supabase } from '@/lib/supabase'
import WatermarkImage from '@/components/WatermarkImage'

export default function HomePage() {
  const { company, loading: companyLoading } = useCompany()
  const [featuredProducts, setFeaturedProducts] = useState<ProductsS8B8A8A895Row[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [showAllProducts, setShowAllProducts] = useState(false)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  async function fetchFeaturedProducts() {
    try {
      console.log('Fetching featured products...')
      const { data, error } = await supabase
        .from('products_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')
        .eq('is_featured', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(12)

      if (error) {
        console.error('Error fetching featured products:', error)
        throw error
      }
      console.log('Fetched featured products:', data)
      setFeaturedProducts(data || [])
    } catch (error) {
      console.error('Error fetching featured products:', error)
    } finally {
      setProductsLoading(false)
    }
  }

  const displayedProducts = showAllProducts ? featuredProducts : featuredProducts.slice(0, 6)
  const hasMoreProducts = featuredProducts.length > 6

  if (companyLoading) {
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

      {/* Products Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">热门产品</h2>
            <p className="text-xl text-gray-600">探索我们的优质产品线</p>
          </div>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600 mb-4">暂无推荐产品</p>
              <Link
                to="/products"
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
              >
                查看全部产品
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {hasMoreProducts && (
                <div className="text-center mt-12">
                  {!showAllProducts ? (
                    <button
                      onClick={() => setShowAllProducts(true)}
                      className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg btn-glow font-semibold hover:bg-primary-700 transition-colors"
                    >
                      加载更多
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  ) : (
                    <Link
                      to="/products"
                      className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg btn-glow font-semibold"
                    >
                      查看全部产品
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">

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

function ProductCard({ product }: { product: ProductsS8B8A8A895Row }) {
  const { company } = useCompany()
  const images = (product.images as string[] | null) || []
  const mainImage = images[0]
  const logoUrl = company?.logo_url

  console.log('ProductCard rendering for:', product.name, 'with images:', images)

  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="aspect-w-4 aspect-h-3 bg-gray-200 relative overflow-hidden">
          {mainImage ? (
            <WatermarkImage
              src={mainImage}
              alt={product.name}
              logoUrl={logoUrl}
              position="center"
              logoScale={0.25}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                console.error('Image failed to load:', mainImage)
                e.currentTarget.src = ''
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
          )}
          {product.is_featured && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              推荐
            </div>
          )}
        </div>
        <div className="p-6">
          {product.category && (
            <span className="text-sm text-primary-600 font-medium mb-2 block">
              {product.category}
            </span>
          )}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.description || '暂无描述'}
          </p>
          {product.price && (
            <div className="text-2xl font-bold text-primary-600 mb-4">
              ¥{product.price.toLocaleString()}
            </div>
          )}
          <div className="flex items-center text-primary-600 font-medium">
            了解更多
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

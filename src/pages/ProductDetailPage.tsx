import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronLeftCircle, ChevronRightCircle } from 'lucide-react'
import { ProductsS8B8A8A895Row } from '@/types/database'
import { supabase } from '@/lib/supabase'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductsS8B8A8A895Row | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id))
    }
  }, [id])

  async function fetchProduct(productId: number) {
    try {
      console.log('Fetching product:', productId)
      const { data, error } = await supabase
        .from('products_s_8b8a8a89_5')
        .select('*')
        .eq('id', productId)
        .eq('is_deleted', 'n')
        .single()

      if (error) {
        console.error('Error fetching product:', error)
        throw error
      }
      console.log('Fetched product:', data)
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        加载中...
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">产品不存在</h1>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg btn-glow"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            返回产品列表
          </Link>
        </div>
      </div>
    )
  }

  const images = (product.images as string[]) || []
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-white/90 hover:text-white transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            返回
          </button>
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              {images.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={images[currentImageIndex]}
                      alt={`${product.name} - ${currentImageIndex + 1}`}
                      className="w-full h-[500px] object-cover"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <ChevronLeftCircle className="w-8 h-8 text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <ChevronRightCircle className="w-8 h-8 text-gray-700" />
                        </button>
                      </>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === currentImageIndex
                              ? 'border-primary-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl" />
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.category && (
                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              )}

              <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

              {product.price && (
                <div className="text-4xl font-bold text-primary-600">
                  ¥{product.price.toLocaleString()}
                </div>
              )}

              <div className="prose max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4">产品描述</h3>
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {product.description || '暂无详细描述'}
                </p>
              </div>

              {product.is_featured && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <span className="text-yellow-800 font-medium">⭐ 推荐产品</span>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t space-y-4">
                <Link
                  to="/contact"
                  className="block w-full py-4 bg-primary-600 text-white rounded-lg btn-glow font-semibold text-center"
                >
                  立即咨询
                </Link>
                <Link
                  to="/products"
                  className="block w-full py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center"
                >
                  查看全部产品
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  )
}

function RelatedProducts({ currentProductId, category }: { currentProductId: number; category: string | null }) {
  const [relatedProducts, setRelatedProducts] = useState<ProductsS8B8A8A895Row[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        let query = supabase
          .from('products_s_8b8a8a89_5')
          .select('*')
          .eq('is_deleted', 'n')
          .neq('id', currentProductId)
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(3)

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) throw error
        setRelatedProducts(data || [])
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId, category])

  if (loading || relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">相关产品</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="block group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
                <div className="aspect-w-4 aspect-h-3 bg-gray-200 relative overflow-hidden">
                  {(product.images as string[])?.[0] ? (
                    <img
                      src={(product.images as string[])[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  {product.price && (
                    <div className="text-primary-600 font-bold">
                      ¥{product.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

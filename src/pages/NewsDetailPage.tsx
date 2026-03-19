import { useState, useEffect } from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, User, ChevronLeft, Eye } from 'lucide-react'
import { NewsS8B8A8A895Row, ProductsS8B8A8A895Row, CasesS8B8A8A895Row } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { useCompany } from '@/hooks/useCompany'
import WatermarkImage from '@/components/WatermarkImage'

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [news, setNews] = useState<NewsS8B8A8A895Row | null>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductsS8B8A8A895Row[]>([])
  const [cases, setCases] = useState<CasesS8B8A8A895Row[]>([])
  const [randomImages, setRandomImages] = useState<string[]>([])
  const { company } = useCompany()

  useEffect(() => {
    if (id) {
      fetchAllData(parseInt(id))
    }
  }, [id])

  async function fetchAllData(newsId: number) {
    try {
      // Fetch news
      const { data: newsData, error: newsError } = await supabase
        .from('news_s_8b8a8a89_5')
        .select('*')
        .eq('id', newsId)
        .eq('is_deleted', 'n')
        .single()

      if (newsError) throw newsError
      setNews(newsData)

      // Update view count
      if (newsData) {
        await supabase
          .from('news_s_8b8a8a89_5')
          .update({ view_count: (newsData.view_count || 0) + 1 })
          .eq('id', newsId)
      }

      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')

      if (productsError) throw productsError
      setProducts(productsData || [])

      // Fetch cases
      const { data: casesData, error: casesError } = await supabase
        .from('cases_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')

      if (casesError) throw casesError
      setCases(casesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (products.length > 0 || cases.length > 0) {
      generateRandomImages()
    }
  }, [products, cases])

  function generateRandomImages() {
    const allImages: string[] = []
    
    // Extract product images
    products.forEach((product) => {
      const images = (product.images as string[] | null) || []
      images.forEach((img) => {
        if (img && !allImages.includes(img)) {
          allImages.push(img)
        }
      })
    })

    // Extract case images
    cases.forEach((caseItem) => {
      if (caseItem.image_url && !allImages.includes(caseItem.image_url)) {
        allImages.push(caseItem.image_url)
      }
    })

    // Shuffle and pick 6 images
    const shuffled = allImages.sort(() => Math.random() - 0.5)
    setRandomImages(shuffled.slice(0, 6))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        加载中...
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">新闻不存在</h1>
          <Link
            to="/news"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg btn-glow"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            返回新闻列表
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  const displayDate = (newsItem: NewsS8B8A8A895Row) => {
    return formatDate(newsItem.published_at || newsItem.created_at)
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
        </div>
      </section>

      {/* News Detail */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Cover Image */}
            {news.cover_image && (
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={news.cover_image}
                  alt={news.title}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    console.error('News cover image failed to load:', news.cover_image)
                    e.currentTarget.src = ''
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {news.category && (
                  <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                    {news.category}
                  </span>
                )}
                {news.is_featured && (
                  <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    头条
                  </span>
                )}
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {displayDate(news)}
                </div>
                {news.author && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="w-4 h-4 mr-1" />
                    {news.author}
                  </div>
                )}
                {news.view_count !== null && news.view_count > 0 && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {news.view_count} 阅读
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {news.title}
              </h1>

              {/* Summary */}
              {news.summary && (
                <div className="bg-gray-50 border-l-4 border-primary-600 pl-6 py-4 mb-8">
                  <p className="text-gray-700 italic">{news.summary}</p>
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {news.content}
                </div>
              </div>

              {/* Share & Actions */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="flex-1 py-4 bg-primary-600 text-white rounded-lg btn-glow font-semibold text-center"
                  >
                    联系我们
                  </Link>
                  <Link
                    to="/news"
                    className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center"
                  >
                    返回新闻列表
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related News */}
      <RelatedNews currentNewsId={news.id} category={news.category} />
    </div>
  )
}

function RelatedNews({ currentNewsId, category }: { currentNewsId: number; category: string | null }) {
  const [relatedNews, setRelatedNews] = useState<NewsS8B8A8A895Row[]>([])
  const [loading, setLoading] = useState(true)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  const displayDate = (newsItem: NewsS8B8A8A895Row) => {
    return formatDate(newsItem.published_at || newsItem.created_at)
  }

  useEffect(() => {
    async function fetchRelatedNews() {
      try {
        let query = supabase
          .from('news_s_8b8a8a89_5')
          .select('*')
          .eq('is_deleted', 'n')
          .neq('id', currentNewsId)
          .order('is_featured', { ascending: false })
          .order('published_at', { ascending: false })
          .limit(3)

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) throw error
        setRelatedNews(data || [])
      } catch (error) {
        console.error('Error fetching related news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedNews()
  }, [currentNewsId, category])

  if (loading || relatedNews.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">相关新闻</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedNews.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className="block group"
            >
              <article className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative overflow-hidden">
                  {item.cover_image ? (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
                  )}
                  {item.is_featured && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      头条
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {displayDate(item)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

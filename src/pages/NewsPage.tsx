import { useState, useEffect } from 'react'
import { Calendar, User, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NewsS8B8A8A895Row, ProductsS8B8A8A895Row, CasesS8B8A8A895Row } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { useCompany } from '@/hooks/useCompany'
import WatermarkImage from '@/components/WatermarkImage'
import SeoProvider from '@/components/SeoProvider'

const ITEMS_PER_PAGE = 9

function NewsPageContent() {
  const [news, setNews] = useState<NewsS8B8A8A895Row[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<ProductsS8B8A8A895Row[]>([])
  const [cases, setCases] = useState<CasesS8B8A8A895Row[]>([])
  const [randomImages, setRandomImages] = useState<string[]>([])
  const { company } = useCompany()

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    try {
      // Fetch news
      const { data: newsData, error: newsError } = await supabase
        .from('news_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')
        .order('is_featured', { ascending: false })
        .order('published_at', { ascending: false })

      if (newsError) throw newsError
      setNews(newsData || [])

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

  const categories = Array.from(
    new Set(news.map((n) => n.category).filter(Boolean))
  ) as string[]

  const filteredNews = selectedCategory
    ? news.filter((n) => n.category === selectedCategory)
    : news

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">新闻中心</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            了解最新的企业动态和行业资讯
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">暂无新闻</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function NewsCard({ news }: { news: NewsS8B8A8A895Row }) {
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

  const displayDate = (news: NewsS8B8A8A895Row) => {
    return formatDate(news.published_at || news.created_at)
  }

  return (
    <Link to={`/news/${news.id}`} className="block group">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative overflow-hidden">
          {news.cover_image ? (
            <img
              src={news.cover_image}
              alt={news.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
          )}
          {news.is_featured && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              头条
            </div>
          )}
          {news.category && (
            <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {news.category}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {news.summary || news.content.substring(0, 100) + '...'}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {news.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {news.author}
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {displayDate(news)}
              </div>
            </div>
            {news.view_count !== null && news.view_count > 0 && (
              <span>{news.view_count} 阅读</span>
            )}
          </div>
          <div className="mt-4 flex items-center text-primary-600 font-medium">
            阅读更多
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function NewsPage() {
  return (
    <SeoProvider pageType="news">
      <NewsPageContent />
    </SeoProvider>
  )
}

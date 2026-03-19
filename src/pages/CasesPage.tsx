import { useState, useEffect } from 'react'
import { CasesS8B8A8A895Row } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { useCompany } from '@/hooks/useCompany'
import WatermarkImage from '@/components/WatermarkImage'
import SeoProvider from '@/components/SeoProvider'

function CasesPageContent() {
  const [cases, setCases] = useState<CasesS8B8A8A895Row[]>([])
  const [loading, setLoading] = useState(true)
  const [columns, setColumns] = useState<CasesS8B8A8A895Row[][]>([[], [], [], []])
  const { company } = useCompany()

  useEffect(() => {
    fetchCases()
  }, [])

  useEffect(() => {
    if (cases.length > 0) {
      distributeCasesToColumns()
    }
  }, [cases])

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

  function distributeCasesToColumns() {
    const newColumns: CasesS8B8A8A895Row[][] = [[], [], [], []]
    const columnHeights = [0, 0, 0, 0]

    cases.forEach((caseItem) => {
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights))
      newColumns[minHeightIndex].push(caseItem)
      columnHeights[minHeightIndex] += 1
    })

    setColumns(newColumns)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">客户案例</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            探索我们与合作伙伴共同创造的成功故事
          </p>
        </div>
      </section>

      {/* Cases Grid - Waterfall Layout */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-6">
                {column.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover-lift group"
                  >
                    <div className="relative overflow-hidden">
                      <WatermarkImage
                        src={caseItem.image_url}
                        alt={caseItem.title}
                        logoUrl={company?.logo_url}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="20"%3E图片加载失败%3C/text%3E%3C/svg%3E'
                        }}
                      />
                      {caseItem.is_featured && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          推荐案例
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {caseItem.title}
                      </h3>
                      {(caseItem.customer_name || caseItem.project_type) && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {caseItem.customer_name && (
                            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                              {caseItem.customer_name}
                            </span>
                          )}
                          {caseItem.project_type && (
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {caseItem.project_type}
                            </span>
                          )}
                        </div>
                      )}
                      {caseItem.description && (
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                          {caseItem.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {cases.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">暂无案例展示</h3>
              <p className="text-gray-500">我们正在努力更新更多精彩内容</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function CasesPage() {
  return (
    <SeoProvider pageType="cases">
      <CasesPageContent />
    </SeoProvider>
  )
}

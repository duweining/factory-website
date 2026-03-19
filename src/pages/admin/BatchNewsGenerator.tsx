import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface NewsTemplate {
  title: string
  keywords: string[]
  baseContent: string
}

// 生成更多标题的模板函数
function generateNewsTitle(index: number): string {
  const prefixes = [
    '深度解析', '技术探讨', '应用实践', '行业观察', '产品展示',
    '案例分析', '选购指南', '维护保养', '创新突破', '质量标准',
    '生产工艺', '市场前景', '用户反馈', '性能测试', '对比评测',
  ]
  
  const subjects = [
    '304 不锈钢网篮', '长方形网筐', '圆形网篮', '医用消毒网篮',
    '工业清洗网筐', '食品级油炸篮', '精密过滤网篮', '沥水网筐',
    '蒸煮网篮', '医疗器材网筐', '工厂专用网篮', '定制网筐',
  ]
  
  const suffixes = [
    '的核心技术', '的应用优势', '的发展趋势', '的质量标准',
    '的选购要点', '的保养技巧', '的创新设计', '的市场表现',
    '在医疗领域的应用', '在食品行业的作用', '在工业场景的价值',
    '的生产工艺详解', '的性能特点分析', '的使用寿命延长方法',
  ]
  
  const prefix = prefixes[index % prefixes.length]
  const subject = subjects[Math.floor(index / 10) % subjects.length]
  const suffix = suffixes[index % suffixes.length]
  
  return `${prefix}：${subject}${suffix}`
}

// 生成新闻内容
function generateNewsContent(index: number, title: string): string {
  const introParagraphs = [
    `随着现代工业技术的不断发展，${title.split(':')[1] || '不锈钢网篮'}在各行业中的应用日益广泛。作为专业从事不锈钢网篮研发和生产的企业，我们深知产品质量对客户生产效率和安全性的重要影响。`,
    `在当前市场竞争激烈的环境下，选择一款高质量的不锈钢网篮产品对于企业的正常运营至关重要。本文将详细介绍${title.split(':')[1] || '本产品'}的技术特点、应用场景以及选购建议。`,
    `不锈钢网篮作为一种通用的工业辅助器具，已经渗透到医疗、食品、化工等多个领域。本文将从多个角度深入剖析${title.split(':')[1] || '相关产品'}的核心价值和实际应用。`,
  ]
  
  const featureParagraphs = [
    `本产品采用优质 304 不锈钢材料制造，具有优异的耐腐蚀性能和抗氧化能力。在正常使用条件下，产品使用寿命可达 5-10 年，大大降低了企业的采购和维护成本。材料厚度可根据客户需求定制，确保在不同负载条件下的结构稳定性。`,
    `精密的焊接工艺是我们产品的核心竞争力之一。采用先进的氩弧焊技术，焊缝均匀牢固，无虚焊、漏焊现象。网孔尺寸精确可控，最小孔径可达 0.5mm，能够满足各种精密过滤和筛选需求。`,
    '人性化设计是我们一贯的追求。产品边缘经过精细打磨，光滑无毛刺，有效防止操作人员在使用过程中被划伤。合理的结构设计使得产品重量轻、强度高，便于搬运和操作，显著提高工作效率。',
    `我们建立了完善的质量管理体系，从原材料采购到生产加工，从成品检验到售后服务，每一个环节都严格执行 ISO9001 质量标准。每批次产品都经过严格的耐压测试、耐腐蚀测试和外观检查，确保交付到客户手中的都是合格产品。`,
    '针对特殊应用场景，我们提供定制化服务。无论是尺寸规格、网孔大小，还是形状结构、表面处理，都可以根据客户的具体需求进行个性化设计。我们的工程团队会在收到需求后 48 小时内提供详细的设计方案和报价。',
    `在医疗领域，我们的不锈钢网篮严格按照医疗器械相关标准生产，可耐受高温高压灭菌处理，反复使用不变形、不生锈。产品已通过生物相容性测试，对人体无毒无害，可安全用于手术器械、牙科工具等的清洗和消毒。`,
    '在食品加工行业，我们的产品符合 FDA 和 LFGB 等国际食品安全标准。光滑的表面不易滋生细菌，易于清洁和消毒。优良的沥水性能可有效减少食品表面的水分残留，保证食品的新鲜度和口感。',
    `工业应用场景下，我们的产品展现出卓越的耐用性和可靠性。无论是酸碱环境下的清洗作业，还是高温条件下的热处理工艺，304 不锈钢材质都能保持稳定的化学性质，不会因环境变化而影响使用性能。`,
  ]
  
  const conclusionParagraphs = [
    `综上所述，${title.split(':')[1] || '不锈钢网篮产品'}凭借其优异的性能和可靠的品质，已经成为众多企业的首选。我们承诺将继续秉承"质量第一、客户至上"的经营理念，为客户提供更优质的产品和服务。`,
    '选择合适的不锈钢网篮产品需要综合考虑使用场景、负载要求、环境条件等多个因素。我们的专业团队随时准备为您提供技术咨询和选型指导，帮助您找到最适合的解决方案。',
    '未来，我们将继续加大研发投入，不断推出更具创新性的产品，满足市场日益多样化的需求。同时，我们也将进一步优化服务体系，为客户提供更加便捷、高效的购物体验。',
  ]
  
  const intro = introParagraphs[index % introParagraphs.length]
  const features = featureParagraphs.slice(0, 3 + (index % 3))
  const conclusion = conclusionParagraphs[index % conclusionParagraphs.length]
  
  let content = `${intro}\n\n`
  
  features.forEach((para, idx) => {
    content += `${para}\n\n`
  })
  
  content += conclusion
  
  return content
}

export default function BatchNewsGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedCount, setGeneratedCount] = useState(0)
  const [successCount, setSuccessCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  const handleGenerateNews = async () => {
    if (!confirm('确定要生成 100 篇新闻并自动发布吗？此操作可能需要几分钟时间。')) {
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setGeneratedCount(0)
    setSuccessCount(0)
    setErrorCount(0)
    setLogs([])

    addLog('开始生成新闻...')

    try {
      for (let i = 0; i < 100; i++) {
        setGeneratedCount(i + 1)
        
        const title = generateNewsTitle(i)
        const content = generateNewsContent(i, title)
        const summary = content.substring(0, 200) + '...'
        
        const categories = ['公司动态', '行业资讯', '技术应用', '产品知识', '成功案例']
        const category = categories[i % categories.length]
        
        const authors = ['编辑部', '技术中心', '产品部', '市场部']
        const author = authors[i % authors.length]
        
        const newsData = {
          title,
          summary,
          content,
          category,
          author,
          cover_image: null as string | null,
          view_count: Math.floor(Math.random() * 500) + 50,
          is_featured: i < 10,
        }

        try {
          const { error } = await supabase
            .from('news_s_8b8a8a89_5')
            .insert([newsData])

          if (error) {
            throw error
          }

          setSuccessCount(prev => prev + 1)
          addLog(`成功发布第 ${i + 1} 篇新闻：${title.substring(0, 30)}...`)
        } catch (error: any) {
          setErrorCount(prev => prev + 1)
          addLog(`第 ${i + 1} 篇新闻发布失败：${error.message}`)
        }

        setProgress(Math.floor(((i + 1) / 100) * 100))
        
        // 添加短暂延迟，避免请求过快
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      addLog('新闻生成完成！')
    } catch (error: any) {
      addLog(`发生错误：${error.message}`)
    } finally {
      setIsGenerating(false)
      addLog(`总计：成功 ${successCount} 篇，失败 ${errorCount} 篇`)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">批量新闻生成器</h1>
        <p className="text-gray-600 mt-2">自动生成并发布关于不锈钢网篮产品的新闻文章</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <div className="flex items-start space-x-4 mb-6">
          <FileText className="w-12 h-12 text-primary-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">功能说明</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• 自动生成 100 篇关于 304 不锈钢网篮、长方形/圆形网筐、清洗/过滤/沥水等专业产品的新闻文章</li>
              <li>• 标题包含热门关键词，利于 SEO 优化</li>
              <li>• 内容涵盖医疗、食品、工业等多个应用领域</li>
              <li>• 每篇文章字符数在 200-800 字之间</li>
              <li>• 自动设置分类、作者、阅读量等信息</li>
              <li>• 前 10 篇自动设为头条新闻</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleGenerateNews}
          disabled={isGenerating}
          className="px-8 py-4 bg-primary-600 text-white rounded-lg btn-glow font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {isGenerating ? '生成中...' : '开始生成 100 篇新闻'}
        </button>
      </div>

      {isGenerating && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">生成进度</span>
            <span className="text-sm font-medium text-primary-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-primary-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{generatedCount}</div>
              <div className="text-sm text-blue-600 mt-1">已生成</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
              <div className="text-sm text-green-600 mt-1">成功发布</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-sm text-red-600 mt-1">发布失败</div>
            </div>
          </div>
        </div>
      )}

      {logs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Loader className="w-5 h-5 mr-2" />
            生成日志
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-sm text-gray-600 py-1 border-b border-gray-100 last:border-0">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

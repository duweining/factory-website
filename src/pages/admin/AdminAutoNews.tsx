import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Settings, Play, Pause, Save, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AutoNewsConfig {
  id: number
  keywords: string[]
  is_enabled: boolean
  last_run_date: string | null
  next_run_time: string | null
  total_generated: number
}

export default function AdminAutoNews() {
  const [config, setConfig] = useState<AutoNewsConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [keywords, setKeywords] = useState<string>('')
  const [isEnabled, setIsEnabled] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [stats, setStats] = useState({
    todayGenerated: 0,
    totalGenerated: 0,
    lastRunDate: '',
  })

  useEffect(() => {
    fetchConfig()
  }, [])

  async function fetchConfig() {
    try {
      const { data, error } = await supabase
        .from('auto_news_config')
        .select('*')
        .eq('is_deleted', 'n')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        setConfig(data)
        setKeywords(data.keywords?.join(', ') || '')
        setIsEnabled(data.is_enabled)
        
        // 获取今日生成数量
        const today = new Date().toISOString().split('T')[0]
        const { count } = await supabase
          .from('news_s_8b8a8a89_5')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', `${today}T00:00:00`)
          .like('author', '%编辑部%')
        
        setStats({
          todayGenerated: count || 0,
          totalGenerated: data.total_generated || 0,
          lastRunDate: data.last_run_date || '尚未运行',
        })
      }
    } catch (error) {
      console.error('Error fetching config:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setMessage(null)

    try {
      const keywordArray = keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0)

      if (keywordArray.length < 10 || keywordArray.length > 15) {
        setMessage({
          type: 'error',
          text: '关键词数量必须在 10-15 个之间（当前：' + keywordArray.length + '个）',
        })
        return
      }

      if (config) {
        const { error } = await supabase
          .from('auto_news_config')
          .update({
            keywords: keywordArray,
            is_enabled: isEnabled,
            updated_at: new Date().toISOString(),
          })
          .eq('id', config.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('auto_news_config')
          .insert([{
            keywords: keywordArray,
            is_enabled: isEnabled,
            next_run_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          }])

        if (error) throw error
      }

      setMessage({ type: 'success', text: '保存成功！系统将在每天早上 8 点自动生成新闻。' })
      fetchConfig()
    } catch (error) {
      console.error('Error saving config:', error)
      setMessage({ type: 'error', text: '保存失败，请重试' })
    } finally {
      setSaving(false)
    }
  }

  async function handleToggle() {
    if (!config) return
    
    setSaving(true)
    try {
      const newState = !isEnabled
      const { error } = await supabase
        .from('auto_news_config')
        .update({
          is_enabled: newState,
          next_run_time: newState 
            ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', config.id)

      if (error) throw error
      
      setIsEnabled(newState)
      setMessage({
        type: 'success',
        text: newState ? '自动发布已启动！' : '自动发布已停止',
      })
      fetchConfig()
    } catch (error) {
      console.error('Error toggling:', error)
      setMessage({ type: 'error', text: '操作失败，请重试' })
    } finally {
      setSaving(false)
    }
  }

  async function handleGenerateNow() {
    if (!confirm('确定要立即生成一篇新闻吗？')) return

    try {
      // 调用数据库函数手动生成一篇
      const { error } = await supabase.rpc('generate_auto_news')
      
      if (error) throw error

      setMessage({ type: 'success', text: '新闻已生成！' })
      fetchConfig()
    } catch (error) {
      console.error('Error generating news:', error)
      setMessage({ type: 'error', text: '生成失败，请重试' })
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">加载中...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">自动新闻发布</h1>
        <p className="text-gray-600 mt-2">配置自动生成新闻的关键词和定时任务</p>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">今日生成</p>
              <p className="text-3xl font-bold mt-2">{stats.todayGenerated}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">总共生成</p>
              <p className="text-3xl font-bold mt-2">{stats.totalGenerated}</p>
            </div>
            <RotateCcw className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">上次运行</p>
              <p className="text-lg font-bold mt-2">{stats.lastRunDate}</p>
            </div>
            <Settings className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* 配置表单 */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="max-w-3xl">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              自动关键词（10-15 个，用逗号分隔）*
            </label>
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="例如：304 不锈钢，网篮，过滤，清洗，消毒，医用，食品级，工业，长方形，圆形，沥水，网筐，油炸，蒸煮，医疗"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            <p className="mt-2 text-sm text-gray-500">
              系统将随机组合这些关键词，自动生成新闻标题和内容。当前关键词数量：
              <span className={`font-medium ${
                keywords.split(',').filter(k => k.trim()).length >= 10 && 
                keywords.split(',').filter(k => k.trim()).length <= 15
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {' '}{keywords.split(',').filter(k => k.trim()).length}个
              </span>
            </p>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">使用说明：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>系统会在每天早上 8 点自动生成一篇新闻</li>
                  <li>新闻内容会根据关键词智能组合生成</li>
                  <li>生成的新闻会自动发布到前端新闻中心</li>
                  <li>可以随时启动或停止自动生成功能</li>
                  <li>支持手动立即生成测试效果</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={handleToggle}
              disabled={saving}
              className={`inline-flex items-center px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isEnabled
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isEnabled ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  停止自动发布
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  启动自动发布
                </>
              )}
            </button>

            <button
              onClick={handleGenerateNow}
              disabled={saving || !isEnabled}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              立即生成一篇
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? '保存中...' : '保存配置'}
            </button>
          </div>

          {message && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

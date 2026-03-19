import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { SeoSettingsS8B8A8A895Row } from '@/types/database'

export type PageType = 'home' | 'products' | 'cases' | 'news' | 'contact'

interface SeoState {
  seoSettings: Record<PageType, SeoSettingsS8B8A8A895Row | null>
  loading: boolean
  fetchSeoSettings: () => Promise<void>
  updateSeoSetting: (pageType: PageType, data: Partial<SeoSettingsS8B8A8A895Row>) => Promise<boolean>
}

export const useSeo = create<SeoState>((set, get) => ({
  seoSettings: {
    home: null,
    products: null,
    cases: null,
    news: null,
    contact: null,
  },
  loading: true,

  fetchSeoSettings: async () => {
    try {
      set({ loading: true })
      const { data, error } = await supabase
        .from('seo_settings_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')
        .in('page_type', ['home', 'products', 'cases', 'news', 'contact'])

      if (error) throw error

      const settings: Record<PageType, SeoSettingsS8B8A8A895Row | null> = {
        home: null,
        products: null,
        cases: null,
        news: null,
        contact: null,
      }

      data?.forEach((item) => {
        settings[item.page_type as PageType] = item
      })

      set({ seoSettings: settings, loading: false })
    } catch (error) {
      console.error('Error fetching SEO settings:', error)
      set({ loading: false })
    }
  },

  updateSeoSetting: async (pageType: PageType, data: Partial<SeoSettingsS8B8A8A895Row>) => {
    try {
      const currentSetting = get().seoSettings[pageType]

      if (currentSetting) {
        const { error } = await supabase
          .from('seo_settings_s_8b8a8a89_5')
          .update({
            title: data.title,
            keywords: data.keywords,
            description: data.description,
          })
          .eq('id', currentSetting.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('seo_settings_s_8b8a8a89_5')
          .insert({
            page_type: pageType,
            title: data.title,
            keywords: data.keywords,
            description: data.description,
          })

        if (error) throw error
      }

      await get().fetchSeoSettings()
      return true
    } catch (error) {
      console.error('Error updating SEO setting:', error)
      return false
    }
  },
}))

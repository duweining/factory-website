import { useState, useEffect } from 'react'
import { CompaniesS8B8A8A895Row } from '@/types/database'
import { supabase } from '@/lib/supabase'

export function useCompany() {
  const [company, setCompany] = useState<CompaniesS8B8A8A895Row | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompany()
  }, [])

  async function fetchCompany() {
    try {
      const { data, error } = await supabase
        .from('companies_s_8b8a8a89_5')
        .select('*')
        .eq('is_deleted', 'n')
        .single()

      if (error) throw error
      setCompany(data)
    } catch (error) {
      console.error('Error fetching company:', error)
    } finally {
      setLoading(false)
    }
  }

  return { company, loading }
}

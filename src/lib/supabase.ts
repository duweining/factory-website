import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://spb-bp12745p8840775h.supabase.opentrust.net'
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsInJlZiI6InNwYi1icDEyNzQ1cDg4NDA3NzVoIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM4MDcwNjIsImV4cCI6MjA4OTM4MzA2Mn0.bzvEigELn640m62nUO4hf3nm36kuTBIg_OFaT2ueQwU'

export const supabase = createClient(supabaseUrl, supabaseKey)

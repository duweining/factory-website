CREATE TABLE IF NOT EXISTS public.seo_settings_s_8b8a8a89_5 (
  id SERIAL PRIMARY KEY,
  corp_id VARCHAR(128),
  emp_id VARCHAR(128),
  page_type VARCHAR(50) NOT NULL,
  title VARCHAR(255),
  keywords TEXT,
  description TEXT,
  is_deleted CHAR(1) DEFAULT 'n',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.cases_s_8b8a8a89_5 (
  id SERIAL PRIMARY KEY,
  corp_id VARCHAR(128),
  emp_id VARCHAR(128),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(512) NOT NULL,
  customer_name VARCHAR(255),
  project_type VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_deleted CHAR(1) DEFAULT 'n',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

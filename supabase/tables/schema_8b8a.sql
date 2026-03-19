CREATE TABLE public.companies_s_8b8a8a89_5 (
  id SERIAL PRIMARY KEY,
  corp_id VARCHAR(128),
  emp_id VARCHAR(128),
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(512),
  banner_url VARCHAR(512),
  description TEXT,
  address VARCHAR(512),
  phone VARCHAR(64),
  email VARCHAR(128),
  website VARCHAR(255),
  is_deleted CHAR(1) DEFAULT 'n',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.products_s_8b8a8a89_5 (
  id SERIAL PRIMARY KEY,
  corp_id VARCHAR(128),
  emp_id VARCHAR(128),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(128),
  price DECIMAL(10, 2),
  images JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_deleted CHAR(1) DEFAULT 'n',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.news_s_8b8a8a89_5 (
  id SERIAL PRIMARY KEY,
  corp_id VARCHAR(128),
  emp_id VARCHAR(128),
  title VARCHAR(255) NOT NULL,
  summary VARCHAR(512),
  content TEXT NOT NULL,
  cover_image VARCHAR(512),
  category VARCHAR(128),
  author VARCHAR(128),
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_deleted CHAR(1) DEFAULT 'n',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.admin_users (
  id SERIAL PRIMARY KEY,
  corp_id VARCHAR(128),
  emp_id VARCHAR(128),
  username VARCHAR(128) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(64) DEFAULT 'admin',
  is_deleted CHAR(1) DEFAULT 'n',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

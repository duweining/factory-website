-- 客户案例表
CREATE TABLE IF NOT EXISTS public.cases_s_8b8a8a89_5 (
  id SERIAL PRIMARY KEY,
  corp_id VARCHAR(128),
  emp_id VARCHAR(128),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  image_url VARCHAR(512),
  customer_name VARCHAR(255),
  industry VARCHAR(128),
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_deleted CHAR(1) DEFAULT 'n',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 插入示例数据
INSERT INTO public.cases_s_8b8a8a89_5 (title, description, image_url, customer_name, industry) VALUES
('某食品加工企业不锈钢网篮采购案例', '为某大型食品加工企业提供定制化的不锈钢网篮解决方案，满足其清洗、消毒等工艺需求。', NULL, '某食品集团', '食品加工'),
('医疗器械公司不锈钢制品合作案例', '长期为某知名医疗器械供应商提供高品质不锈钢制品，用于医疗设备的生产和组装。', NULL, '某医疗科技公司', '医疗器械'),
('化工企业不锈钢过滤网篮应用案例', '为某化工企业提供耐腐蚀、耐高温的不锈钢过滤网篮，广泛应用于化学反应和物料分离过程。', NULL, '某化工集团', '化工行业')
ON CONFLICT DO NOTHING;

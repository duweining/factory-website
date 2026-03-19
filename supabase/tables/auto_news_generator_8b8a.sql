-- 自动新闻生成配置表
CREATE TABLE IF NOT EXISTS public.auto_news_config (
  id SERIAL PRIMARY KEY,
  corp_id VARCHAR(128),
  emp_id VARCHAR(128),
  keywords TEXT[], -- 关键词数组，10-15 个
  is_enabled BOOLEAN DEFAULT false, -- 是否启用
  last_run_date DATE, -- 上次运行日期
  next_run_time TIMESTAMP WITH TIME ZONE, -- 下次运行时间
  total_generated INTEGER DEFAULT 0, -- 总共生成数量
  is_deleted CHAR(1) DEFAULT 'n',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 插入默认配置
INSERT INTO public.auto_news_config (keywords, is_enabled, next_run_time) 
VALUES (
  ARRAY['304 不锈钢', '网篮', '过滤', '清洗', '消毒', '医用', '食品级', '工业', '长方形', '圆形', '沥水', '网筐', '油炸', '蒸煮', '医疗'],
  false,
  NOW() + INTERVAL '1 day'
)
ON CONFLICT DO NOTHING;

-- 创建定时生成新闻的函数
CREATE OR REPLACE FUNCTION public.generate_auto_news()
RETURNS void AS $$
DECLARE
  config_record RECORD;
  news_title TEXT;
  news_content TEXT;
  news_summary TEXT;
  categories TEXT[] := ARRAY['公司动态', '行业资讯', '技术应用', '产品知识', '成功案例'];
  authors TEXT[] := ARRAY['编辑部', '技术中心', '产品部', '市场部'];
  random_category TEXT;
  random_author TEXT;
  random_idx INTEGER;
  keyword_count INTEGER;
  selected_keywords TEXT[];
  intro_paragraphs TEXT[];
  feature_paragraphs TEXT[];
  conclusion_paragraphs TEXT[];
  random_intro TEXT;
  random_features TEXT;
  random_conclusion TEXT;
BEGIN
  -- 获取启用的配置
  FOR config_record IN 
    SELECT * FROM public.auto_news_config 
    WHERE is_enabled = true 
      AND is_deleted = 'n'
      AND (next_run_time IS NULL OR next_run_time <= NOW())
  LOOP
    -- 随机选择 3-5 个关键词
    keyword_count := array_length(config_record.keywords, 1);
    IF keyword_count IS NULL OR keyword_count = 0 THEN
      CONTINUE;
    END IF;
    
    -- 简单随机选择关键词（实际可以更复杂）
    selected_keywords := config_record.keywords[1:MIN(5, keyword_count)];
    
    -- 生成标题
    random_idx := floor(random() * 10)::integer % 5;
    IF random_idx = 0 THEN
      news_title := '304 不锈钢' || selected_keywords[2] || '在' || selected_keywords[4] || '领域的应用优势';
    ELSIF random_idx = 1 THEN
      news_title := selected_keywords[1] || selected_keywords[2] || '的' || selected_keywords[3] || '技术解析';
    ELSIF random_idx = 2 THEN
      news_title := '工业级' || selected_keywords[1] || selected_keywords[2] || '的' || selected_keywords[5] || '指南';
    ELSIF random_idx = 3 THEN
      news_title := selected_keywords[1] || selected_keywords[2] || '在' || selected_keywords[3] || '中的创新应用';
    ELSE
      news_title := '高品质' || selected_keywords[1] || selected_keywords[2] || '的生产工艺与质量控制';
    END IF;
    
    -- 生成内容段落
    intro_paragraphs := ARRAY[
      '随着' || selected_keywords[1] || '在各行业的广泛应用，其优异的性能和可靠的品质得到了越来越多企业的认可。本产品采用优质材料精制而成，严格遵循国家相关标准生产。',
      '在现代工业生产中，' || selected_keywords[1] || '已成为不可或缺的重要组件。我们专注于该领域的研发和生产多年，积累了丰富的经验和技术储备。',
      '为了满足市场对高品质' || selected_keywords[1] || '的需求，我们不断优化生产工艺，提升产品质量，力求为客户提供更优质的产品和服务。'
    ];
    
    feature_paragraphs := ARRAY[
      '产品采用优质' || selected_keywords[1] || '材料，具有优异的耐腐蚀性、耐高温性和抗氧化性能。精密的加工工艺确保了产品的尺寸精度和表面光洁度，满足不同应用场景的严苛要求。',
      '我们建立了完善的质量管理体系，从原材料采购到生产加工，从成品检验到售后服务，每一个环节都严格执行 ISO9001 质量标准。每批次产品都经过严格的性能测试和质量检查。',
      '针对不同行业的应用需求，我们提供定制化服务。无论是尺寸规格、结构设计，还是表面处理、包装方式，都可以根据客户的具体要求进行个性化定制。',
      '产品广泛应用于' || selected_keywords[3] || '、' || selected_keywords[4] || '、' || selected_keywords[5] || '等多个领域，展现出卓越的性能和可靠性。我们的工程团队可以为客户提供专业的技术咨询和选型指导。',
      '我们拥有先进的生产设备和检测仪器，配备经验丰富的技术团队，能够确保产品的稳定质量和及时交付。多年来，我们与众多知名企业建立了长期稳定的合作关系。'
    ];
    
    conclusion_paragraphs := ARRAY[
      '综上所述，' || selected_keywords[1] || selected_keywords[2] || '凭借其优异的性能和可靠的品质，已经成为众多企业的首选。我们承诺将继续秉承"质量第一、客户至上"的经营理念，为客户提供更优质的产品和服务。',
      '选择合适的不锈钢产品需要综合考虑使用场景、负载要求、环境条件等多个因素。我们的专业团队随时准备为您提供技术咨询和选型指导，帮助您找到最适合的解决方案。',
      '未来，我们将继续加大研发投入，不断推出更具创新性的产品，满足市场日益多样化的需求。同时，我们也将进一步优化服务体系，为客户提供更加便捷、高效的购物体验。'
    ];
    
    -- 随机组合内容
    random_intro := intro_paragraphs[floor(random() * 3)::integer + 1];
    random_features := '';
    FOR i IN 1..(3 + floor(random() * 3)::integer) LOOP
      IF i <= array_length(feature_paragraphs, 1) THEN
        random_features := random_features || feature_paragraphs[i] || E'\n\n';
      END IF;
    END LOOP;
    random_conclusion := conclusion_paragraphs[floor(random() * 3)::integer + 1];
    
    news_content := random_intro || E'\n\n' || random_features || random_conclusion;
    news_summary := LEFT(news_content, 200) || '...';
    
    -- 随机分类和作者
    random_category := categories[floor(random() * 5)::integer + 1];
    random_author := authors[floor(random() * 4)::integer + 1];
    
    -- 插入新闻
    INSERT INTO public.news_s_8b8a8a89_5 (
      title,
      summary,
      content,
      category,
      author,
      cover_image,
      view_count,
      is_featured,
      is_deleted
    ) VALUES (
      news_title,
      news_summary,
      news_content,
      random_category,
      random_author,
      NULL,
      floor(random() * 500)::integer + 50,
      false,
      'n'
    );
    
    -- 更新配置
    UPDATE public.auto_news_config
    SET last_run_date = CURRENT_DATE,
        next_run_time = NOW() + INTERVAL '1 day',
        next_run_time = DATE_TRUNC('day', next_run_time) + INTERVAL '8 hours',
        total_generated = total_generated + 1,
        updated_at = NOW()
    WHERE id = config_record.id;
    
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 创建索引以提高查询效率
CREATE INDEX IF NOT EXISTS idx_auto_news_config_enabled ON public.auto_news_config(is_enabled) WHERE is_deleted = 'n';
CREATE INDEX IF NOT EXISTS idx_auto_news_config_next_run ON public.auto_news_config(next_run_time) WHERE is_enabled = true AND is_deleted = 'n';

-- 重新创建 generate_auto_news 函数（修复版本）
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
  FOR config_record IN 
    SELECT * FROM public.auto_news_config 
    WHERE is_enabled = true 
      AND is_deleted = 'n'
      AND (next_run_time IS NULL OR next_run_time <= NOW())
  LOOP
    keyword_count := array_length(config_record.keywords, 1);
    IF keyword_count IS NULL OR keyword_count = 0 THEN
      CONTINUE;
    END IF;
    
    selected_keywords := config_record.keywords[1:LEAST(5, keyword_count)];
    
    -- Generate title
    random_idx := floor(random() * 10)::integer % 5;
    IF random_idx = 0 THEN
      news_title := '304 不锈钢' || COALESCE(selected_keywords[2], '制品') || '在' || COALESCE(selected_keywords[4], '工业') || '领域的应用优势';
    ELSIF random_idx = 1 THEN
      news_title := COALESCE(selected_keywords[1], '不锈钢') || COALESCE(selected_keywords[2], '网篮') || '的' || COALESCE(selected_keywords[3], '技术') || '解析';
    ELSIF random_idx = 2 THEN
      news_title := '工业级' || COALESCE(selected_keywords[1], '不锈钢') || COALESCE(selected_keywords[2], '制品') || '的' || COALESCE(selected_keywords[5], '应用') || '指南';
    ELSIF random_idx = 3 THEN
      news_title := COALESCE(selected_keywords[1], '不锈钢') || COALESCE(selected_keywords[2], '网篮') || '在' || COALESCE(selected_keywords[3], '工业') || '中的创新应用';
    ELSE
      news_title := '高品质' || COALESCE(selected_keywords[1], '不锈钢') || COALESCE(selected_keywords[2], '制品') || '的生产工艺与质量控制';
    END IF;
    
    -- Content paragraphs
    intro_paragraphs := ARRAY[
      '随着' || COALESCE(selected_keywords[1], '不锈钢材料') || '在各行业的广泛应用，其优异的性能和可靠的品质得到了越来越多企业的认可。本产品采用优质材料精制而成，严格遵循国家相关标准生产。',
      '在现代工业生产中，' || COALESCE(selected_keywords[1], '不锈钢制品') || '已成为不可或缺的重要组件。我们专注于该领域的研发和生产多年，积累了丰富的经验和技术储备。',
      '为了满足市场对高品质' || COALESCE(selected_keywords[1], '不锈钢产品') || '的需求，我们不断优化生产工艺，提升产品质量，力求为客户提供更优质的产品和服务。'
    ];
    
    feature_paragraphs := ARRAY[
      '产品采用优质' || COALESCE(selected_keywords[1], '不锈钢') || '材料，具有优异的耐腐蚀性、耐高温性和抗氧化性能。精密的加工工艺确保了产品的尺寸精度和表面光洁度，满足不同应用场景的严苛要求。',
      '我们建立了完善的质量管理体系，从原材料采购到生产加工，从成品检验到售后服务，每一个环节都严格执行 ISO9001 质量标准。每批次产品都经过严格的性能测试和质量检查。',
      '针对不同行业的应用需求，我们提供定制化服务。无论是尺寸规格、结构设计，还是表面处理、包装方式，都可以根据客户的具体要求进行个性化定制。',
      '产品广泛应用于' || COALESCE(selected_keywords[3], '食品加工') || '、' || COALESCE(selected_keywords[4], '医疗器械') || '、' || COALESCE(selected_keywords[5], '化工') || '等多个领域，展现出卓越的性能和可靠性。我们的工程团队可以为客户提供专业的技术咨询和选型指导。',
      '我们拥有先进的生产设备和检测仪器，配备经验丰富的技术团队，能够确保产品的稳定质量和及时交付。多年来，我们与众多知名企业建立了长期稳定的合作关系。'
    ];
    
    conclusion_paragraphs := ARRAY[
      '综上所述，' || COALESCE(selected_keywords[1], '不锈钢') || COALESCE(selected_keywords[2], '制品') || '凭借其优异的性能和可靠的品质，已经成为众多企业的首选。我们承诺将继续秉承"质量第一、客户至上"的经营理念，为客户提供更优质的产品和服务。',
      '选择合适的不锈钢产品需要综合考虑使用场景、负载要求、环境条件等多个因素。我们的专业团队随时准备为您提供技术咨询和选型指导，帮助您找到最适合的解决方案。',
      '未来，我们将继续加大研发投入，不断推出更具创新性的产品，满足市场日益多样化的需求。同时，我们也将进一步优化服务体系，为客户提供更加便捷、高效的购物体验。'
    ];
    
    random_intro := intro_paragraphs[(floor(random() * 3)::integer % 3) + 1];
    random_features := '';
    FOR i IN 1..(3 + floor(random() * 3)::integer % 3) LOOP
      IF i <= array_length(feature_paragraphs, 1) THEN
        random_features := random_features || feature_paragraphs[i] || E'\n\n';
      END IF;
    END LOOP;
    random_conclusion := conclusion_paragraphs[(floor(random() * 3)::integer % 3) + 1];
    
    news_content := random_intro || E'\n\n' || random_features || random_conclusion;
    news_summary := LEFT(news_content, 200) || '...';
    
    random_category := categories[(floor(random() * 5)::integer % 5) + 1];
    random_author := authors[(floor(random() * 4)::integer % 4) + 1];
    
    INSERT INTO public.news_s_8b8a8a89_5 (
      title,
      summary,
      content,
      category,
      author,
      cover_image,
      view_count,
      is_featured,
      is_deleted,
      published_at
    ) VALUES (
      news_title,
      news_summary,
      news_content,
      random_category,
      random_author,
      NULL,
      floor(random() * 500)::integer + 50,
      false,
      'n',
      NOW()
    );
    
    UPDATE public.auto_news_config
    SET last_run_date = CURRENT_DATE,
        next_run_time = (CURRENT_DATE + INTERVAL '1 day' + INTERVAL '8 hours'),
        total_generated = total_generated + 1,
        updated_at = NOW()
    WHERE id = config_record.id;
    
  END LOOP;
END;
$$ LANGUAGE plpgsql;

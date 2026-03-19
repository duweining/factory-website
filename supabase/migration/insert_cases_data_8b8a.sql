-- 插入示例案例数据（使用占位图片）
INSERT INTO public.cases_s_8b8a8a89_5 (title, description, image_url, customer_name, project_type) VALUES
('某食品加工企业不锈钢网篮采购案例', '为某大型食品加工企业提供定制化的不锈钢网篮解决方案，满足其清洗、消毒等工艺需求。', 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=800', '某食品集团', '食品加工'),
('医疗器械公司不锈钢制品合作案例', '长期为某知名医疗器械供应商提供高品质不锈钢制品，用于医疗设备的生产和组装。', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800', '某医疗科技公司', '医疗器械'),
('化工企业不锈钢过滤网篮应用案例', '为某化工企业提供耐腐蚀、耐高温的不锈钢过滤网篮，广泛应用于化学反应和物料分离过程。', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800', '某化工集团', '化工行业')
ON CONFLICT DO NOTHING;

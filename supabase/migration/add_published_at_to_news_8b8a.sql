-- 添加 published_at 字段到新闻表
ALTER TABLE public.news_s_8b8a8a89_5 
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP;

-- 为已存在的新闻设置发布时间为创建时间
UPDATE public.news_s_8b8a8a89_5 
SET published_at = created_at 
WHERE published_at IS NULL;

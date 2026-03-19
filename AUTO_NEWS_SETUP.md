# 自动新闻生成系统部署说明

## 功能概述
本系统支持每天早上 8 点自动生成一篇关于不锈钢网篮产品的新闻，并自动发布到网站新闻中心。

## 已完成的配置

### 1. 数据库表
- `auto_news_config`: 存储自动新闻生成的配置信息
  - 关键词数组（10-15 个）
  - 启用/停止状态
  - 上次运行时间
  - 下次运行时间
  - 总生成数量

### 2. 数据库函数
- `generate_auto_news()`: 自动生成新闻的核心函数
  - 随机组合关键词生成标题
  - 智能生成新闻内容（200-800 字）
  - 自动设置分类、作者、阅读量
  - 更新运行统计信息

### 3. 后台管理界面
- 路径：`/admin/auto-news`
- 功能：
  - 配置关键词（10-15 个）
  - 启动/停止自动发布
  - 查看生成统计
  - 手动立即生成测试

## 定时任务设置（重要）

由于浏览器环境限制，需要设置外部定时任务来调用数据库函数。以下是几种方案：

### 方案一：使用 Supabase Edge Functions + Cron（推荐）

1. 安装 Supabase CLI:
```bash
npm install -g supabase
```

2. 创建 Edge Function:
```bash
supabase functions new auto-news-daily
```

3. 在 `supabase/functions/auto-news-daily/index.ts` 中添加:
```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  )

  const { error } = await supabase.rpc('generate_auto_news')
  
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true }))
})
```

4. 部署函数:
```bash
supabase functions deploy auto-news-daily
```

5. 在 GitHub Actions 或其他 CI/CD 工具中设置每天 8 点调用:
```yaml
# .github/workflows/auto-news.yml
name: Daily Auto News

on:
  schedule:
    - cron: '0 0 * * *'  # UTC 时间 0 点 = 北京时间 8 点

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Auto News
        run: |
          curl -X POST \
            https://spb-bp12745p8840775h.supabase.opentrust.net/functions/v1/auto-news-daily \
            -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
            -H "Content-Type: application/json"
```

### 方案二：使用 GitHub Actions（简单）

直接在项目中创建 `.github/workflows/auto-news.yml`:

```yaml
name: Daily Auto News

on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 0 点 = 北京时间 8 点

jobs:
  generate-news:
    runs-on: ubuntu-latest
    steps:
      - name: Call Supabase Function
        run: |
          curl -X POST \
            "https://spb-bp12745p8840775h.supabase.opentrust.net/rest/v1/rpc/generate_auto_news" \
            -H "apikey: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
            -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
            -H "Content-Type: application/json"
```

**注意**: 需要将 API Key 替换为实际的服务角色密钥（Service Role Key），可以在 Supabase 控制台获取。

### 方案三：使用云函数（阿里云/腾讯云）

创建云函数定时触发器，每天 8 点调用 Supabase 数据库函数。

### 方案四：前端轮询方案（备选）

如果无法设置外部定时任务，可以在前端首页添加检查逻辑：

```typescript
// 在 HomePage.tsx 的 useEffect 中
async function checkAndGenerateAutoNews() {
  const lastCheck = localStorage.getItem('lastAutoNewsCheck')
  const today = new Date().toDateString()
  
  if (lastCheck !== today) {
    // 检查是否到了 8 点
    const now = new Date()
    if (now.getHours() >= 8) {
      await supabase.rpc('generate_auto_news')
      localStorage.setItem('lastAutoNewsCheck', today)
    }
  }
}
```

## 使用方法

1. 登录后台管理系统
2. 进入"自动发布"页面
3. 设置 10-15 个关键词（用逗号分隔）
4. 点击"启动自动发布"按钮
5. 配置定时任务（选择上述任一方案）
6. 系统将每天自动生成新闻

## 注意事项

1. **首次使用**: 建议先点击"立即生成一篇"测试效果
2. **关键词质量**: 关键词越精准，生成的新闻质量越高
3. **定时任务**: 必须配置外部定时任务才能实现全自动运行
4. **监控**: 定期检查生成统计，确保系统正常运行
5. **内容审核**: 建议定期查看自动生成的新闻，必要时进行人工调整

## 故障排查

### 新闻没有自动生成
- 检查定时任务是否正常执行
- 查看数据库日志确认函数调用成功
- 确认 `auto_news_config` 表中 `is_enabled` 为 true

### 生成失败
- 检查关键词数量是否在 10-15 个之间
- 确认数据库连接正常
- 查看浏览器控制台的错误信息

## 技术支持

如有问题，请联系技术团队或查看 Supabase 文档。

# 工厂企业官网 - 自定义域名部署指南

本指南帮助您将网站部署到支持自定义域名的托管平台。

---

## 🚀 方案一：Vercel 部署（推荐⭐）

**优势**：
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 支持自定义域名（免费）
- ✅ 全球 CDN 加速
- ✅ 一键部署，无需配置

### 步骤 1：准备代码

您的项目已经包含所有必需配置文件：
- `package.json` ✅
- `vite.config.ts` ✅
- `tsconfig.json` ✅
- `index.html` ✅

### 步骤 2：创建 Vercel 账号

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub/GitLab/Bitbucket 账号登录
3. 或直接用邮箱注册

### 步骤 3：导入项目

**方式 A：通过 Git 仓库（推荐）**

```bash
# 1. 在 GitHub 创建新仓库
# 2. 将代码推送到 GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/factory-website.git
git push -u origin main
```

**方式 B：通过 Vercel CLI**

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署项目
cd /admin/projects/8b8a8a89-5b0d-4b33-92c7-30b3c2dee790
vercel
```

### 步骤 4：配置项目

在 Vercel Dashboard 中：

1. **Import Project** → 选择你的仓库
2. **Framework Preset** → 选择 `Vite`
3. **Build Command** → `npm run build`
4. **Output Directory** → `dist`
5. 点击 **Deploy**

### 步骤 5：绑定自定义域名

1. 进入项目 Settings → **Domains**
2. 点击 **Add** 添加域名
3. 输入您的域名（如 `www.yourcompany.com`）
4. 按提示配置 DNS：

```
类型：CNAME
名称：www
值：cname.vercel-dns.com
TTL：自动
```

或者根域名：
```
类型：A
名称：@
值：76.76.21.21
TTL：自动
```

5. 等待 DNS 生效（通常几分钟到几小时）
6. Vercel 会自动配置 SSL 证书

---

## 🌐 方案二：Netlify 部署

**优势**：
- ✅ 完全免费
- ✅ 支持自定义域名
- ✅ 内置表单处理
- ✅ 持续集成

### 步骤 1：创建 Netlify 账号

访问 [netlify.com](https://netlify.com) 注册登录

### 步骤 2：部署项目

**方式 A：拖拽部署（最简单）**

1. 在项目根目录运行：
```bash
npm run build
```

2. 将生成的 `dist` 文件夹拖拽到 Netlify Drop 页面

**方式 B：Git 部署**

1. 将代码推送到 GitHub/GitLab
2. 在 Netlify 点击 **Add new site** → **Import an existing project**
3. 连接 Git 仓库
4. 配置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. 点击 **Deploy site**

### 步骤 3：绑定自定义域名

1. 进入 Site settings → **Domain management**
2. 点击 **Add custom domain**
3. 输入您的域名
4. 配置 DNS：

```
类型：CNAME
名称：www
值：your-site-name.netlify.app
```

或根域名：
```
类型：A
名称：@
值：75.2.60.5
```

5. Netlify 会自动配置 HTTPS

---

## ☁️ 方案三：Cloudflare Pages

**优势**：
- ✅ 完全免费
- ✅ Cloudflare CDN
- ✅ 无限带宽

### 部署步骤

1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 连接 GitHub 仓库
3. 配置：
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. 点击 **Save and Deploy**
5. 在 **Custom domains** 中绑定域名

---

## ⚠️ 重要注意事项

### 1. 环境变量配置

您的项目使用 Supabase，需要在部署平台配置环境变量：

**Vercel**: Settings → Environment Variables
**Netlify**: Site settings → Build & deploy → Environment

添加以下变量：
```
VITE_SUPABASE_URL=https://spb-bp12745p8840775h.supabase.opentrust.net
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsInJlZiI6InNwYi1icDEyNzQ1cDg4NDA3NzVoIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM4MDcwNjIsImV4cCI6MjA4OTM4MzA2Mn0.bzvEigELn640m62nUO4hf3nm36kuTBIg_OFaT2ueQwU
```

### 2. 修改代码中的 Supabase 配置

创建 `.env.production` 文件：
```env
VITE_SUPABASE_URL=https://spb-bp12745p8840775h.supabase.opentrust.net
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsInJlZiI6InNwYi1icDEyNzQ1cDg4NDA3NzVoIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM4MDcwNjIsImV4cCI6MjA4OTM4MzA2Mn0.bzvEigELn640m62nUO4hf3nm36kuTBIg_OFaT2ueQwU
```

### 3. 修改 vite.config.ts

确保生产环境正确配置：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 移除 aiappRuntimePlugin（仅开发环境需要）
})
```

---

## 📋 完整部署检查清单

- [ ] 代码已推送到 GitHub/GitLab
- [ ] 已在 Vercel/Netlify 创建账号
- [ ] 已导入项目并成功构建
- [ ] 已配置环境变量（Supabase URL 和 Key）
- [ ] 已购买域名（如还没有）
- [ ] 已配置 DNS 记录
- [ ] 等待 SSL 证书生效
- [ ] 测试网站功能正常
- [ ] 测试后台管理功能
- [ ] 测试图片上传功能

---

## 🎯 快速开始（5 分钟部署）

```bash
# 1. 初始化 Git
cd /admin/projects/8b8a8a89-5b0d-4b33-92c7-30b3c2dee790
git init
git add .
git commit -m "Initial commit"

# 2. 安装 Vercel CLI
npm install -g vercel

# 3. 登录并部署
vercel login
vercel

# 4. 按提示操作
# - 确认项目名称
# - 确认链接到现有项目或创建新项目
# - 等待部署完成

# 5. 获取部署 URL
# 部署完成后会显示类似：https://factory-website.vercel.app
```

---

## 💡 常见问题

### Q: 部署后图片无法上传？
A: 检查 Supabase Storage 权限配置，确保匿名用户可以上传文件。

### Q: 后台登录失败？
A: 检查数据库 `admin_users` 表是否存在，数据是否正确。

### Q: 自定义域名不生效？
A: 
1. 检查 DNS 配置是否正确
2. 等待 DNS 传播（最多 48 小时）
3. 清除本地 DNS 缓存

### Q: 构建失败？
A: 
1. 检查 Node.js 版本（建议 18+）
2. 运行 `npm install` 确保依赖完整
3. 本地运行 `npm run build` 测试

---

## 📞 需要帮助？

如果遇到问题：
1. 查看部署平台的日志
2. 检查浏览器控制台错误
3. 确认 Supabase 连接正常

---

**祝您部署成功！** 🎉
